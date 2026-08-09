const { chromium } = require('playwright-core');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: true });

    // LIGHT MODE - Desktop
    let page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`file://${__dirname}/index.html`);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'proof_light_hero.png', clip: { x:0, y:0, width:1280, height:900 } });
    console.log('✓ proof_light_hero.png');

    // Scroll to philosophy section
    await page.evaluate(() => { document.getElementById('philosophy')?.scrollIntoView(); });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'proof_light_philosophy.png' });
    console.log('✓ proof_light_philosophy.png');

    // Scroll to hubs
    await page.evaluate(() => { document.getElementById('hubs')?.scrollIntoView(); });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'proof_light_hubs.png' });
    console.log('✓ proof_light_hubs.png');

    // Scroll to calculator
    await page.evaluate(() => { document.getElementById('calculator')?.scrollIntoView(); });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'proof_light_calculator.png' });
    console.log('✓ proof_light_calculator.png');

    await page.close();

    // DARK MODE - toggle dark class via JS then screenshot
    page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`file://${__dirname}/index.html`);
    await page.evaluate(() => { document.documentElement.classList.add('dark'); });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'proof_dark_hero.png', clip: { x:0, y:0, width:1280, height:900 } });
    console.log('✓ proof_dark_hero.png');

    await page.evaluate(() => { document.getElementById('hubs')?.scrollIntoView(); });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'proof_dark_hubs.png' });
    console.log('✓ proof_dark_hubs.png');

    await page.evaluate(() => { document.getElementById('philosophy')?.scrollIntoView(); });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'proof_dark_philosophy.png' });
    console.log('✓ proof_dark_philosophy.png');

    await page.close();

    // MOBILE light
    page = await browser.newPage();
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`file://${__dirname}/index.html`);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'proof_mobile_light.png', fullPage: false });
    console.log('✓ proof_mobile_light.png');
    await page.close();

    await browser.close();
    console.log('\n✅ All screenshots complete.');
})();
