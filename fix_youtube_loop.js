const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the extra </div> that broke the layout
const extraDiv = `        </div>
        </div>

        <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left z-10 py-12 hero-content-box">`;

const fixedDiv = `        </div>

        <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left z-10 py-12 hero-content-box">`;

html = html.replace(extraDiv, fixedDiv);


// 2. Replace iframe with YouTube Iframe API div for seamless looping
const oldIframe = `<iframe 
                class="w-[300%] h-[300%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full opacity-65 filter brightness-105 contrast-105 pointer-events-none"
                src="https://www.youtube.com/embed/G0WSU5x1-EE?autoplay=1&mute=1&loop=1&playlist=G0WSU5x1-EE&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1" 
                title="Background Video" 
                frameborder="0" 
                allow="autoplay; encrypted-media" 
                allowfullscreen>
            </iframe>`;

const newDiv = `<div id="youtube-player" class="w-[300%] h-[300%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full opacity-65 filter brightness-105 contrast-105 pointer-events-none"></div>`;

html = html.replace(oldIframe, newDiv);

// 3. Add script at the bottom just before </body>
const ytScript = `
    <!-- YouTube API for seamless looping -->
    <script src="https://www.youtube.com/iframe_api"></script>
    <script>
        var player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('youtube-player', {
                videoId: 'G0WSU5x1-EE',
                playerVars: {
                    'autoplay': 1,
                    'controls': 0,
                    'showinfo': 0,
                    'rel': 0,
                    'loop': 1,
                    'modestbranding': 1,
                    'mute': 1,
                    'playsinline': 1,
                    'iv_load_policy': 3,
                    'disablekb': 1,
                    'fs': 0,
                    'playlist': 'G0WSU5x1-EE'
                },
                events: {
                    'onReady': function(event) {
                        event.target.playVideo();
                        event.target.mute();
                    },
                    'onStateChange': function(event) {
                        if (event.data === YT.PlayerState.ENDED) {
                            player.seekTo(0);
                            player.playVideo();
                        }
                    }
                }
            });
            // Seamless loop: check time and seek to start right before it ends to avoid the loading spinner
            setInterval(function() {
                if(player && player.getCurrentTime) {
                    var duration = player.getDuration();
                    var currentTime = player.getCurrentTime();
                    // If within 0.8 seconds of the end, jump back to start
                    if (duration > 0 && currentTime > duration - 0.8) {
                        player.seekTo(0);
                    }
                }
            }, 250);
        }
    </script>
`;

if (!html.includes('onYouTubeIframeAPIReady')) {
    html = html.replace('</body>', ytScript + '\n</body>');
}

fs.writeFileSync('index.html', html);
console.log('Fixed extra div and added YouTube Iframe API for seamless loop.');
