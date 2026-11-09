"use client";

import { useState, type FormEvent } from "react";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Motion";

const types = ["Consulting", "Products", "Innovation Lab", "Corporate Training", "Other"];
type Values = { name: string; company: string; email: string; phone: string; type: string; message: string };
const empty: Values = { name: "", company: "", email: "", phone: "", type: "", message: "" };
type Status = "idle" | "sending" | "sent" | "failed" | "unconnected";

/** Set NEXT_PUBLIC_ENQUIRY_ENDPOINT to a URL that accepts a JSON POST. Until then the form reports it is not connected. */
const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;

function validate(v: Values) {
  const e: Partial<Record<keyof Values, string>> = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name.";
  if (!v.company.trim()) e.company = "Enter your company name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid business email address.";
  if (v.phone.trim() && !/^\+?[\d\s()-]{7,18}$/.test(v.phone.trim())) e.phone = "Enter a valid contact number, or leave it blank.";
  if (!v.type) e.type = "Select an enquiry type.";
  if (v.message.trim().length < 10) e.message = "Enter a message of at least 10 characters.";
  return e;
}

const field = "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-ink";

export default function Contact() {
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof Values) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length) return setStatus("idle");
    if (!ENDPOINT) return setStatus("unconnected");
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
      if (!res.ok) throw new Error(String(res.status));
      setV(empty);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  const input = (k: keyof Values, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, req = true) => (
    <div>
      <label htmlFor={k} className="text-sm font-semibold">{label}{req && <span aria-hidden className="text-ink/60"> *</span>}</label>
      <input id={k} name={k} value={v[k]} onChange={set(k)} aria-required={req} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-err` : undefined} className={`${field} ${errors[k] ? "border-red-600" : "border-line"}`} {...props} />
      {errors[k] && <p id={`${k}-err`} className="mt-1.5 text-sm text-red-700">{errors[k]}</p>}
    </div>
  );

  return (
    <Section id="contact" tone="white">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="contact" title="Let's Build Something Intelligent Together." text="Connect with BIZTAB to discuss enterprise consulting, software products, AI innovation and corporate training." />
          <div aria-hidden className="mt-8 h-1 w-16 rounded-full bg-brand" />
        </div>

        <Reveal delay={0.08}>
          <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-mist p-6 sm:p-9">
            <p className="mb-6 text-sm text-ink/65">Fields marked * are required.</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {input("name", "Full Name", { autoComplete: "name", placeholder: "Your full name" })}
              {input("company", "Company", { autoComplete: "organization", placeholder: "Your company name" })}
              {input("email", "Business Email", { type: "email", autoComplete: "email", placeholder: "name@company.com" })}
              {input("phone", "Contact Number (optional)", { type: "tel", autoComplete: "tel", placeholder: "Include country code" }, false)}
            </div>
            <div className="mt-6">
              <label htmlFor="type" className="text-sm font-semibold">Enquiry Type<span aria-hidden className="text-ink/60"> *</span></label>
              <select id="type" name="type" aria-required value={v.type} onChange={set("type")} aria-invalid={!!errors.type} aria-describedby={errors.type ? "type-err" : undefined} className={`${field} ${errors.type ? "border-red-600" : "border-line"}`}>
                <option value="">Select an option</option>
                {types.map((t) => <option key={t}>{t}</option>)}
              </select>
              {errors.type && <p id="type-err" className="mt-1.5 text-sm text-red-700">{errors.type}</p>}
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="text-sm font-semibold">Message<span aria-hidden className="text-ink/60"> *</span></label>
              <textarea id="message" name="message" rows={5} placeholder="Tell us briefly what you would like to discuss." aria-required value={v.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} className={`${field} resize-y ${errors.message ? "border-red-600" : "border-line"}`} />
              {errors.message && <p id="message-err" className="mt-1.5 text-sm text-red-700">{errors.message}</p>}
            </div>

            <button type="submit" disabled={status === "sending"} className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-7 py-3 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-[#ff8a4c] disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send Enquiry"}
            </button>

            <div aria-live="polite" className="mt-5 text-sm">
              {status === "unconnected" && <p className="rounded-xl border border-ink/20 bg-white px-4 py-3">This form is not connected to a backend yet, so your enquiry was not sent.</p>}
              {status === "sent" && <p role="status" className="rounded-xl border border-ink/20 bg-white px-4 py-3">Thank you. Your enquiry has been sent to the BIZTAB team.</p>}
              {status === "failed" && <p className="rounded-xl border border-red-600/40 bg-white px-4 py-3 text-red-700">Your enquiry could not be sent. Check your connection and try again.</p>}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
