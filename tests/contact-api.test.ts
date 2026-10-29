import { describe, it, expect } from "vitest";
import { POST } from "../src/app/api/contact/route";

describe("Contact API Route (/api/contact)", () => {
  it("should accept valid submissions and route to jithinkjacob@live.it", async () => {
    const mockRequest = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Elena Rossi",
        email: "elena@enterprise.com",
        subject: "Executive AI Advisory Inquiry",
        message: "We would like to discuss strategic advisory for our enterprise AI transformation roadmap.",
      }),
    });

    const response = await POST(mockRequest);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.recipient).toBe("jithinkjacob@live.it");
  });

  it("should reject invalid submissions missing required fields or invalid email", async () => {
    const invalidEmailRequest = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Elena Rossi",
        email: "not-an-email",
        message: "Valid length message here for testing.",
      }),
    });

    const response = await POST(invalidEmailRequest);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
  });
});
