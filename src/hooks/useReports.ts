import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Report = Tables<"reports">;
export type Comment = Tables<"comments">;
export type ReportInsert = TablesInsert<"reports">;
export type CommentInsert = TablesInsert<"comments">;

export const categoryLabels: Record<string, string> = {
  leak: "Leak",
  contamination: "Contamination",
  flood: "Flooding",
  pressure: "Low Pressure",
  outage: "Outage",
};

export const severityColors: Record<string, string> = {
  low: "bg-accent text-accent-foreground",
  medium: "bg-secondary text-secondary-foreground",
  high: "bg-orange-500 text-secondary-foreground",
  critical: "bg-destructive text-destructive-foreground",
};

export const statusLabels: Record<string, string> = {
  reported: "Reported",
  investigating: "Investigating",
  in_progress: "In Progress",
  resolved: "Resolved",
};

export function useReports() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Report[];
    },
  });
}

export function useReport(id: string) {
  return useQuery({
    queryKey: ["reports", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Report;
    },
  });
}

export function useComments(reportId: string) {
  return useQuery({
    queryKey: ["comments", reportId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("report_id", reportId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as Comment[];
    },
  });
}

export function useCreateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (report: ReportInsert) => {
      const { data, error } = await supabase
        .from("reports")
        .insert(report)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (comment: CommentInsert) => {
      const { data, error } = await supabase
        .from("comments")
        .insert(comment)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.report_id] });
    },
  });
}

export function useConfirmReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reportId: string) => {
      // Get current confirmations
      const { data: report } = await supabase
        .from("reports")
        .select("confirmations")
        .eq("id", reportId)
        .single();
      
      const { error } = await supabase
        .from("reports")
        .update({ confirmations: (report?.confirmations || 0) + 1 })
        .eq("id", reportId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}
