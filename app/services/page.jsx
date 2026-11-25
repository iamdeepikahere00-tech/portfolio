import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, ChartPie, FileSpreadsheet, Receipt, RefreshCw } from "lucide-react";
import { services } from "@/lib/site";

const serviceIcons = [BookOpen, RefreshCw, Receipt, FileSpreadsheet, Calculator, ChartPie];

export default function Services() {
  return (
    <div className="page">
      <h1>What I can do for you</h1>
      <p className="lead">Practical accounting and bookkeeping support for individuals and small businesses.</p>
      <div className="grid">
        {services.map((s, index) => {
          const Icon = serviceIcons[index];
          return (
            <div className="panel glass" key={s.title}>
              <span className="card-icon"><Icon size={22} aria-hidden="true" /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          );
        })}
      </div>
      <p style={{ marginTop: "2rem" }}>
        <Link href="/contact" className="btn icon-link">Request a quote <ArrowRight size={17} aria-hidden="true" /></Link>
      </p>
    </div>
  );
}
