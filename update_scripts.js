const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the preloader script
const oldPreloaderStart = '// Preloader Logic: Wait until all images, fonts, videos and assets are fully loaded';
const oldPreloaderEnd = `})();\n    </script>`;

const preloaderStartIndex = html.indexOf(oldPreloaderStart);
const preloaderEndIndex = html.indexOf(oldPreloaderEnd, preloaderStartIndex) + oldPreloaderEnd.length;

if (preloaderStartIndex !== -1 && preloaderEndIndex !== -1) {
    const newPreloader = `// Preloader Logic: Tied to YouTube video playing to hide initial controls flash
        window.hidePreloader = function() {
            if (window.preloaderHidden) return;
            window.preloaderHidden = true;
            
            const bar = document.getElementById('loader-bar');
            if (bar) bar.style.width = '100%';
            
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                if (preloader) {
                    preloader.classList.add('opacity-0', 'pointer-events-none');
                    setTimeout(() => preloader.remove(), 700);
                }
            }, 300);
        };

        (function() {
            const bar = document.getElementById('loader-bar');
            let progress = 10;
            const interval = setInterval(() => {
                if (progress < 85) {
                    progress += Math.floor(Math.random() * 10) + 5;
                    if (bar) bar.style.width = progress + '%';
                }
            }, 100);

            window.addEventListener('load', function() {
                clearInterval(interval);
                // Fallback: If YouTube fails or is blocked, remove preloader anyway after a few seconds
                setTimeout(window.hidePreloader, 3500);
            });
        })();
    </script>`;
    
    html = html.substring(0, preloaderStartIndex) + newPreloader + html.substring(preloaderEndIndex);
}

// Replace the YouTube script
const ytStateStart = "'onStateChange': function(event) {";
const ytStateEnd = "}\n                }\n            });";

const ytStateStartIndex = html.indexOf(ytStateStart);
const ytStateEndIndex = html.indexOf(ytStateEnd, ytStateStartIndex) + ytStateEnd.length;

if (ytStateStartIndex !== -1 && ytStateEndIndex !== -1) {
    const newYtState = `'onStateChange': function(event) {
                        // Hide preloader ONLY when video actually starts playing (to cover the YouTube controls flash)
                        if (event.data === YT.PlayerState.PLAYING) {
                            if (typeof window.hidePreloader === 'function') window.hidePreloader();
                        }
                        if (event.data === YT.PlayerState.ENDED) {
                            player.seekTo(0);
                            player.playVideo();
                        }
                    }
                }
            });`;
    
    html = html.substring(0, ytStateStartIndex) + newYtState + html.substring(ytStateEndIndex);
}

fs.writeFileSync('index.html', html);
console.log('Successfully updated scripts.');
