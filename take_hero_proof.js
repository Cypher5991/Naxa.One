const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({
        args: ['--autoplay-policy=no-user-gesture-required']
    });
    const page = await browser.newPage();
    const filePath = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
    
    await page.goto(filePath, { waitUntil: 'networkidle' });

    // Force the video to play
    await page.evaluate(() => {
        const videos = document.querySelectorAll('video');
        videos.forEach(v => {
            v.muted = true;
            v.play().catch(e => console.log('Video play error:', e));
        });
    });

    await page.waitForTimeout(2000); // wait for video to render a frame

    // Take screenshot of the Hero section (which is the top of the page)
    await page.screenshot({ path: 'hero_proof.png', clip: { x: 0, y: 0, width: 1280, height: 720 } });
    await browser.close();
    console.log('Screenshot saved as hero_proof.png');
})();
