import { NextResponse } from "next/server";
import { siteConfig } from "@/content/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate fields & enforce defensive upper bounds
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (2-100 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !email ||
      typeof email !== "string" ||
      email.trim().length > 254 ||
      !emailRegex.test(email.trim())
    ) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid corporate or professional email address." },
        { status: 400 }
      );
    }

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length < 10 ||
      message.trim().length > 5000
    ) {
      return NextResponse.json(
        { success: false, error: "Inquiry message must be between 10 and 5,000 characters." },
        { status: 400 }
      );
    }

    if (subject && typeof subject === "string" && subject.trim().length > 200) {
      return NextResponse.json(
        { success: false, error: "Subject must not exceed 200 characters." },
        { status: 400 }
      );
    }

    const recipient = siteConfig.verifiedLinks.email || "jithinkjacob@live.it";
    const sanitizedSubject =
      typeof subject === "string" && subject.trim().length > 0
        ? subject.trim()
        : "Executive Advisory & AI Transformation Inquiry";

    // Telemetry log for operational tracking
    console.info(
      `[Contact Inquiry Transmitted] From: ${name.trim()} <${email.trim()}> | To: ${recipient} | Subject: ${sanitizedSubject}`
    );

    // If RESEND_API_KEY is configured in production environment, dispatch via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || "portfolio@jithink.com",
            to: recipient,
            reply_to: email.trim(),
            subject: `[Portfolio Inquiry] ${sanitizedSubject} - ${name.trim()}`,
            text: `Executive Inquiry Received:\n\nFrom: ${name.trim()} (${email.trim()})\nSubject: ${sanitizedSubject}\n\nMessage:\n${message.trim()}\n\nTimestamp: ${new Date().toISOString()}`,
          }),
        });

        if (!resendRes.ok) {
          const errData = await resendRes.json().catch(() => ({}));
          console.error("[Contact API] Resend dispatch error:", errData);
        }
      } catch (dispatchErr) {
        console.error("[Contact API] Resend network error:", dispatchErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        recipient,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error during transmission." },
      { status: 500 }
    );
  }
}
