"use client";

import { useState } from "react";
import { company, printingNeeds } from "@/lib/content";
import { CropMarks } from "./print";

/**
 * Enquiry form.
 *
 * There is no backend on this site yet, so a valid submission opens the
 * reader's mail client with the enquiry already composed. Nothing is
 * sent anywhere else and no data leaves the browser.
 *
 * ── Wiring up a real endpoint ─────────────────────────────────────
 * Replace the body of `handleSubmit` with a POST to your form service
 * or a Next.js server action, and swap the success copy below.
 */

type Fields = {
  name: string;
  company: string;
  phone: string;
  email: string;
  need: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  company: "",
  phone: "",
  email: "",
  need: "",
  message: "",
};

const FIELD_CLASS =
  "w-full border border-ink/20 bg-paper px-4 py-3.5 text-ink transition-colors duration-300 placeholder:text-ink/65 focus:border-burgundy focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-burgundy";

export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [sent, setSent] = useState(false);
  const [summary, setSummary] = useState("");

  const set = (key: keyof Fields) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!values.name.trim())
      next.name =
        "Name is missing. Please type your name so we know who to reply to.";
    if (!values.message.trim())
      next.message =
        "Message is missing. Please describe what you need printed — size, quantity or material, whatever you know.";

    // One contact route is enough, but we need at least one.
    const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim());
    const hasPhone = values.phone.replace(/\D/g, "").length >= 10;

    if (!values.email.trim() && !values.phone.trim()) {
      next.email =
        "No contact details. Please add an email address or a phone number so we can reply.";
    } else if (values.email.trim() && !hasEmail) {
      next.email =
        "That email address isn't valid. Use the form name@example.com.";
    }
    if (values.phone.trim() && !hasPhone) {
      next.phone =
        "That phone number is too short. Enter at least 10 digits, for example 98765 43210.";
    }

    setErrors(next);
    const count = Object.keys(next).length;
    setSummary(
      count
        ? `Your enquiry was not sent. Please fix ${count} ${count === 1 ? "field" : "fields"} below.`
        : "",
    );
    if (count) {
      // Move focus to the first invalid field so keyboard and
      // screen-reader users land on the problem.
      const first = ["name", "phone", "email", "message"].find(
        (k) => k in next,
      );
      requestAnimationFrame(() => document.getElementById(first!)?.focus());
    }
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const body = [
      `Name: ${values.name}`,
      values.company && `Company: ${values.company}`,
      values.phone && `Phone: ${values.phone}`,
      values.email && `Email: ${values.email}`,
      values.need && `Requirement: ${values.need}`,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    const subject = `Printing enquiry — ${values.company || values.name}`;
    const mailto = `${company.emailHref}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    // Hand the composed enquiry to the mail client. A synthetic anchor
    // keeps this an external protocol handoff rather than a navigation.
    const link = document.createElement("a");
    link.href = mailto;
    link.rel = "noopener";
    link.click();

    setSent(true);
  };

  if (sent) {
    return (
      <div
        role="status"
        className="relative border border-ink/20 bg-cream p-8 sm:p-10"
      >
        <CropMarks inset="0.6rem" />
        <p className="eyebrow text-leaf">Enquiry Composed</p>
        <h3 className="mt-5 font-serif text-2xl text-coffee sm:text-3xl">
          Your mail client should now be open.
        </h3>
        <p className="measure mt-4 leading-relaxed text-ink/65">
          If nothing happened, write to us directly at{" "}
          <a
            href={company.emailHref}
            className="underline decoration-brass underline-offset-4 hover:text-burgundy"
          >
            {company.email}
          </a>{" "}
          or call{" "}
          <a
            href={company.phoneHref}
            className="underline decoration-brass underline-offset-4 hover:text-burgundy"
          >
            {company.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setSent(false);
          }}
          className="eyebrow mt-7 border border-ink/25 px-6 py-3.5 text-ink transition-colors hover:border-burgundy hover:bg-burgundy hover:text-paper"
        >
          Write another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative border border-ink/20 bg-cream p-7 sm:p-10"
    >
      <CropMarks inset="0.6rem" />

      <p className="eyebrow text-brass-deep">Enquiry Form</p>

      {/* Announced to assistive tech whenever validation fails. */}
      <p
        role="alert"
        className={
          summary
            ? "mt-5 border-l-4 border-burgundy bg-paper px-4 py-3 text-burgundy"
            : "sr-only"
        }
      >
        {summary}
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          required
          value={values.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="company"
          label="Company Name"
          value={values.company}
          onChange={set("company")}
          autoComplete="organization"
        />
        <Field
          id="phone"
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={set("phone")}
          error={errors.phone}
          autoComplete="tel"
          inputMode="tel"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
          inputMode="email"
        />
      </div>

      {/* Requirement ------------------------------------------------ */}
      <div className="mt-5">
        <label htmlFor="need" className="eyebrow block text-ink/65">
          What do you need printed?
        </label>
        <select
          id="need"
          name="need"
          value={values.need}
          onChange={(e) => set("need")(e.target.value)}
          className={`${FIELD_CLASS} mt-2.5 appearance-none bg-[length:0.7rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23B71C28'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="">Select a category</option>
          {printingNeeds.map((need) => (
            <option key={need} value={need}>
              {need}
            </option>
          ))}
        </select>
      </div>

      {/* Message ---------------------------------------------------- */}
      <div className="mt-5">
        <label htmlFor="message" className="eyebrow block text-ink/65">
          Message <span className="text-burgundy">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder="Quantity, size, material, finishing — whatever you already know."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${FIELD_CLASS} mt-2.5 resize-y`}
        />
        {errors.message && (
          <p
            id="message-error"
            role="alert"
            className="eyebrow mt-2 text-burgundy"
          >
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="eyebrow group mt-8 inline-flex w-full items-center justify-center gap-2.5 border border-burgundy bg-burgundy px-7 py-4 text-paper transition-colors duration-300 hover:border-coffee hover:bg-coffee sm:w-auto"
      >
        Send Enquiry
        <span
          className="transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </button>

      <p className="eyebrow mt-5 text-ink/65">
        Opens in your mail app — nothing is stored on this site.
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  /** Receives the field value, not the raw change event. */
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id" | "value" | "onChange" | "required" | "type"
>) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-ink/65">
        {label} {required && <span className="text-burgundy">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${FIELD_CLASS} mt-2.5`}
        {...rest}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="eyebrow mt-2 text-burgundy"
        >
          {error}
        </p>
      )}
    </div>
  );
}
