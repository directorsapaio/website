"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, TriangleAlert } from "lucide-react";
import { activeServices } from "@/config/services";
import { industryFamilies } from "@/config/industries";
import { siteConfig } from "@/config/site";

type FormStatus = { kind: "idle" | "loading" | "success" | "error"; message?: string };
type Errors = Record<string, string>;

function validate(form: HTMLFormElement): Errors {
  const data = new FormData(form);
  const errors: Errors = {};
  const required = ["name", "company", "email", "phone", "industry", "service", "location", "message"];
  for (const field of required) if (!String(data.get(field) ?? "").trim()) errors[field] = "This field is required.";
  if (data.get("email") && !/^\S+@\S+\.\S+$/.test(String(data.get("email")))) errors.email = "Enter a valid work email address.";
  if (data.get("phone") && !/^[+\d][\d\s()-]{7,19}$/.test(String(data.get("phone")))) errors.phone = "Enter a valid phone number.";
  if (!data.get("privacy")) errors.privacy = "Please confirm the privacy acknowledgement.";
  return errors;
}

export function EnquiryForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus({ kind: "error", message: "Review the highlighted fields and try again." });
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setStatus({ kind: "loading" });
    try {
      const response = await fetch("/api/enquiry", { method: "POST", body: new FormData(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "The enquiry could not be sent.");
      setStatus({ kind: "success", message: "Your enquiry has been sent. SIF will respond using the details provided." });
      form.reset();
      setErrors({});
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "The enquiry could not be sent. Please use email or phone instead." });
    }
  }

  const fieldError = (name: string) => errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null;
  const errorProps = (name: string) => ({ "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${name}-error` : undefined });

  return (
    <form className="enquiry-form" noValidate onSubmit={submit}>
      <div className="form-grid">
        <label><span>Name</span><input name="name" autoComplete="name" maxLength={500} {...errorProps("name")} />{fieldError("name")}</label>
        <label><span>Company / organisation</span><input name="company" autoComplete="organization" maxLength={500} {...errorProps("company")} />{fieldError("company")}</label>
        <label><span>Work email</span><input name="email" type="email" autoComplete="email" maxLength={500} {...errorProps("email")} />{fieldError("email")}</label>
        <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" maxLength={20} {...errorProps("phone")} />{fieldError("phone")}</label>
        <label><span>Industry</span><select name="industry" defaultValue="" {...errorProps("industry")}><option value="" disabled>Select an industry group</option>{industryFamilies.map((family) => <option key={family}>{family}</option>)}<option>Other</option></select>{fieldError("industry")}</label>
        <label><span>Service of interest</span><select name="service" defaultValue="" {...errorProps("service")}><option value="" disabled>Select a confirmed service</option>{activeServices.map((service) => <option key={service.slug} value={service.shortTitle}>{service.shortTitle}</option>)}<option>Not sure — discuss my requirement</option></select>{fieldError("service")}</label>
        <label className="form-span"><span>City / location</span><input name="location" autoComplete="address-level2" maxLength={500} {...errorProps("location")} />{fieldError("location")}</label>
        <label className="form-span"><span>Approximate facility or workforce requirement <small>Optional</small></span><input name="requirement" maxLength={500} placeholder="For example: office size, number of locations or shift pattern" /></label>
        <label className="form-span"><span>Message</span><textarea name="message" rows={6} maxLength={4000} placeholder="Tell us about the facility, work areas, operating hours and priorities." {...errorProps("message")} />{fieldError("message")}</label>
        <label className="privacy-check form-span"><input name="privacy" type="checkbox" {...errorProps("privacy")} /><span>I agree that SIF may use these details to respond to my enquiry. I have read the <a href="/privacy">privacy policy</a>.</span>{fieldError("privacy")}</label>
        <label className="honeypot" aria-hidden="true">Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="form-submit">
        <button className="button" type="submit" disabled={status.kind === "loading"}>{status.kind === "loading" ? <><LoaderCircle className="spin" />Checking form</> : <>Send enquiry <ArrowRight /></>}</button>
        <p>Use this form or email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> directly.</p>
      </div>
      {status.kind !== "idle" && status.kind !== "loading" && <div className={`form-status form-status--${status.kind}`} role={status.kind === "error" ? "alert" : "status"}>{status.kind === "success" ? <CheckCircle2 /> : <TriangleAlert />}<p>{status.message}</p></div>}
    </form>
  );
}
