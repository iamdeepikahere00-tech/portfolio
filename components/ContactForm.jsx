"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { site } from "@/lib/site";

export default function ContactForm() {
  const [state, setState] = useState({ kind: "", text: "" });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState({ kind: "pending", text: "Sending your message..." });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...data }),
      });
      if (!res.ok) throw new Error();
      const result = await res.json();
      form.reset();
      setState({
        kind: "ok",
        text: result.confirmationSent
          ? `Message sent. A confirmation email is on its way, and ${site.name} will reply soon.`
          : `Message sent. ${site.name} will reply soon, but the confirmation email could not be delivered.`,
      });
    } catch {
      setState({ kind: "err", text: "Message not sent. Please email me directly." });
    }
  }

  return (
    <form className="panel glass form" onSubmit={onSubmit}>
      <div className="two">
        <label>Name<input name="name" required autoComplete="name" /></label>
        <label>Place<input name="place" required placeholder="City, country" /></label>
      </div>
      <div className="two">
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
        <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" /></label>
      </div>
      <label>What do you need?<textarea name="message" rows={5} required placeholder="Tell me about the work, expected deadline and budget." /></label>
      <button className="btn icon-link" type="submit" disabled={state.kind === "pending"}>
        <Send size={17} aria-hidden="true" />
        {state.kind === "pending" ? "Sending..." : "Send message"}
      </button>
      {state.text && <p className={`msg ${state.kind}`} role="status">{state.text}</p>}
    </form>
  );
}
