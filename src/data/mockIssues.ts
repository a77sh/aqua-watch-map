export interface WaterIssue {
  id: string;
  title: string;
  description: string;
  category: "leak" | "contamination" | "flood" | "pressure" | "outage";
  severity: "low" | "medium" | "high" | "critical";
  status: "reported" | "investigating" | "in_progress" | "resolved";
  location: string;
  coordinates: { lat: number; lng: number };
  reportedBy: string;
  reportedAt: string;
  upvotes: number;
  comments: number;
  imageUrl?: string;
}

export const mockIssues: WaterIssue[] = [
  {
    id: "1",
    title: "Major water main break on Oak Street",
    description: "Large water main break causing flooding on Oak Street between 3rd and 5th Avenue. Water is flowing into the road and sidewalk areas. Multiple residents affected.",
    category: "leak",
    severity: "critical",
    status: "in_progress",
    location: "Oak Street & 4th Ave",
    coordinates: { lat: 40.7128, lng: -74.006 },
    reportedBy: "Sarah M.",
    reportedAt: "2026-03-05T08:30:00Z",
    upvotes: 24,
    comments: 8,
  },
  {
    id: "2",
    title: "Discolored water in Riverside neighborhood",
    description: "Brown/yellow discoloration noticed in tap water since yesterday morning. Multiple households on Riverside Drive reporting the same issue.",
    category: "contamination",
    severity: "high",
    status: "investigating",
    location: "Riverside Drive",
    coordinates: { lat: 40.715, lng: -74.012 },
    reportedBy: "James K.",
    reportedAt: "2026-03-04T14:15:00Z",
    upvotes: 18,
    comments: 12,
  },
  {
    id: "3",
    title: "Street flooding near Central Park",
    description: "Persistent street flooding after rain. Storm drains appear to be blocked or overwhelmed. Water pooling to ankle-deep levels.",
    category: "flood",
    severity: "medium",
    status: "reported",
    location: "Central Park South",
    coordinates: { lat: 40.718, lng: -74.001 },
    reportedBy: "Maria L.",
    reportedAt: "2026-03-04T09:00:00Z",
    upvotes: 11,
    comments: 5,
  },
  {
    id: "4",
    title: "Low water pressure in downtown area",
    description: "Significantly reduced water pressure affecting multiple buildings in the downtown core. Issue started approximately 3 days ago.",
    category: "pressure",
    severity: "medium",
    status: "investigating",
    location: "Downtown Core",
    coordinates: { lat: 40.71, lng: -74.008 },
    reportedBy: "Tom R.",
    reportedAt: "2026-03-03T11:45:00Z",
    upvotes: 9,
    comments: 3,
  },
  {
    id: "5",
    title: "Complete water outage on Elm Street",
    description: "No water service on Elm Street for the past 6 hours. No prior notice from water utility. Emergency situation for elderly residents.",
    category: "outage",
    severity: "critical",
    status: "in_progress",
    location: "Elm Street",
    coordinates: { lat: 40.722, lng: -74.003 },
    reportedBy: "Diana P.",
    reportedAt: "2026-03-05T06:00:00Z",
    upvotes: 31,
    comments: 15,
  },
  {
    id: "6",
    title: "Fire hydrant leaking continuously",
    description: "Fire hydrant on the corner of Main and 2nd has been leaking steadily for two days. Wasting significant water.",
    category: "leak",
    severity: "low",
    status: "reported",
    location: "Main St & 2nd Ave",
    coordinates: { lat: 40.708, lng: -74.011 },
    reportedBy: "Alex W.",
    reportedAt: "2026-03-03T16:30:00Z",
    upvotes: 5,
    comments: 2,
  },
];

export const categoryLabels: Record<WaterIssue["category"], string> = {
  leak: "Leak",
  contamination: "Contamination",
  flood: "Flooding",
  pressure: "Low Pressure",
  outage: "Outage",
};

export const severityColors: Record<WaterIssue["severity"], string> = {
  low: "bg-accent text-accent-foreground",
  medium: "bg-secondary text-secondary-foreground",
  high: "bg-orange-500 text-secondary-foreground",
  critical: "bg-destructive text-destructive-foreground",
};

export const statusLabels: Record<WaterIssue["status"], string> = {
  reported: "Reported",
  investigating: "Investigating",
  in_progress: "In Progress",
  resolved: "Resolved",
};
