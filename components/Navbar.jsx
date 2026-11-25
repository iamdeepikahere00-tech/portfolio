"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, FolderKanban, House, Mail, Sparkles, UserRound } from "lucide-react";

const links = [
  ["/", "Home", House],
  ["/about", "About", UserRound],
  ["/skills", "Skills", Sparkles],
  ["/services", "Services", BriefcaseBusiness],
  ["/work", "Work", FolderKanban],
  ["/contact", "Contact", Mail],
];

export default function Navbar() {
  const path = usePathname();
  return (
    <nav className="nav glass" aria-label="Main">
      {links.map(([href, label, Icon]) => (
        <Link key={href} href={href} className={path === href ? "on" : ""}>
          <Icon size={16} aria-hidden="true" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
