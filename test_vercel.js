const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://naxa-one.vercel.app');
  await page.screenshot({ path: 'vercel_app_test.png', fullPage: true });
  await browser.close();
  console.log('Done');
})();
