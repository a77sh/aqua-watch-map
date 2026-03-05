import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, ThumbsUp, MessageCircle, Clock, AlertTriangle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockIssues, categoryLabels, severityColors, statusLabels } from "@/data/mockIssues";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const issue = mockIssues.find((i) => i.id === id);

  if (!issue) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Issue not found</h2>
          <Button variant="outline" onClick={() => navigate("/")} className="mt-4 rounded-xl">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container max-w-3xl py-8 md:py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-lg text-xs">
              {categoryLabels[issue.category]}
            </Badge>
            <Badge className={`rounded-lg text-xs ${severityColors[issue.severity]}`}>
              {issue.severity}
            </Badge>
            <Badge variant="outline" className="rounded-lg text-xs">
              {statusLabels[issue.status]}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">{issue.title}</h1>
        </div>

        {/* Meta */}
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {issue.reportedBy}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {issue.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {new Date(issue.reportedAt).toLocaleDateString()}
          </span>
        </div>

        {/* Description */}
        <div className="mb-8 rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="mb-3 text-base font-semibold text-foreground">Description</h2>
          <p className="leading-relaxed text-muted-foreground">{issue.description}</p>
        </div>

        {/* Actions */}
        <div className="mb-8 flex gap-3">
          <Button variant="outline" className="gap-2 rounded-xl">
            <ThumbsUp className="h-4 w-4" />
            Upvote ({issue.upvotes})
          </Button>
          <Button variant="outline" className="gap-2 rounded-xl">
            <MessageCircle className="h-4 w-4" />
            Comments ({issue.comments})
          </Button>
          <Button variant="outline" className="gap-2 rounded-xl">
            <AlertTriangle className="h-4 w-4" />
            Flag
          </Button>
        </div>

        {/* Comments section placeholder */}
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="mb-4 text-base font-semibold text-foreground">Comments</h2>
          <div className="space-y-4">
            {[
              { author: "City Water Dept.", text: "We've dispatched a crew to investigate. ETA 2 hours.", time: "1h ago" },
              { author: "Neighbor Joe", text: "I can confirm this is getting worse. Water is now reaching the sidewalk.", time: "3h ago" },
            ].map((comment, i) => (
              <div key={i} className="rounded-xl border border-border/40 bg-muted/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">{comment.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
