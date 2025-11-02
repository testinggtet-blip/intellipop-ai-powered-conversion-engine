"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, BarChart3, Zap as TriggerIcon, BookOpen, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();

  const modules = [
    {
      name: "Campaigns",
      href: "/campaigns",
      icon: Megaphone
    },
    {
      name: "Builder",
      href: "/builder",
      icon: LayoutDashboard
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3
    },
    {
      name: "Triggers",
      href: "/triggers",
      icon: TriggerIcon
    },
    {
      name: "Docs",
      href: "/docs",
      icon: BookOpen
    }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border/40 bg-background/95 backdrop-blur-xl flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border/40">
        <Link href="/builder" className="flex items-center gap-2">
          <div className="relative">
            <Zap className="h-6 w-6 text-primary" />
            <div className="absolute inset-0 animate-pulse blur-md">
              <Zap className="h-6 w-6 text-primary" />
            </div>
          </div>
          <span className="text-xl font-bold">Nexus Pop</span>
        </Link>
      </div>

      {/* Navigation Modules */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {modules.map((module) => {
            const isActive = pathname === module.href;
            return (
              <Link
                key={module.href}
                href={module.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                )}
              >
                <module.icon className="w-5 h-5" />
                <span className="font-medium">{module.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}