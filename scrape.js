const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://pagespeed.web.dev/analysis/https-naxa-one/ud1q7cu733?hl=en&form_factor=mobile', { waitUntil: 'networkidle' });
  
  // Wait for the report to fully render
  await page.waitForTimeout(5000); 
  
  const text = await page.evaluate(() => {
     const audits = Array.from(document.querySelectorAll('.lh-audit'));
     return audits.map(a => a.innerText).join('\n\n');
  });
  
  require('fs').writeFileSync('pagespeed_audits.txt', text);
  await browser.close();
  console.log('Scraped audits.');
})();
