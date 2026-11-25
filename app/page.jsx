import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { site, skills } from "@/lib/site";

export default function Home() {
  return (
    <section className="hero">
      <div>
        <span className="eyebrow">Accounting student · Freelance bookkeeper</span>
        <h1>Hi, I am {site.name}.<br /><span className="hero-accent">I keep finances clear.</span></h1>
        <p>{site.role} in {site.location}. I help individuals and small businesses stay organized with accurate bookkeeping, reconciliations and spreadsheet support.</p>
        <div className="hero-actions">
          <Link href="/contact" className="btn icon-link">Discuss a project <ArrowRight size={17} aria-hidden="true" /></Link>
          <Link href="/work" className="btn ghost icon-link">View sample work <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
      <aside className="panel glass availability-panel">
        <p className="eyebrow" style={{ marginBottom: ".65rem" }}>Currently available</p>
        <h2 className="icon-link">
          <BadgeCheck size={22} aria-hidden="true" /> Clear books, calmer decisions.
        </h2>
        <p className="lead" style={{ fontSize: ".98rem" }}>Reliable bookkeeping support and accounting assistance for individuals and small businesses.</p>
        {skills.Accounting.concat(skills.Tools.slice(0, 2)).map((s) => <span className="chip" key={s}>{s}</span>)}
        <p><Link href="/contact" className="icon-link">Let’s talk about your books <ArrowRight size={15} aria-hidden="true" /></Link></p>
      </aside>
    </section>
  );
}
