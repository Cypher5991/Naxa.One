const { chromium } = require('playwright-core');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`file://${__dirname}/index.html`);

    // Wait for animations
    await page.waitForTimeout(1000);
    
    // Screenshot 1: Operations & Literacy Section
    const opsLocator = page.locator('#operations');
    if (await opsLocator.count() > 0) {
        await opsLocator.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500); // Wait for scroll
        await page.screenshot({ path: 'proof_operations.png' });
        console.log('Saved proof_operations.png');
    }

    // Screenshot 2: Calculator Gated Results
    const calcLocator = page.locator('#audit');
    if (await calcLocator.count() > 0) {
        await calcLocator.scrollIntoViewIfNeeded();
        // Wait for it to be visible
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'proof_calculator_gated.png' });
        console.log('Saved proof_calculator_gated.png');
        
        // Try clicking the unlock button
        const unlockBtn = page.locator('button:has-text("Unlock My Score")');
        if (await unlockBtn.count() > 0) {
            await unlockBtn.click({ force: true }); // Use force true if covered
            await page.waitForTimeout(500);
            
            const modal = page.locator('#lead-modal');
            if (await modal.isVisible()) {
                await page.screenshot({ path: 'proof_lead_modal.png' });
                console.log('Saved proof_lead_modal.png');
            } else {
                console.log('Lead modal not visible after clicking');
            }
        } else {
            console.log('Unlock button not found');
        }
    }

    await browser.close();
})();
