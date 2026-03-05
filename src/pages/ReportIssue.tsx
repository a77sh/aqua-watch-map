import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowLeft, Crosshair, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useCreateReport } from "@/hooks/useReports";
import { motion } from "framer-motion";
import L from "leaflet";

const ReportIssue = () => {
  const navigate = useNavigate();
  const createReport = useCreateReport();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [latitude, setLatitude] = useState("40.7128");
  const [longitude, setLongitude] = useState("-74.0060");
  const [geoLoading, setGeoLoading] = useState(false);

  const miniMapRef = useRef<HTMLDivElement>(null);
  const miniMapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const updateMarker = useCallback((lat: number, lng: number) => {
    if (!miniMapInstance.current) return;
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      markerRef.current = L.marker([lat, lng]).addTo(miniMapInstance.current);
    }
    miniMapInstance.current.setView([lat, lng], 14);
  }, []);

  // Initialize mini map
  useEffect(() => {
    if (!miniMapRef.current || miniMapInstance.current) return;

    const lat = parseFloat(latitude) || 40.7128;
    const lng = parseFloat(longitude) || -74.006;

    const map = L.map(miniMapRef.current, {
      center: [lat, lng],
      zoom: 14,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    miniMapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    markerRef.current = L.marker([lat, lng]).addTo(map);

    // Click-to-place marker
    map.on("click", (e: L.LeafletMouseEvent) => {
      const { lat: clickLat, lng: clickLng } = e.latlng;
      setLatitude(clickLat.toFixed(6));
      setLongitude(clickLng.toFixed(6));
      if (markerRef.current) {
        markerRef.current.setLatLng([clickLat, clickLng]);
      }
    });

    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      map.remove();
      miniMapInstance.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync marker when lat/lng fields change manually
  useEffect(() => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      updateMarker(lat, lng);
    }
  }, [latitude, longitude, updateMarker]);

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toFixed(6));
        setLongitude(pos.coords.longitude.toFixed(6));
        setGeoLoading(false);
        toast.success("Location detected successfully.");
      },
      () => {
        setGeoLoading(false);
        toast.error("Unable to retrieve your location. Please enter it manually.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReport.mutate(
      {
        title,
        description,
        category,
        severity,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      {
        onSuccess: () => {
          toast.success("Issue reported successfully! Thank you for helping your community.");
          navigate("/community");
        },
        onError: () => {
          toast.error("Failed to submit report. Please try again.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container max-w-2xl py-8 md:py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">Report a Water Issue</h1>
          <p className="mt-2 text-muted-foreground">
            Help your community by reporting water infrastructure problems in your area.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            className="rounded-2xl border border-border/60 bg-card p-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h2 className="mb-5 text-base font-semibold text-foreground">Issue Details</h2>

            <div className="space-y-5">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                <Input id="title" required value={title} onChange={e => setTitle(e.target.value)} placeholder="Brief description of the issue" className="mt-1.5 rounded-xl" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <Select required value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leak">Leak</SelectItem>
                      <SelectItem value="contamination">Contamination</SelectItem>
                      <SelectItem value="flood">Flooding</SelectItem>
                      <SelectItem value="pressure">Low Pressure</SelectItem>
                      <SelectItem value="outage">Outage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Severity</Label>
                  <Select required value={severity} onValueChange={setSeverity}>
                    <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Select severity" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Textarea id="description" required rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Provide detailed information about the issue..." className="mt-1.5 rounded-xl resize-none" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border/60 bg-card p-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">Location</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGeolocation}
                disabled={geoLoading}
                className="gap-2 rounded-xl text-xs"
              >
                {geoLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Crosshair className="h-3.5 w-3.5" />
                )}
                Use My Location
              </Button>
            </div>
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="latitude" className="text-sm font-medium">Latitude</Label>
                  <Input id="latitude" required type="number" step="any" value={latitude} onChange={e => setLatitude(e.target.value)} className="mt-1.5 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="longitude" className="text-sm font-medium">Longitude</Label>
                  <Input id="longitude" required type="number" step="any" value={longitude} onChange={e => setLongitude(e.target.value)} className="mt-1.5 rounded-xl" />
                </div>
              </div>

              {/* Mini Map */}
              <div className="overflow-hidden rounded-xl border border-border/40">
                <div className="flex items-center gap-1.5 border-b border-border/40 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  Click the map to set location
                </div>
                <div ref={miniMapRef} className="aspect-[16/9] w-full" style={{ zIndex: 0 }} />
              </div>
            </div>
          </motion.div>

          <Button
            type="submit"
            disabled={createReport.isPending || !category || !severity}
            className="w-full rounded-xl bg-secondary py-3 text-secondary-foreground shadow-none hover:bg-secondary/90"
          >
            {createReport.isPending ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
