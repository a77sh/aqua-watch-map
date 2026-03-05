import { useEffect, useRef } from "react";
import L from "leaflet";
import { Report, categoryLabels, severityColors } from "@/hooks/useReports";

const SEVERITY_MARKER_COLORS: Record<string, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#0ea5e9",
  low: "#22c55e",
};

interface ReportMapProps {
  reports: Report[];
  className?: string;
  zoom?: number;
  center?: [number, number];
  interactive?: boolean;
}

const ReportMap = ({
  reports,
  className = "aspect-[16/7]",
  zoom = 12,
  center,
  interactive = true,
}: ReportMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Avoid reinitializing if the map already exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const defaultCenter: [number, number] = center || [40.7128, -74.006];

    const map = L.map(mapRef.current, {
      center: defaultCenter,
      zoom,
      scrollWheelZoom: interactive,
      dragging: interactive,
      zoomControl: interactive,
      attributionControl: true,
    });

    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    if (reports.length > 0) {
      const bounds = L.latLngBounds([]);

      reports.forEach((report) => {
        const color = SEVERITY_MARKER_COLORS[report.severity] || "#0ea5e9";
        const marker = L.circleMarker([report.latitude, report.longitude], {
          radius: 8,
          fillColor: color,
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.85,
        }).addTo(map);

        const categoryLabel =
          categoryLabels[report.category] || report.category;

        marker.bindPopup(
          `<div style="font-family: system-ui, sans-serif; min-width: 180px;">
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px; line-height: 1.3;">${report.title}</div>
            <div style="display: flex; gap: 6px; margin-bottom: 6px; flex-wrap: wrap;">
              <span style="background: hsl(197, 98%, 58%); color: #fff; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 500;">${categoryLabel}</span>
              <span style="background: ${color}; color: #fff; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 500; text-transform: capitalize;">${report.severity}</span>
            </div>
            <div style="font-size: 12px; color: #666; margin-bottom: 8px;">Confirmations: ${report.confirmations}</div>
            <a href="/issue/${report.id}" style="font-size: 12px; color: hsl(197, 98%, 48%); text-decoration: none; font-weight: 500;">View Details &rarr;</a>
          </div>`
        );

        bounds.extend([report.latitude, report.longitude]);
      });

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      }
    }

    // Force a resize after mount to fix rendering in hidden/animated containers
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [reports, zoom, center, interactive]);

  return (
    <div
      ref={mapRef}
      className={`w-full ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default ReportMap;
