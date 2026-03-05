import { Link } from "react-router-dom";
import { AlertTriangle, Droplets, MapPin, Users, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReports } from "@/hooks/useReports";
import IssueCard from "@/components/IssueCard";
import StatCard from "@/components/StatCard";
import ReportMap from "@/components/ReportMap";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Index = () => {
  const { data: reports = [], isLoading } = useReports();
  const recentIssues = reports.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient">
        <div className="container py-16 md:py-24">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="mb-4 text-4xl font-bold leading-tight text-foreground md:text-5xl text-balance"
              variants={fadeUp}
              custom={0}
            >
              Report Water Issues
              <br />
              <span className="text-secondary">In Your Community</span>
            </motion.h1>
            <motion.p
              className="mb-8 text-lg leading-relaxed text-muted-foreground text-pretty"
              variants={fadeUp}
              custom={1}
            >
              Help keep your neighborhood safe by reporting water infrastructure problems. Track issues, confirm reports, and stay informed.
            </motion.p>
            <motion.div
              className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              variants={fadeUp}
              custom={2}
            >
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container -mt-4 mb-12">
        <motion.div
          className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        >
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
              <span className="flex items-center gap-1.5 rounded-lg bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-600">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                High
              </span>
              <span className="hidden items-center gap-1.5 rounded-lg bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Medium
              </span>
              <span className="hidden items-center gap-1.5 rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent md:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Low
              </span>
            </div>
          </div>
          <ReportMap
            reports={reports}
            className="aspect-[4/3] md:aspect-[16/7]"
          />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="container mb-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: AlertTriangle, label: "Active Reports", value: reports.filter(r => r.status !== 'resolved').length, i: 0 },
            { icon: Droplets, label: "Resolved", value: reports.filter(r => r.status === 'resolved').length, i: 1 },
            { icon: Users, label: "Total Confirmations", value: reports.reduce((sum, r) => sum + r.confirmations, 0), i: 2 },
            { icon: MapPin, label: "Total Reports", value: reports.length, i: 3 },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: stat.i * 0.08, duration: 0.5, ease: "easeOut" }}
            >
              <StatCard icon={stat.icon} label={stat.label} value={stat.value} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Reports */}
      <section className="container pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Recent Reports</h2>
          <Link to="/community" className="text-sm font-medium text-secondary hover:text-secondary/80 transition-colors">
            View all &rarr;
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
            {recentIssues.map((issue, idx) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: "easeOut" }}
              >
                <IssueCard issue={issue} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
