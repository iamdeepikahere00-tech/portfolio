import { BadgeCheck, Calculator, FileSpreadsheet } from "lucide-react";
import { skills } from "@/lib/site";

const groupIcons = {
  Accounting: Calculator,
  Tools: FileSpreadsheet,
  Professional: BadgeCheck,
};

export default function Skills() {
  return (
    <div className="page">
      <h1>Skills</h1>
      <p className="lead">Accounting knowledge, software skills and working habits I use in my assignments.</p>
      <div className="grid">
        {Object.entries(skills).map(([group, items]) => {
          const Icon = groupIcons[group];
          return (
            <div className="panel glass" key={group}>
              <h3 className="icon-link"><Icon size={20} aria-hidden="true" />{group}</h3>
              {items.map((s) => <span className="chip" key={s}>{s}</span>)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
