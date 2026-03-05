import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

const StatCard = ({ icon: Icon, label, value }: StatCardProps) => (
  <div className="rounded-2xl border border-border/60 bg-card p-5">
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
      <Icon className="h-5 w-5 text-secondary" />
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="mt-1 text-sm text-muted-foreground">{label}</p>
  </div>
);

export default StatCard;
