const { chromium } = require('playwright-core');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    const urls = [
        { name: 'undp_digital', url: 'https://www.undp.org/digital-innovation' },
        { name: 'skill_india', url: 'https://www.skillindiadigital.gov.in/home' },
        { name: 'vercel', url: 'https://vercel.com/' },
        { name: 'mckinsey', url: 'https://www.mckinsey.com/' },
        { name: 'linear', url: 'https://linear.app/' },
        { name: 'clay_global', url: 'https://clay.global/' },
        { name: 'code_and_theory', url: 'https://www.codeandtheory.com/' }
    ];

    for (const item of urls) {
        try {
            console.log(`Navigating to ${item.name}...`);
            const page = await context.newPage();
            await page.setViewportSize({ width: 1280, height: 800 });
            await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
            await page.waitForTimeout(2000);
            const screenshotPath = `ref_${item.name}.png`;
            await page.screenshot({ path: screenshotPath });
            console.log(`✓ Saved ${screenshotPath}`);
            await page.close();
        } catch (err) {
            console.warn(`✗ Failed to fetch ${item.name}: ${err.message}`);
        }
    }

    await browser.close();
})();
