const { chromium } = require('playwright-core');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    const results = {
        viewports: {},
        accessibility: {},
        elements: {}
    };

    const viewports = [
        { name: 'mobile', width: 375, height: 812 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'desktop', width: 1440, height: 900 }
    ];

    await page.goto(`file://${__dirname}/index.html`);

    for (const vp of viewports) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(500);

        // Check horizontal scroll overflow
        const overflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > window.innerWidth;
        });

        // Check tap targets < 48px on mobile
        let smallTapTargets = 0;
        if (vp.name === 'mobile') {
            smallTapTargets = await page.evaluate(() => {
                const clickables = document.querySelectorAll('a, button, input, select, textarea');
                let count = 0;
                clickables.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
                        count++;
                    }
                });
                return count;
            });
        }

        await page.screenshot({ path: `audit_${vp.name}.png` });

        results.viewports[vp.name] = {
            hasHorizontalOverflow: overflow,
            scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth),
            viewportWidth: vp.width,
            smallTapTargets: smallTapTargets
        };
    }

    // Inspect Accessibility & Semantic HTML
    results.accessibility = await page.evaluate(() => {
        const imagesWithoutAlt = Array.from(document.querySelectorAll('img')).filter(img => !img.hasAttribute('alt') || img.getAttribute('alt').trim() === '').map(img => img.src);
        const buttonsWithoutAriaOrText = Array.from(document.querySelectorAll('button')).filter(btn => !btn.innerText.trim() && !btn.hasAttribute('aria-label')).map(btn => btn.outerHTML);
        const h1Count = document.querySelectorAll('h1').length;
        const missingFocusRings = Array.from(document.querySelectorAll('a, button, input')).filter(el => {
            const style = window.getComputedStyle(el);
            return style.outlineStyle === 'none' && style.boxShadow === 'none';
        }).length;

        return {
            imagesWithoutAltCount: imagesWithoutAlt.length,
            imagesWithoutAlt: imagesWithoutAlt,
            buttonsWithoutLabelCount: buttonsWithoutAriaOrText.length,
            h1Count: h1Count,
            totalButtons: document.querySelectorAll('button').length,
            totalLinks: document.querySelectorAll('a').length
        };
    });

    fs.writeFileSync('audit_raw_results.json', JSON.stringify(results, null, 2));
    console.log('Raw audit completed successfully.');

    await browser.close();
})();
