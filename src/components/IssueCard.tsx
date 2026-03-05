import { Link } from "react-router-dom";
import { MapPin, ThumbsUp, MessageCircle, Clock } from "lucide-react";
import { Report, categoryLabels, severityColors, statusLabels } from "@/hooks/useReports";
import { Badge } from "@/components/ui/badge";

const IssueCard = ({ issue }: { issue: Report }) => {
  const timeAgo = getTimeAgo(issue.created_at);

  return (
    <Link to={`/issue/${issue.id}`} className="group block">
      <div className="rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-secondary/30 hover:shadow-md">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-lg text-xs font-medium">
              {categoryLabels[issue.category] || issue.category}
            </Badge>
            <Badge className={`rounded-lg text-xs font-medium ${severityColors[issue.severity] || ""}`}>
              {issue.severity}
            </Badge>
          </div>
          <span className="shrink-0 rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {statusLabels[issue.status] || issue.status}
          </span>
        </div>

        <h3 className="mb-2 text-base font-semibold leading-snug text-foreground group-hover:text-secondary transition-colors">
          {issue.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {issue.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{issue.latitude.toFixed(3)}, {issue.longitude.toFixed(3)}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-3.5 w-3.5" />
              {issue.confirmations}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {timeAgo}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export default IssueCard;
