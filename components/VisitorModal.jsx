"use client";
import { useEffect, useState } from "react";

export default function VisitorModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    try { if (!localStorage.getItem("visitor-seen")) setOpen(true); } catch {}
  }, []);

  const close = () => {
    try { localStorage.setItem("visitor-seen", "1"); } catch {}
    setOpen(false);
  };

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("Sending...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "visitor", ...data }),
      });
      if (!res.ok) throw new Error();
      close();
    } catch {
      setStatus("Could not send. Check your details or skip for now.");
    }
  }

  if (!open) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="vt">
      <form className="panel glass form" onSubmit={onSubmit}>
        <div>
          <h2 id="vt">Welcome, who is visiting?</h2>
          <p className="lead" style={{ fontSize: ".95rem" }}>Share your details if you would like to discuss accounting support.</p>
        </div>
        <label>Your name<input name="name" required placeholder="Aman Verma" autoComplete="name" /></label>
        <label>Your city or country<input name="place" required placeholder="Mumbai, India" /></label>
        <label>Email or phone<input name="contact" required placeholder="you@email.com or +91..." /></label>
        <button className="btn" type="submit">Continue to site</button>
        {status && <p className="msg err" role="status">{status}</p>}
        <button type="button" className="skip" onClick={close}>Skip for now</button>
      </form>
    </div>
  );
}
