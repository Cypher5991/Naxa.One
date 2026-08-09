const { chromium } = require('playwright-core');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`file://${__dirname}/index.html`);
    await page.waitForTimeout(2000);

    // Screenshot 1: Hero with typewriter (screenshot top)
    await page.screenshot({ path: 'proof_hero_editorial.png', clip: { x: 0, y: 0, width: 1280, height: 800 } });
    console.log('Saved proof_hero_editorial.png');

    // Screenshot 2: Case studies / results section
    const resultsSection = page.locator('section').nth(2);
    await resultsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'proof_results_rows.png' });
    console.log('Saved proof_results_rows.png');

    // Screenshot 3: Service index / hubs
    const hubsSection = page.locator('#hubs');
    if (await hubsSection.count() > 0) {
        await hubsSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'proof_service_index.png' });
        console.log('Saved proof_service_index.png');
    }

    await browser.close();
})();
