import { NextResponse } from "next/server";

const required = ["name", "company", "email", "phone", "industry", "service", "location", "message"] as const;

export async function POST(request: Request) {
  const form = await request.formData();
  if (String(form.get("website") ?? "").trim()) return NextResponse.json({ ok: true });
  const missing = required.filter((key) => !String(form.get(key) ?? "").trim());
  if (missing.length || form.get("privacy") !== "on") return NextResponse.json({ message: "Required enquiry details are missing." }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(String(form.get("email")))) return NextResponse.json({ message: "Enter a valid work email address." }, { status: 400 });
  return NextResponse.json({ message: "Online enquiry delivery is not configured yet. Please email director.sapaio@gmail.com or call +91 84462 25973." }, { status: 503 });
}
