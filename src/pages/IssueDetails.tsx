import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ThumbsUp, MessageCircle, Clock, AlertTriangle, MapPin, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useReport, useComments, useCreateComment, useConfirmReport, categoryLabels, severityColors, statusLabels } from "@/hooks/useReports";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: issue, isLoading } = useReport(id!);
  const { data: comments = [] } = useComments(id!);
  const createComment = useCreateComment();
  const confirmReport = useConfirmReport();
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !commentText.trim()) return;
    createComment.mutate(
      { report_id: id!, username: username.trim(), comment_text: commentText.trim() },
      { onSuccess: () => { setCommentText(""); } }
    );
  };

  if (isLoading) {
    return <div className="container flex min-h-[60vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-secondary border-t-transparent" /></div>;
  }

  if (!issue) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Issue not found</h2>
          <Button variant="outline" onClick={() => navigate("/")} className="mt-4 rounded-xl">Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container max-w-3xl py-8 md:py-12">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="mb-6">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-lg text-xs">{categoryLabels[issue.category] || issue.category}</Badge>
            <Badge className={`rounded-lg text-xs ${severityColors[issue.severity] || ""}`}>{issue.severity}</Badge>
            <Badge variant="outline" className="rounded-lg text-xs">{statusLabels[issue.status] || issue.status}</Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">{issue.title}</h1>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{issue.latitude.toFixed(4)}, {issue.longitude.toFixed(4)}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{new Date(issue.created_at).toLocaleDateString()}</span>
        </div>

        <div className="mb-8 rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="mb-3 text-base font-semibold text-foreground">Description</h2>
          <p className="leading-relaxed text-muted-foreground">{issue.description}</p>
        </div>

        <div className="mb-8 flex gap-3">
          <Button variant="outline" className="gap-2 rounded-xl" onClick={() => confirmReport.mutate(issue.id)} disabled={confirmReport.isPending}>
            <ThumbsUp className="h-4 w-4" /> Confirm ({issue.confirmations})
          </Button>
          <Button variant="outline" className="gap-2 rounded-xl">
            <MessageCircle className="h-4 w-4" /> Comments ({comments.length})
          </Button>
        </div>

        {/* Comments */}
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <h2 className="mb-4 text-base font-semibold text-foreground">Comments</h2>

          {comments.length === 0 ? (
            <p className="mb-6 text-sm text-muted-foreground">No comments yet. Be the first!</p>
          ) : (
            <div className="mb-6 space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="rounded-xl border border-border/40 bg-muted/30 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{c.username}</span>
                    <span className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{c.comment_text}</p>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleComment} className="space-y-3">
            <Input placeholder="Your name" value={username} onChange={e => setUsername(e.target.value)} className="rounded-xl" required />
            <div className="flex gap-2">
              <Textarea placeholder="Write a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} className="rounded-xl resize-none" rows={2} required />
              <Button type="submit" disabled={createComment.isPending} className="shrink-0 rounded-xl bg-secondary text-secondary-foreground shadow-none hover:bg-secondary/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
