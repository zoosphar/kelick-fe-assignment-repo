"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
import { Upload, UserPlus } from "lucide-react";
import { UploadModal } from "@/components/upload-modal";
import { EmployeeTable } from "@/components/employee-table";
import { parseFile } from "@/lib/parse-file";
import Image from "next/image";

interface Employee {
  id: string;
  profile: string;
  email: string;
  role: string;
  status: string;
}

export default function EmployeesPage() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [hasData, setHasData] = useState(false);

  const handleFileUpload = async (file: File) => {
    try {
      const data = await parseFile(file);
      console.log("Parsed data in handleFileUpload:", data);
      setEmployees(data as Employee[]);
      setHasData(true);
    } catch (error) {
      console.error("Error parsing file:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 max-h-screen overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">Employees</h1>
          {hasData && (
            <Button className="gap-2 bg-[#00C9A7] hover:bg-[#00C9A7]/90">
              <UserPlus className="h-5 w-5" />
              Add Employee
            </Button>
          )}
        </div>

        {!hasData ? (
          <div className="border rounded-lg p-16">
            <div className="max-w-md mx-auto text-center">
              <div className="mb-6">
                <Image
                  src="/bulk-upload-empty-img.png"
                  alt="Team illustration"
                  height={220}
                  width={220}
                  className="mx-auto"
                />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                Start building your team
              </h2>
              <p className="text-muted-foreground mb-8">
                Add your first team member or import your entire team.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setUploadModalOpen(true)}
                >
                  <Upload className="h-5 w-5" />
                  Bulk Upload
                </Button>
                <Button className="gap-2 bg-[#00C9A7] hover:bg-[#00C9A7]/90">
                  <UserPlus className="h-5 w-5" />
                  Add Employee
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <EmployeeTable data={employees} />
        )}
      </main>

      <UploadModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
}
