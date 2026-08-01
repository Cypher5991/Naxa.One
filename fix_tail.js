const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const marker = `            // Show a success message
            alert('Thanks ' + payload.fullName + '! Your score is shown above. We will send your 12-month roadmap to ' + payload.contactInfo + ' shortly.');
        }
    </script>`;

const startIndex = html.indexOf(marker);
if (startIndex !== -1) {
    const cleanTail = `

    <script>
        // Preloader Logic: Wait until all images, fonts, videos and assets are fully loaded
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
                        setTimeout(() => preloader.remove(), 700);
                    }
                }, 300);
            });
        })();
    </script>
</body>
</html>`;

    // Replace everything after the marker with cleanTail
    html = html.substring(0, startIndex + marker.length) + cleanTail;
    fs.writeFileSync('index.html', html);
    console.log('Fixed the tail of index.html');
} else {
    console.log('Marker not found!');
}
