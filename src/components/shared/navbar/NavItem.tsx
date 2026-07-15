"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sparkle } from "lucide-react";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
};

export default function NavItem({
  href,
  children,
  exact = true,
}: NavItemProps) {
  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "relative lg:px-3 px-1 py-2 text-sm font-medium transition-colors",
        isActive ? "text-[#006769]" : "text-muted-foreground hover:text-primary"
      )}
    >
      <span className="flex items-center gap-1">
        <Sparkle className={cn("transition", isActive ? "animate-spin" : "")} size={15} />
        {children}
      </span>
    </Link>
  );
}
