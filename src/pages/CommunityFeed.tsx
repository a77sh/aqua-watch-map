import { useState, useMemo } from "react";
import { Search, Filter, ArrowUpDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useReports, Report } from "@/hooks/useReports";
import IssueCard from "@/components/IssueCard";
import { motion } from "framer-motion";

type SortOption = "newest" | "oldest" | "most_confirmed" | "severity";

const SEVERITY_ORDER: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

function sortReports(reports: Report[], sort: SortOption): Report[] {
  return [...reports].sort((a, b) => {
    switch (sort) {
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "oldest":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "most_confirmed":
        return b.confirmations - a.confirmations;
      case "severity":
        return (SEVERITY_ORDER[a.severity] ?? 4) - (SEVERITY_ORDER[b.severity] ?? 4);
      default:
        return 0;
    }
  });
}

const CommunityFeed = () => {
  const { data: reports = [], isLoading } = useReports();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("newest");

  const activeFilterCount = [categoryFilter, severityFilter, statusFilter].filter(f => f !== "all").length;

  const filtered = useMemo(() => {
    const result = reports.filter((issue) => {
      const matchesSearch =
        issue.title.toLowerCase().includes(search.toLowerCase()) ||
        issue.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
      const matchesSeverity = severityFilter === "all" || issue.severity === severityFilter;
      const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
      return matchesSearch && matchesCategory && matchesSeverity && matchesStatus;
    });
    return sortReports(result, sort);
  }, [reports, search, categoryFilter, severityFilter, statusFilter, sort]);

  const clearFilters = () => {
    setCategoryFilter("all");
    setSeverityFilter("all");
    setStatusFilter("all");
    setSearch("");
  };

  return (
    <div className="min-h-screen">
      <div className="container py-8 md:py-12">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">Community Reports</h1>
          <p className="mt-2 text-muted-foreground">Browse and track water issues reported by your community.</p>
        </motion.div>

        {/* Filters */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl pl-10"
              />
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-full rounded-xl sm:w-44">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="most_confirmed">Most Confirmed</SelectItem>
                <SelectItem value="severity">Severity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-wrap gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full rounded-xl sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="leak">Leak</SelectItem>
                  <SelectItem value="contamination">Contamination</SelectItem>
                  <SelectItem value="flood">Flooding</SelectItem>
                  <SelectItem value="pressure">Low Pressure</SelectItem>
                  <SelectItem value="outage">Outage</SelectItem>
                </SelectContent>
              </Select>

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-full rounded-xl sm:w-36">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full rounded-xl sm:w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="reported">Reported</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-1 rounded-xl text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">{filtered.length} reports found</p>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => <div key={i} className="h-48 animate-pulse rounded-2xl bg-muted" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card py-16">
            <p className="text-muted-foreground">No reports match your filters.</p>
            {activeFilterCount > 0 && (
              <Button variant="link" onClick={clearFilters} className="mt-2 text-secondary">
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((issue, idx) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.04, 0.3), duration: 0.4 }}
              >
                <IssueCard issue={issue} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;
