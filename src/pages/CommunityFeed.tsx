import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useReports } from "@/hooks/useReports";
import IssueCard from "@/components/IssueCard";

const CommunityFeed = () => {
  const { data: reports = [], isLoading } = useReports();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered = reports.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Community Reports</h1>
          <p className="mt-2 text-muted-foreground">Browse and track water issues reported by your community.</p>
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search reports..." value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-xl pl-10" />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full rounded-xl sm:w-48">
              <Filter className="mr-2 h-4 w-4" />
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
        </div>

        <p className="mb-4 text-sm text-muted-foreground">{filtered.length} reports found</p>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => <div key={i} className="h-48 animate-pulse rounded-2xl bg-muted" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl border border-border/60 bg-card py-16">
            <p className="text-muted-foreground">No reports match your search.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((issue) => <IssueCard key={issue.id} issue={issue} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;
