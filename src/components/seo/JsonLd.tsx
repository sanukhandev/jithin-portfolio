import React from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Array<unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  // Sanitize JSON string against closing script tags and HTML injection
  const jsonString = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
