const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const filePath = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
    
    await page.goto(filePath, { waitUntil: 'networkidle' });

    // Scroll to calculator
    const calc = await page.locator('#calculator');
    await calc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // Wait for parallax and video

    await calc.screenshot({ path: 'calculator_screenshot.png' });
    await browser.close();
    console.log('Screenshot saved as calculator_screenshot.png');
})();
