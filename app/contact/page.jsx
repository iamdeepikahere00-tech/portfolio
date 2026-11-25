import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import { MessageCircle } from "lucide-react";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="page" style={{ maxWidth: 680, marginInline: "auto" }}>
      <h1>Contact</h1>
      <p className="lead" style={{ margin: "0 auto 1.5rem", textAlign: "center" }}>
        Tell me what you need help with, or email <a href={`mailto:${site.email}`}><u>{site.email}</u></a>.
      </p>
      <ContactForm />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1.25rem" }}>
        <a
          className="btn icon-link"
          href="https://wa.me/919211269498?text=Hi%20Deepika%2C%20I%27d%20like%20to%20discuss%20accounting%20support."
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={18} aria-hidden="true" /> Message me on WhatsApp
        </a>
      </div>
    </div>
  );
}
