const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://naxa-one.vercel.app', { waitUntil: 'networkidle' });
  
  const heroBox = await page.locator('.hero-content-box').boundingBox();
  const footerBox = await page.locator('footer#contact').boundingBox();
  
  console.log('Hero Box:', heroBox);
  console.log('Footer Box:', footerBox);
  
  if (heroBox && footerBox) {
      if (heroBox.y + heroBox.height > footerBox.y) {
          console.log('OVERLAP DETECTED!');
      } else {
          console.log('NO OVERLAP. LAYOUT IS FINE.');
      }
  }
  
  await browser.close();
})();
