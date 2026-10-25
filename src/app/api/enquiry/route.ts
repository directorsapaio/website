import { NextResponse } from "next/server";

const required = ["name", "company", "email", "phone", "industry", "service", "location", "message"] as const;
const fields = [...required, "requirement"] as const;

export async function POST(request: Request) {
  const form = await request.formData();
  if (String(form.get("website") ?? "").trim()) return NextResponse.json({ ok: true });
  const values = Object.fromEntries(fields.map((key) => [key, String(form.get(key) ?? "").trim()])) as Record<(typeof fields)[number], string>;
  const missing = required.filter((key) => !values[key]);
  if (missing.length || form.get("privacy") !== "on") return NextResponse.json({ message: "Required enquiry details are missing." }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(values.email)) return NextResponse.json({ message: "Enter a valid work email address." }, { status: 400 });
  if (!/^[+\d][\d\s()-]{7,19}$/.test(values.phone)) return NextResponse.json({ message: "Enter a valid phone number." }, { status: 400 });
  if (fields.some((key) => values[key].length > (key === "message" ? 4000 : 500))) {
    return NextResponse.json({ message: "One or more fields are too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !from || !to) {
    return NextResponse.json({ message: "Online enquiry delivery is not configured yet. Please email business@sapaioifm.com or call +91 84462 25973." }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Website proposal request — ${values.company.replace(/[\r\n]+/g, " ").slice(0, 120)}`,
        text: [
          `Name: ${values.name}`,
          `Company / organisation: ${values.company}`,
          `Work email: ${values.email}`,
          `Phone: ${values.phone}`,
          `Industry: ${values.industry}`,
          `Service: ${values.service}`,
          `City / location: ${values.location}`,
          `Approximate requirement: ${values.requirement || "Not provided"}`,
          "",
          "Message:",
          values.message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "The enquiry could not be delivered right now. Please email or call SIF instead." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "The enquiry could not be delivered right now. Please email or call SIF instead." }, { status: 502 });
  }
}
