"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  DollarSign,
  Calendar,
  FileText,
  MoreHorizontal,
  Bell,
  Package,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import kelickLogo from "@/public/kelick_logo.png";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="min-h-screen w-64 border-r bg-background p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Image src={kelickLogo} alt="Kelick Logo" width={100} />
        {/* <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Employees-lTbEq0Gi9241xtRt3vAvyYB5JuTLhn.png" alt="Kelick Logo" className="h-8 w-8" /> */}
        {/* <span className="font-semibold text-xl">kelick</span> */}
      </div>

      <nav className="space-y-6 flex-1">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors",
            pathname === "/dashboard" && "text-foreground"
          )}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>

        <div className="space-y-2">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            ORGANIZATION
          </h3>
          <Link
            href="/organization"
            className={cn(
              "flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors",
              pathname === "/organization" && "text-foreground"
            )}
          >
            <Building2 className="h-5 w-5" />
            Kelick
          </Link>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            MANAGE
          </h3>
          <div className="space-y-1">
            <Link
              href="/employees"
              className={cn(
                "flex items-center gap-3 px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                pathname === "/employees" && "text-foreground bg-accent"
              )}
            >
              <Users className="h-5 w-5" />
              Employees
            </Link>
            <Link
              href="/payroll"
              className={cn(
                "flex items-center gap-3 px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                pathname === "/payroll" && "text-foreground bg-accent"
              )}
            >
              <DollarSign className="h-5 w-5" />
              Payroll
            </Link>
            <Link
              href="/leaves"
              className={cn(
                "flex items-center gap-3 px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                pathname === "/leaves" && "text-foreground bg-accent"
              )}
            >
              <Calendar className="h-5 w-5" />
              Leaves
            </Link>
            <Link
              href="/claims"
              className={cn(
                "flex items-center gap-3 px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                pathname === "/claims" && "text-foreground bg-accent"
              )}
            >
              <FileText className="h-5 w-5" />
              Claims
            </Link>
            <Link
              href="/more"
              className={cn(
                "flex items-center gap-3 px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                pathname === "/more" && "text-foreground bg-accent"
              )}
            >
              <MoreHorizontal className="h-5 w-5" />
              More
            </Link>
          </div>
        </div>
      </nav>

      <div className="space-y-6 mt-auto pt-6 border-t">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <span className="font-medium">Free Plan</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-[10%] bg-[#00C9A7] rounded-full" />
          </div>
          <div className="text-sm text-muted-foreground">1/10 Employees</div>
        </div>

        <div className="flex items-center justify-between">
          <Link href="/notifications" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
          </Link>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div>John Doe</div>
              <div className="text-muted-foreground">johndoe@asure.pro</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
