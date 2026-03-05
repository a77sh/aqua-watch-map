import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useCreateReport } from "@/hooks/useReports";

const ReportIssue = () => {
  const navigate = useNavigate();
  const createReport = useCreateReport();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("40.7128");
  const [longitude, setLongitude] = useState("-74.0060");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReport.mutate(
      {
        title,
        description,
        category,
        severity,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      {
        onSuccess: () => {
          toast.success("Issue reported successfully! Thank you for helping your community.");
          navigate("/community");
        },
        onError: () => {
          toast.error("Failed to submit report. Please try again.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container max-w-2xl py-8 md:py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Report a Water Issue</h1>
          <p className="mt-2 text-muted-foreground">
            Help your community by reporting water infrastructure problems in your area.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="mb-5 text-base font-semibold text-foreground">Issue Details</h2>

            <div className="space-y-5">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                <Input id="title" required value={title} onChange={e => setTitle(e.target.value)} placeholder="Brief description of the issue" className="mt-1.5 rounded-xl" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <Select required value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leak">Leak</SelectItem>
                      <SelectItem value="contamination">Contamination</SelectItem>
                      <SelectItem value="flood">Flooding</SelectItem>
                      <SelectItem value="pressure">Low Pressure</SelectItem>
                      <SelectItem value="outage">Outage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Severity</Label>
                  <Select required value={severity} onValueChange={setSeverity}>
                    <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Select severity" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Textarea id="description" required rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Provide detailed information about the issue..." className="mt-1.5 rounded-xl resize-none" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="mb-5 text-base font-semibold text-foreground">Location</h2>
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="latitude" className="text-sm font-medium">Latitude</Label>
                  <Input id="latitude" required type="number" step="any" value={latitude} onChange={e => setLatitude(e.target.value)} className="mt-1.5 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="longitude" className="text-sm font-medium">Longitude</Label>
                  <Input id="longitude" required type="number" step="any" value={longitude} onChange={e => setLongitude(e.target.value)} className="mt-1.5 rounded-xl" />
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={createReport.isPending || !category || !severity}
            className="w-full rounded-xl bg-secondary py-3 text-secondary-foreground shadow-none hover:bg-secondary/90"
          >
            {createReport.isPending ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
