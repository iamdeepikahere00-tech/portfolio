import Link from "next/link";
import { ClipboardCheck, FileSpreadsheet, Landmark } from "lucide-react";
import { work } from "@/lib/site";

const workIcons = [FileSpreadsheet, Landmark, ClipboardCheck];

export default function Work() {
  return (
    <div className="page">
      <h1>Selected work</h1>
      <p className="lead">Sample accounting exercises demonstrating my workflow and attention to detail.</p>
      <div className="grid">
        {work.map((w, index) => {
          const Icon = workIcons[index];
          return (
            <Link href={w.link} className="panel glass" key={w.title}>
              <span className="card-icon"><Icon size={22} aria-hidden="true" /></span>
              <span className="chip">{w.tag}</span>
              <h3 style={{ marginTop: ".8rem" }}>{w.title}</h3>
              <p>{w.text}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
