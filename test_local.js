const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const filePath = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
  console.log("Navigating to " + filePath);
  await page.goto(filePath, { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'local_test_restored.png', fullPage: true });
  await browser.close();
  console.log('Done');
})();
