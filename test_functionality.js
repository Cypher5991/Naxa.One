const { chromium } = require('playwright');
const path = require('path');

(async () => {
    let report = [];
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const filePath = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
    
    page.on('pageerror', error => report.push(`[ERROR] Page Error: ${error.message}`));
    page.on('console', msg => {
        if (msg.type() === 'error') report.push(`[ERROR] Console Error: ${msg.text()}`);
    });

    console.log(`Navigating to ${filePath}`);
    await page.goto(filePath, { waitUntil: 'networkidle' });

    // Test 1: Navigation Drawer
    try {
        await page.click('#nav-hamburger-btn');
        const drawer = await page.locator('#nav-drawer');
        const isVisible = await drawer.isVisible();
        if (isVisible) {
            report.push('[PASS] Hamburger menu opens navigation drawer.');
            await page.click('#close-drawer-btn');
            await page.waitForTimeout(300);
            const isHidden = !(await drawer.isVisible());
            report.push(isHidden ? '[PASS] Close button hides navigation drawer.' : '[FAIL] Close button did not hide drawer.');
        } else {
            report.push('[FAIL] Hamburger menu did not open navigation drawer.');
        }
    } catch (e) {
        report.push(`[FAIL] Navigation Drawer Test: ${e.message}`);
    }

    // Test 2: Booking Button (scrolls to section)
    try {
        await page.click('#nav-discovery-btn');
        await page.waitForTimeout(500); // Wait for smooth scroll
        
        // We verify that the window scrolled down (the section is at the bottom)
        const scrollY = await page.evaluate(() => window.scrollY);
        if (scrollY > 500) {
            report.push('[PASS] "Book 15-Min Call" button scrolls to the booking section.');
        } else {
            report.push('[FAIL] "Book 15-Min Call" button did not scroll the page.');
        }
    } catch (e) {
        report.push(`[FAIL] Booking Button Test: ${e.message}`);
    }

    // Test 3: Sliders and Calculator
    try {
        const initialScore = await page.textContent('#res-score');
        const slider = await page.locator('#slider-infra');
        await slider.fill('5');
        await page.waitForTimeout(100);
        const newScore = await page.textContent('#res-score');
        
        if (initialScore !== newScore) {
            report.push(`[PASS] Calculator sliders update the score dynamically (${initialScore} -> ${newScore}).`);
        } else {
            report.push(`[FAIL] Calculator sliders did not update the score.`);
        }
    } catch (e) {
        report.push(`[FAIL] Calculator Test: ${e.message}`);
    }

    // Test 4: Parallax Elements existence
    try {
        const heroVideo = await page.locator('.hero-video-bg').count();
        const calcVideo = await page.locator('.calc-video-bg').count();
        if (heroVideo > 0 && calcVideo > 0) {
            report.push('[PASS] Hero video and Calculator video backgrounds are present in the DOM.');
        } else {
            report.push(`[FAIL] Missing backgrounds. Hero: ${heroVideo}, Calc: ${calcVideo}`);
        }
    } catch (e) {
        report.push(`[FAIL] Parallax Test: ${e.message}`);
    }

    await browser.close();
    
    console.log('--- TEST REPORT ---');
    console.log(report.join('\n'));
})();
