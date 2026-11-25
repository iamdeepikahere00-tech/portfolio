import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

const isEmailAddress = (value) =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

export async function POST(req) {
  const body = await req.json().catch(() => null);
  if (
    typeof body?.name !== "string" ||
    !body.name.trim() ||
    !(body.email || body.contact || body.phone) ||
    !["contact", "visitor"].includes(body.type)
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (body.type === "contact" && !isEmailAddress(body.email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  const SMTP_PORT = Number(process.env.SMTP_PORT || 465);

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !Number.isInteger(SMTP_PORT) || SMTP_PORT < 1 || SMTP_PORT > 65535) {
    console.error("Contact email is not configured: check Gmail SMTP environment variables.");
    return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
  }

  const senderEmail = isEmailAddress(body.email)
    ? body.email.trim()
    : isEmailAddress(body.contact)
      ? body.contact.trim()
      : undefined;
  const details = [
    ["Name", body.name.trim()],
    ["Location", body.place],
    ["Email", body.email],
    ["Contact", body.contact],
    ["Phone", body.phone],
    ["Message", body.message],
  ].filter(([, value]) => typeof value === "string" && value.trim());
  const detailsText = details.map(([label, value]) => `${label}: ${value}`).join("\n");
  const detailsHtml = details.map(([label, value]) =>
    `<p style="margin:0 0 12px"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value.trim())}</p>`
  ).join("");

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  const from = { name: `${site.name} | No reply`, address: SMTP_USER };
  const name = body.name.trim();

  try {
    await transporter.sendMail({
      from,
      to: site.email,
      replyTo: senderEmail,
      subject: `New ${body.type} inquiry from ${name.replace(/[\r\n]+/g, " ")}`,
      text: detailsText,
      html: `<div style="background:#f4f7fb;padding:32px;font-family:Arial,sans-serif;color:#1f2937"><div style="max-width:600px;margin:auto;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:28px"><h2 style="margin:0 0 8px;color:#4338ca">New ${escapeHtml(body.type)} inquiry</h2><p style="color:#6b7280;margin:0 0 24px">A message was sent from your portfolio.</p>${detailsHtml}</div></div>`,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json({ error: "Unable to send email" }, { status: 500 });
  }

  if (!senderEmail) {
    return NextResponse.json({ ok: true, confirmationSent: false });
  }

  try {
    await transporter.sendMail({
      from,
      to: senderEmail,
      replyTo: site.email,
      subject: `We received your message | ${site.name}`,
      text: `Hi ${name},\n\nThanks for reaching out. Your message has been received, and ${site.name} will review it and reply soon.\n\nThis is an automated confirmation; please reply to this email if you need to add anything.\n\nBest,\n${site.name}`,
      html: `<div style="background:#f4f7fb;padding:32px;font-family:Arial,sans-serif;color:#1f2937"><div style="max-width:600px;margin:auto;background:#fff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden"><div style="background:#4338ca;padding:24px 28px;color:#fff"><p style="margin:0 0 6px;font-size:13px;letter-spacing:1px;text-transform:uppercase">Message received</p><h1 style="margin:0;font-size:24px">${escapeHtml(site.name)}</h1></div><div style="padding:28px"><p style="font-size:17px">Hi ${escapeHtml(name)},</p><p style="line-height:1.6;color:#4b5563">Thanks for reaching out. Your message has been received, and ${escapeHtml(site.name)} will review it and reply soon.</p><p style="line-height:1.6;color:#4b5563">This is an automated confirmation. If you need to add anything, just reply to this email.</p><p style="margin:24px 0 0">Best,<br /><strong>${escapeHtml(site.name)}</strong></p></div></div></div>`,
    });
    return NextResponse.json({ ok: true, confirmationSent: true });
  } catch (error) {
    console.error("Failed to send contact confirmation email:", error);
    return NextResponse.json({ ok: true, confirmationSent: false });
  }
}
