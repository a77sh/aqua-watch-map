import { Link } from "react-router-dom";
import { Droplets, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="container flex flex-col items-center text-center">
        {/* Animated water drop */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Droplets className="h-12 w-12 text-secondary" />
            </motion.div>
          </div>
          <div className="absolute -bottom-1 left-1/2 h-4 w-16 -translate-x-1/2 rounded-full bg-secondary/10 blur-sm" />
        </motion.div>

        <motion.h1
          className="mb-2 text-6xl font-bold text-foreground md:text-8xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          404
        </motion.h1>

        <motion.p
          className="mb-2 text-xl font-medium text-foreground"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          This page has dried up
        </motion.p>

        <motion.p
          className="mb-8 max-w-sm text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          {"The page you're looking for doesn't exist or has been moved. Let's get you back to familiar waters."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <Link to="/">
            <Button className="gap-2 rounded-xl bg-secondary text-secondary-foreground shadow-none hover:bg-secondary/90">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
