import { site } from "@/lib/site";
import { Mail, ShieldCheck, Workflow } from "lucide-react";

export default function About() {
  const cards = [
    { title: "How I work", text: "I confirm the scope, maintain organized files, keep records consistent and share clear updates throughout the assignment.", Icon: Workflow },
    { title: "What I care about", text: "Accuracy, confidentiality and careful attention to the small details that make financial records dependable.", Icon: ShieldCheck },
    { title: "Get in touch", text: <><a href={`mailto:${site.email}`}>{site.email}</a><br />Available for remote freelance support.</>, Icon: Mail },
  ];

  return (
    <div className="page">
      <h1>About me</h1>
      <p className="lead">I am {site.name}, an accounting student and freelance bookkeeping assistant based in {site.location}. I enjoy turning financial records into clear, accurate and well-organized information.</p>
      <div className="grid">
        {cards.map(({ title, text, Icon }) => (
          <div className="panel glass" key={title}>
            <span className="card-icon"><Icon size={22} aria-hidden="true" /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
