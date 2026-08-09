const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({
        args: ['--autoplay-policy=no-user-gesture-required']
    });
    const page = await browser.newPage();
    const filePath = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
    
    await page.goto(filePath, { waitUntil: 'networkidle' });

    // Scroll to the calculator section
    const calc = await page.locator('#calculator');
    await calc.scrollIntoViewIfNeeded();
    
    // Force the video to play
    await page.evaluate(() => {
        const videos = document.querySelectorAll('video');
        videos.forEach(v => {
            v.muted = true;
            v.play().catch(e => console.log('Video play error:', e));
        });
    });

    await page.waitForTimeout(2000); // wait for video to render a frame

    // Take screenshot of the section
    await calc.screenshot({ path: 'slider_proof.png' });
    await browser.close();
    console.log('Screenshot saved as slider_proof.png');
})();
