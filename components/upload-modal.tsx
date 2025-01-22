"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FileSpreadsheet,
  Upload,
  Download,
  Check,
  CircleCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadProgress } from "@/components/upload-progress";
import { UploadSuccess } from "@/components/upload-success";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";

type UploadState = "idle" | "uploading" | "success";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileUpload: (file: File) => Promise<void>;
}

export function UploadModal({
  open,
  onOpenChange,
  onFileUpload,
}: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
    },
    maxSize: 25 * 1024 * 1024, // 25MB
    multiple: false,
    disabled: uploadState === "uploading",
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploadState("uploading");
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    try {
      await onFileUpload(file);

      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        setUploadState("success");
      }, 3000);
    } catch (error) {
      clearInterval(interval);
      console.error("Error uploading file:", error);
    }
  };

  const handleClose = () => {
    setUploadState("idle");
    setUploadProgress(0);
    setFile(null);
    onOpenChange(false);
    toast("Employees successfully added", {
      position: "bottom-center",
      icon: <CircleCheck className="h-5 w-5" />,
    });
  };

  const handleGeneratePayroll = () => {
    handleClose();
    // TODO: Add payroll generation logic
  };

  const downloadSampleXLSX = () => {
    console.log("downloadSampleXLSX");
    const link = document.createElement("a");
    link.href = "/employee_data.xlsx";
    link.download = "employee_data.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>
            {uploadState === "success" ? "Success" : "Upload File"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {uploadState === "uploading" && (
            <UploadProgress progress={uploadProgress} />
          )}

          {uploadState === "success" && (
            <UploadSuccess
              onGeneratePayroll={handleGeneratePayroll}
              onClose={handleClose}
            />
          )}

          {uploadState === "idle" && (
            <>
              <div
                {...getRootProps()}
                className={`
                  mt-4 border-2 border-dashed rounded-lg p-8
                  ${
                    isDragActive
                      ? "border-[#00C9A7] bg-[#00C9A7]/5"
                      : "border-muted"
                  }
                `}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {isDragActive
                      ? "Drop the file here"
                      : "Drag and drop your files here"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to upload
                  </p>
                  {file && (
                    <p className="text-sm font-medium text-foreground mt-2">
                      Selected: {file.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-xs text-muted-foreground flex justify-between mt-2">
                <span>Supported formats: XLS, CSV</span>
                <span>Maximum file size: 25MB</span>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/excel-logo.png"
                    alt="Excel Logo"
                    width={32}
                    height={32}
                  />
                  <div className="gap-2 flex flex-col">
                    <p className="text-sm font-medium">Table Example</p>
                    <p className="text-muted-foreground text-xs">
                      You can download the attached example and use them as a
                      starting point for your own file.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={downloadSampleXLSX}
                >
                  <Download className="h-4 w-4" />
                  Download XLSX
                </Button>
              </div>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={!file}
                  className="bg-[#00C9A7] hover:bg-[#00C9A7]/90"
                >
                  Continue
                </Button>
              </DialogFooter>
            </>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
