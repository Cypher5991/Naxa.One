const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const filePath = 'file:///' + __dirname.replace(/\\/g, '/') + '/index.html';
  console.log('Loading:', filePath);
  
  await page.goto(filePath);
  
  // The preloader might take 700ms to fade out, let's wait 2 seconds
  await page.waitForTimeout(2000);
  
  const h1 = page.locator('h1').first();
  const isVisible = await h1.isVisible();
  const box = await h1.boundingBox();
  
  console.log('Hero H1 is visible:', isVisible);
  console.log('Hero H1 bounding box:', box);
  
  if (box && box.y > 800) {
      console.log('WARNING: The H1 is pushed down too far (y > 800).');
  }

  await page.screenshot({ path: 'playwright_test.png' });
  await browser.close();
})();
