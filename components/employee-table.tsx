"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, Download, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, RadialBarChart, RadialBar, PolarRadiusAxis } from "recharts";

interface Employee {
  id: string;
  profile: string;
  email: string;
  role: string;
  status: string;
}

type StatusVariant = "default" | "secondary" | "destructive" | "outline";

const getStatusVariant = (status: string): StatusVariant => {
  const normalizedStatus = status?.toLowerCase() || "";
  if (normalizedStatus === "active") return "default";
  if (normalizedStatus === "on leave") return "secondary";
  if (normalizedStatus === "terminated") return "destructive";
  return "outline";
};

const formatEmployeeStatus = (status: string): string => {
  const normalizedStatus = status?.toLowerCase() || "";
  if (normalizedStatus === "active") return "Active";
  if (normalizedStatus === "on leave") return "On Leave";
  if (normalizedStatus === "terminated") return "Terminated";
  return normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1);
};

export function EmployeeTable({ data }: { data: Employee[] }) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof Employee;
    direction: "asc" | "desc";
  } | null>(null);

  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All Status");
  const [roleFilter, setRoleFilter] = React.useState("All Role");

  React.useEffect(() => {
    console.log("EmployeeTable data:", data);
  }, [data]);

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key] || "";
        const bValue = b[sortConfig.key] || "";
        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter((employee) => {
    const matchesSearch = Object.values(employee).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus =
      statusFilter === "All Status" ||
      employee.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesRole =
      roleFilter === "All Role" ||
      employee.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleSort = (key: keyof Employee) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredData.map((employee) => employee.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const employeeStats = React.useMemo(() => {
    const activeCount = data.filter(
      (emp) => emp.status.toLowerCase() === "active"
    ).length;
    const leaveCount = data.filter(
      (emp) => emp.status.toLowerCase() === "on leave"
    ).length;
    const terminatedCount = data.filter(
      (emp) => emp.status.toLowerCase() === "terminated"
    ).length;
    return [
      {
        active: activeCount,
        leave: leaveCount,
        terminated: terminatedCount,
        total: data.length,
      },
    ];
  }, [data]);

  const statsConfig = {
    active: {
      label: "Active",
      color: "hsl(var(--primary))",
    },
    leave: {
      label: "On Leave",
      color: "hsl(var(--secondary))",
    },
    terminated: {
      label: "Terminated",
      color: "hsl(var(--destructive))",
    },
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex flex-col py-2">
          <CardContent className="flex pb-0 justify-between">
            <div className="flex flex-col gap-2 mt-1">
              <p className="text-sm text-muted-foreground">Employee Status</p>
              <p className="text-4xl font-semibold">{data.length}</p>
              <p className="text-base">Active Employees</p>
            </div>
            <ChartContainer
              config={statsConfig}
              className="max-w-[150px] h-[180px]"
            >
              <RadialBarChart
                data={employeeStats}
                endAngle={180}
                innerRadius={70}
                outerRadius={90}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  {/* <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-foreground text-xl font-bold"
                            >
                              {data.length}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 4}
                              className="fill-muted-foreground text-[8px]"
                            >
                              Total Employees
                            </tspan>
                          </text>
                        );
                      }
                    }} 
                  /> */}
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="active"
                  stackId="a"
                  cornerRadius={5}
                  fill="hsl(var(--primary))"
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="leave"
                  fill="hsl(var(--secondary))"
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="terminated"
                  fill="hsl(var(--destructive))"
                  stackId="a"
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
          <div className="flex items-center justify-around py-2">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-1 rounded"
                style={{ backgroundColor: "hsl(var(--primary))" }}
              />
              <div className="flex gap-1 text-sm">
                <span className="font-medium">{employeeStats[0].active}</span>
                <span className="text-muted-foreground">Active</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-1 rounded"
                style={{ backgroundColor: "hsl(var(--secondary))" }}
              />
              <div className="flex gap-1 text-sm">
                <span className="font-medium">{employeeStats[0].leave}</span>
                <span className="text-muted-foreground">On Leave</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-1 rounded"
                style={{ backgroundColor: "hsl(var(--destructive))" }}
              />
              <div className="flex gap-1 text-sm">
                <span className="font-medium">
                  {employeeStats[0].terminated}
                </span>
                <span className="text-muted-foreground">Terminated</span>
              </div>
            </div>
          </div>
          {/* <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none text-[hsl(var(--primary))]">
              {((employeeStats[0].active / data.length) * 100).toFixed(1)}%
              Active Employees
            </div>
            <div className="leading-none text-muted-foreground">
              Showing distribution of employee status
            </div>
          </CardFooter> */}
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold">All Employees</h4>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search employee"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Status">All Status</SelectItem>
              {Array.from(new Set(data.map((employee) => employee.status))).map(
                (status) => (
                  <SelectItem key={status} value={status}>
                    {formatEmployeeStatus(status)}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Role">All Role</SelectItem>
              {Array.from(new Set(data.map((employee) => employee.role))).map(
                (role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div> */}
      </div>

      <div className="rounded-md border max-h-[calc(100vh-420px)] overflow-scroll">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    filteredData.length > 0 &&
                    selectedRows.length === filteredData.length
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {["id", "profile", "email", "role", "status"].map((key) => (
                <TableHead
                  key={key}
                  className="cursor-pointer"
                  onClick={() => handleSort(key as keyof Employee)}
                >
                  <div className="flex items-center gap-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortConfig?.key === key &&
                      {
                        asc: <ChevronUp className="h-4 w-4" />,
                        desc: <ChevronDown className="h-4 w-4" />,
                      }[sortConfig.direction]}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {filteredData.map((employee, index) => (
                <motion.tr
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.05,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="group"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(employee.id)}
                      onCheckedChange={(checked) =>
                        handleSelectRow(employee.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium text-[#00C9A7]">
                    {employee.id}
                  </TableCell>
                  <TableCell>{employee.profile}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(employee.status)}>
                      {formatEmployeeStatus(employee.status)}
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
