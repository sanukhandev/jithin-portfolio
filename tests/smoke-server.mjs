import { spawn } from "child_process";

const PORT = 3008;
const BASE_URL = `http://localhost:${PORT}`;

console.log("Starting Next.js production server on port", PORT);
const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  shell: true,
  stdio: ["ignore", "pipe", "pipe"],
});

server.stdout.on("data", (data) => {
  // console.log(`[server stdout]: ${data}`);
});

server.stderr.on("data", (data) => {
  console.error(`[server stderr]: ${data}`);
});

async function waitForServer(url, timeout = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(`${url}/en`);
      if (res.status === 200) return true;
    } catch {
      // wait a bit
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error("Server failed to start within timeout");
}

async function runSmokeTests() {
  try {
    await waitForServer(BASE_URL);
    console.log("Next.js server is ready. Executing HTTP smoke tests...");

    // 1. Root redirect check
    const rootRes = await fetch(`${BASE_URL}/`, { redirect: "manual" });
    console.log(`[Root /]: status = ${rootRes.status}, location = ${rootRes.headers.get("location")}`);
    if (rootRes.status !== 307 && rootRes.status !== 308) {
      throw new Error(`Expected root redirect, got ${rootRes.status}`);
    }

    // 2. English homepage check
    const enRes = await fetch(`${BASE_URL}/en`);
    const enHtml = await enRes.text();
    console.log(`[EN /en]: status = ${enRes.status}, length = ${enHtml.length}`);
    if (!enHtml.includes('lang="en"') || !enHtml.includes('dir="ltr"')) {
      throw new Error("Missing lang=en or dir=ltr in English page");
    }
    if (!enHtml.includes("Jithin K") || !enHtml.includes("Chief Innovation Officer")) {
      throw new Error("Missing Jithin K or CIO title in English page");
    }

    // 3. Italian homepage check
    const itRes = await fetch(`${BASE_URL}/it`);
    const itHtml = await itRes.text();
    console.log(`[IT /it]: status = ${itRes.status}, length = ${itHtml.length}`);
    if (!itHtml.includes('lang="it"') || !itHtml.includes('dir="ltr"')) {
      throw new Error("Missing lang=it or dir=ltr in Italian page");
    }
    if (!itHtml.includes("Progettare")) {
      throw new Error("Missing Italian copy in Italian page");
    }

    // 4. Arabic homepage check (RTL validation)
    const arRes = await fetch(`${BASE_URL}/ar`);
    const arHtml = await arRes.text();
    console.log(`[AR /ar]: status = ${arRes.status}, length = ${arHtml.length}`);
    if (!arHtml.includes('lang="ar"') || !arHtml.includes('dir="rtl"')) {
      throw new Error("Missing lang=ar or dir=rtl in Arabic page");
    }
    if (!arHtml.includes("الرئيس التنفيذي للابتكار")) {
      throw new Error("Missing Arabic role in Arabic page");
    }

    // 5. Work detail page check
    const workRes = await fetch(`${BASE_URL}/en/work/ai-opportunity-radar`);
    const workHtml = await workRes.text();
    console.log(`[Work detail /en/work/ai-opportunity-radar]: status = ${workRes.status}`);
    if (workRes.status !== 200 || !workHtml.includes("AI Opportunity Radar")) {
      throw new Error("Work detail page failed to render");
    }

    // 6. Insights detail page check
    const insightRes = await fetch(`${BASE_URL}/it/insights/beyond-the-ai-demo`);
    const insightHtml = await insightRes.text();
    console.log(`[Insight detail /it/insights/beyond-the-ai-demo]: status = ${insightRes.status}`);
    if (insightRes.status !== 200 || !insightHtml.includes("Oltre la demo IA")) {
      throw new Error("Insight detail page failed to render");
    }

    // 7. Sitemap check
    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    const sitemapText = await sitemapRes.text();
    console.log(`[Sitemap /sitemap.xml]: status = ${sitemapRes.status}`);
    if (sitemapRes.status !== 200 || !sitemapText.includes("<urlset")) {
      throw new Error("Sitemap XML endpoint failed");
    }

    // 8. Robots check
    const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
    const robotsText = await robotsRes.text();
    console.log(`[Robots /robots.txt]: status = ${robotsRes.status}, text =\n${robotsText.trim()}`);
    if (robotsRes.status !== 200 || !robotsText.toLowerCase().includes("user-agent")) {
      throw new Error("Robots endpoint failed");
    }

    console.log("All HTTP smoke tests PASSED successfully!");
    server.kill();
    process.exit(0);
  } finally {
    server.kill();
  }
}

runSmokeTests().catch((err) => {
  console.error("Smoke test failure:", err);
  server.kill();
  process.exit(1);
});
