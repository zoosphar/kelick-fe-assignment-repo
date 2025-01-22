"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import successAnimation from "@/public/lottie_kelick.json";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export function UploadSuccess({
  onGeneratePayroll,
  onClose,
}: {
  onGeneratePayroll: () => void;
  onClose: () => void;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="text-center space-y-4 relative bg-background p-6 rounded-lg"
      >
        <div className="w-16 h-16 rounded-full bg-[#00C9A7]/10 flex items-center justify-center mx-auto">
          <Check className="h-8 w-8 text-[#00C9A7]" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            Congrats! You&apos;ve successfully added all your employees!
          </h3>
          <p className="text-muted-foreground">
            We&apos;ve successfully processed your Excel file.
          </p>
          <p className="text-muted-foreground">
            Let&apos;s generate the payroll.
          </p>
        </div>

        <div className="flex gap-3 justify-center pt-4">
          <Button variant="outline" onClick={onClose}>
            I&apos;ll do it later
          </Button>
          <Button
            onClick={onGeneratePayroll}
            className="bg-[#00C9A7] hover:bg-[#00C9A7]/90"
          >
            Generate Payroll
          </Button>
        </div>
      </motion.div>

      {isMounted && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[600px]">
            <Lottie animationData={successAnimation} loop={false} autoplay />
          </div>
        </div>
      )}
    </div>
  );
}
