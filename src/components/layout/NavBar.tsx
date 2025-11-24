"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { Button } from "../ui/Button";
import { LayoutDashboard, BarChart3 } from "lucide-react";

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="glass sticky top-0 z-40 flex items-center justify-between px-6 py-4">
      <Link
        href="/"
        className="text-xl font-bold text-primary-900 dark:text-primary-100 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
      >
        ConTech Gantt
      </Link>

      <div className="flex items-center space-x-2">
        <Link href="/dashboard">
          <Button
            variant={pathname?.startsWith("/dashboard") ? "primary" : "ghost"}
            size="md"
          >
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </Link>
        <Link href="/gantt-demo">
          <Button
            variant={pathname === "/gantt-demo" ? "primary" : "ghost"}
            size="md"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Demo
          </Button>
        </Link>
        <div className="h-6 w-px bg-primary-300 dark:bg-primary-700" />
        <UserMenu />
        <ThemeToggle />
      </div>
    </nav>
  );
}
