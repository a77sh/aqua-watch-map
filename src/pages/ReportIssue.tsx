import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const ReportIssue = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Issue reported successfully! Thank you for helping your community.");
      navigate("/community");
    }, 1000);
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
                <Input
                  id="title"
                  required
                  placeholder="Brief description of the issue"
                  className="mt-1.5 rounded-xl"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                  <Select required>
                    <SelectTrigger className="mt-1.5 rounded-xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
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
                  <Label htmlFor="severity" className="text-sm font-medium">Severity</Label>
                  <Select required>
                    <SelectTrigger className="mt-1.5 rounded-xl">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
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
                <Textarea
                  id="description"
                  required
                  rows={4}
                  placeholder="Provide detailed information about the issue..."
                  className="mt-1.5 rounded-xl resize-none"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="mb-5 text-base font-semibold text-foreground">Location</h2>

            <div className="space-y-5">
              <div>
                <Label htmlFor="location" className="text-sm font-medium">Address or Landmark</Label>
                <div className="relative mt-1.5">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location"
                    required
                    placeholder="Enter location"
                    className="rounded-xl pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="mb-5 text-base font-semibold text-foreground">Photo (Optional)</h2>
            <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border py-10 transition-colors hover:border-secondary/40">
              <div className="text-center">
                <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Upload a photo</p>
                <p className="mt-1 text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-secondary py-3 text-secondary-foreground shadow-none hover:bg-secondary/90"
          >
            {submitting ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
