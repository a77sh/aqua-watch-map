import { Link } from "react-router-dom";
import { AlertTriangle, Droplets, MapPin, Users, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReports } from "@/hooks/useReports";
import IssueCard from "@/components/IssueCard";
import StatCard from "@/components/StatCard";
import mapImage from "@/assets/map-placeholder.jpg";

const Index = () => {
  const { data: reports = [], isLoading } = useReports();
  const recentIssues = reports.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Report Water Issues
              <br />
              <span className="text-secondary">In Your Community</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Help keep your neighborhood safe by reporting water infrastructure problems. Track issues, confirm reports, and stay informed.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/report">
                <Button className="gap-2 rounded-xl bg-secondary px-6 py-3 text-secondary-foreground shadow-none hover:bg-secondary/90">
                  <Plus className="h-4 w-4" />
                  Report an Issue
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="outline" className="gap-2 rounded-xl px-6 py-3 shadow-none">
                  View Reports
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container -mt-4 mb-12">
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border/40 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Live Issue Map</h2>
              <p className="text-sm text-muted-foreground">{reports.length} active reports in your area</p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                Critical
              </span>
              <span className="hidden items-center gap-1.5 rounded-lg bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Active
              </span>
            </div>
          </div>
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <img
              src={mapImage}
              alt="Map showing reported water issues across the city"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mb-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard icon={AlertTriangle} label="Active Reports" value={reports.filter(r => r.status !== 'resolved').length} />
          <StatCard icon={Droplets} label="Resolved" value={reports.filter(r => r.status === 'resolved').length} />
          <StatCard icon={Users} label="Total Confirmations" value={reports.reduce((sum, r) => sum + r.confirmations, 0)} />
          <StatCard icon={MapPin} label="Total Reports" value={reports.length} />
        </div>
      </section>

      {/* Recent Reports */}
      <section className="container pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Recent Reports</h2>
          <Link to="/community" className="text-sm font-medium text-secondary hover:text-secondary/80 transition-colors">
            View all →
          </Link>
        </div>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : recentIssues.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl border border-border/60 bg-card py-16">
            <p className="text-muted-foreground">No reports yet. Be the first to report an issue!</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
