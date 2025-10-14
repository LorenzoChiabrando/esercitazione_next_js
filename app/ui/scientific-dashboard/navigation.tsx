"use client";

import Link from "next/link";
import { ElementType, ReactNode } from "react";

type ScientificMobileNavProps = {
  children: ReactNode;
};

export function ScientificMobileNav({ children }: ScientificMobileNavProps) {
  return <div className="mt-4 flex gap-3 overflow-x-auto pb-1 text-sm text-slate-300 lg:hidden">{children}</div>;
}

type ScientificMobileNavItemProps = {
  icon?: ElementType<{ className?: string }>;
  label: string;
  href?: string;
};

export function ScientificMobileNavItem({ icon: Icon, label, href = "#" }: ScientificMobileNavItemProps) {
  const content = (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 transition hover:border-blue-500/50 hover:text-blue-200">
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {label}
    </span>
  );

  if (!href) {
    return <div>{content}</div>;
  }

  return <Link href={href} className="inline-flex">{content}</Link>;
}
