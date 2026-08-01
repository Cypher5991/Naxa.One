const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("Navigating to https://www.naxa.one...");
  await page.goto('https://www.naxa.one');

  // 1. Take a screenshot to verify CSS is working
  await page.screenshot({ path: 'playwright_test_restored.png', fullPage: true });
  console.log("Screenshot saved to playwright_test_restored.png");

  // 2. Check if the CTA is a button
  const ctaButtons = await page.$$('button:has-text("Book 15-Min Call")');
  console.log(`Found ${ctaButtons.length} "Book 15-Min Call" buttons instead of a tags.`);
  
  // 3. Check if slider has aria-label
  const slider = await page.$('input[type="range"]');
  if (slider) {
      const ariaLabel = await slider.getAttribute('aria-label');
      console.log(`Slider aria-label: ${ariaLabel}`);
  }

  // 4. Verify the background video exists and is playing
  const video = await page.$('#hero-video');
  if (video) {
      const ariaHidden = await video.getAttribute('aria-hidden');
      const autoplay = await video.getAttribute('autoplay');
      console.log(`Video aria-hidden: ${ariaHidden}, autoplay: ${autoplay !== null}`);
  }

  await browser.close();
  console.log("Playwright test completed successfully.");
})();
