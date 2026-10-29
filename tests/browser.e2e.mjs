import { chromium } from "@playwright/test";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const PORT = 3009;
const BASE_URL = `http://localhost:${PORT}`;

const VIEWPORTS = [
  { name: "mobile-compact", width: 320, height: 600 },
  { name: "mobile-standard", width: 375, height: 667 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop-small", width: 1024, height: 768 },
  { name: "desktop-large", width: 1440, height: 900 },
];

const LOCALES = ["en", "it", "ar"];

const SCREENSHOTS_DIR = path.resolve("./reports/screenshots");
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

console.log("Starting Next.js server for e2e tests on port", PORT);
const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  shell: true,
  stdio: ["ignore", "pipe", "pipe"],
});

async function waitForServer(url, timeout = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(`${url}/en`);
      if (res.status === 200) return true;
    } catch {
      // wait
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error("Server failed to start within timeout");
}

async function runBrowserTests() {
  await waitForServer(BASE_URL);
  console.log("Server ready. Launching headless Chromium browser...");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = {
    viewportsTested: [],
    localesTested: [],
    mobileMenuTested: false,
    themeToggleTested: false,
    horizontalScrollOverflowPassed: true,
  };

  try {
    // 1. Test each locale at standard desktop (1440px)
    for (const locale of LOCALES) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${BASE_URL}/${locale}`, { waitUntil: "networkidle" });

      // Verify HTML attributes
      const lang = await page.getAttribute("html", "lang");
      const dir = await page.getAttribute("html", "dir");
      console.log(`[Locale ${locale}]: lang=${lang}, dir=${dir}`);

      if (locale === "ar" && dir !== "rtl") {
        throw new Error("Arabic page failed RTL check!");
      }

      // Check for horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      if (scrollWidth > clientWidth) {
        console.error(`Horizontal overflow detected in ${locale} at 1440px: scrollWidth=${scrollWidth}, clientWidth=${clientWidth}`);
        results.horizontalScrollOverflowPassed = false;
      }

      // Take screenshot
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `${locale}-desktop.png`),
        fullPage: false,
      });

      results.localesTested.push(locale);
    }

    // 2. Test all required viewport widths: 320, 375, 768, 1024, 1440px
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/en`, { waitUntil: "networkidle" });

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      const hasOverflow = scrollWidth > clientWidth;
      console.log(`[Viewport ${vp.name} (${vp.width}x${vp.height})]: scrollWidth=${scrollWidth}, clientWidth=${clientWidth}, overflow=${hasOverflow}`);

      if (hasOverflow) {
        results.horizontalScrollOverflowPassed = false;
      }

      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `en-${vp.name}.png`),
      });

      results.viewportsTested.push(vp.name);
    }

    // 3. Test Mobile Navigation drawer (at 375px)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/en`, { waitUntil: "networkidle" });

    // Open mobile menu
    const menuBtn = page.getByRole("button", { name: /open menu/i });
    await menuBtn.click();
    await page.waitForTimeout(300);

    const drawer = page.getByRole("dialog", { name: /mobile navigation/i });
    const isDrawerVisible = await drawer.isVisible();
    console.log(`[Mobile Menu]: Open dialog visible = ${isDrawerVisible}`);

    // Press Escape to close
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const isDrawerHidden = !(await drawer.isVisible());
    console.log(`[Mobile Menu]: Closed via Escape = ${isDrawerHidden}`);
    results.mobileMenuTested = isDrawerVisible && isDrawerHidden;

    // 4. Test Theme Toggle
    await page.goto(`${BASE_URL}/en`, { waitUntil: "networkidle" });
    const initialTheme = await page.getAttribute("html", "data-theme");
    console.log(`[Theme Toggle]: Initial theme = ${initialTheme}`);

    const themeToggleBtn = page.getByRole("button", { name: /switch to dark theme/i });
    await themeToggleBtn.click();
    await page.waitForTimeout(200);

    const toggledTheme = await page.getAttribute("html", "data-theme");
    console.log(`[Theme Toggle]: Toggled theme = ${toggledTheme}`);
    results.themeToggleTested = toggledTheme === "dark";

    // Screenshot dark theme
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, "en-dark-theme.png"),
    });

    console.log("\n--- BROWSER SMOKE TEST RESULTS ---");
    console.log(JSON.stringify(results, null, 2));

    if (!results.horizontalScrollOverflowPassed || !results.themeToggleTested || !results.mobileMenuTested) {
      throw new Error("One or more browser checks failed");
    }

    console.log("All browser smoke tests PASSED successfully!");
  } finally {
    await browser.close();
    server.kill();
  }
}

runBrowserTests()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Browser test failed:", err);
    server.kill();
    process.exit(1);
  });
