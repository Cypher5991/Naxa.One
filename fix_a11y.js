const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let html = fs.readFileSync(path.join(dir, file), 'utf8');

    // Add aria-labels to range inputs
    html = html.replace(/<input type="range" id="slider-infra"/g, '<input type="range" aria-label="Infrastructure Level" id="slider-infra"');
    html = html.replace(/<input type="range" id="slider-auto"/g, '<input type="range" aria-label="Automation Level" id="slider-auto"');
    html = html.replace(/<input type="range" id="slider-data"/g, '<input type="range" aria-label="Data Maturity Level" id="slider-data"');
    html = html.replace(/<input type="range" id="slider-strat"/g, '<input type="range" aria-label="Strategy Level" id="slider-strat"');
    html = html.replace(/<input type="range" id="visitors-slider"/g, '<input type="range" aria-label="Monthly Visitors" id="visitors-slider"');
    html = html.replace(/<input type="range" id="aov-slider"/g, '<input type="range" aria-label="Average Order Value" id="aov-slider"');
    html = html.replace(/<input type="range" id="search-slider"/g, '<input type="range" aria-label="Monthly Search Volume" id="search-slider"');
    html = html.replace(/<input type="range" id="cpc-slider"/g, '<input type="range" aria-label="Cost Per Click" id="cpc-slider"');
    html = html.replace(/<input type="range" id="content-slider"/g, '<input type="range" aria-label="Content Pieces per Month" id="content-slider"');
    html = html.replace(/<input type="range" id="ad-slider"/g, '<input type="range" aria-label="Monthly Ad Spend" id="ad-slider"');

    // Add aria-label to segment select
    html = html.replace(/<select name="segment" required/g, '<select aria-label="Business Segment" name="segment" required');

    // Add aria-label to social links
    html = html.replace(/<a href="#" class="text-slate-400 hover:text-emerald-400 transition-colors">(\s*<i class="fab fa-(twitter|linkedin-in|instagram)"><\/i>\s*)<\/a>/g, '<a href="#" aria-label="$2 profile" class="text-slate-400 hover:text-emerald-400 transition-colors">$1</a>');
    
    // Contrast ratio fix for "TRUSTED BY GROWING ENTERPRISES"
    html = html.replace(/text-slate-500 uppercase tracking-widest/g, 'text-slate-600 uppercase tracking-widest'); 

    // Footer heading level fix (<h4> to <h3>)
    html = html.replace(/<h4/g, '<h3');
    html = html.replace(/<\/h4>/g, '</h3>');
    
    // Convert modal <a> tags to <button>
    html = html.replace(/<a href="javascript:void\(0\)" onclick="openBookingModal\(\)"(.*?)>(.*?)<\/a>/g, '<button onclick="openBookingModal()"$1>$2</button>');

    // Add aria-hidden to video
    html = html.replace(/<video class="(.*?)" autoplay loop muted playsinline>/g, '<video class="$1" autoplay loop muted playsinline aria-hidden="true">');
    
    fs.writeFileSync(path.join(dir, file), html);
    console.log(`Patched ${file}`);
});
