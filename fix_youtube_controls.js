const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Refactor Preloader Logic
const oldPreloaderLogic = `        // Preloader Logic: Wait until all images, fonts, videos and assets are fully loaded
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
                if (bar) bar.style.width = '100%';
                setTimeout(() => {
                    const preloader = document.getElementById('preloader');
                    if (preloader) {
                        preloader.classList.add('opacity-0', 'pointer-events-none');
                        setTimeout(() => {
                            preloader.remove();
                        }, 700);
                    }
                }, 300);
            });
        })();`;

const newPreloaderLogic = `        // Preloader Logic: Tied to YouTube video playing to hide initial controls flash
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
        })();`;

html = html.replace(oldPreloaderLogic, newPreloaderLogic);

// 2. Refactor YouTube Logic to trigger preloader hide
const oldYouTubeLogic = `                    'onReady': function(event) {
                        event.target.playVideo();
                        event.target.mute();
                    },
                    'onStateChange': function(event) {
                        if (event.data === YT.PlayerState.ENDED) {
                            player.seekTo(0);
                            player.playVideo();
                        }
                    }`;

const newYouTubeLogic = `                    'onReady': function(event) {
                        event.target.playVideo();
                        event.target.mute();
                    },
                    'onStateChange': function(event) {
                        // Hide preloader ONLY when video actually starts playing (to cover the YouTube controls flash)
                        if (event.data === YT.PlayerState.PLAYING) {
                            if (typeof window.hidePreloader === 'function') window.hidePreloader();
                        }
                        if (event.data === YT.PlayerState.ENDED) {
                            player.seekTo(0);
                            player.playVideo();
                        }
                    }`;

html = html.replace(oldYouTubeLogic, newYouTubeLogic);

fs.writeFileSync('index.html', html);
console.log('Preloader tied to YouTube playing state successfully.');
