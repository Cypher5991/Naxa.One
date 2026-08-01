const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const marker = "        function handleAuditLeadSubmit(e) {";

const startIndex = html.indexOf(marker);
if (startIndex !== -1) {
    const head = html.substring(0, startIndex);
    
    const cleanTail = `        function handleAuditLeadSubmit(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const payload = Object.fromEntries(formData.entries());
            console.log('Lead captured:', payload);
            // TODO: Replace with your webhook URL (e.g. Make.com / Supabase)
            // fetch('YOUR_WEBHOOK_URL_HERE', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
            document.getElementById('lead-modal').classList.add('hidden');
            // Show a success message
            alert('Thanks ' + payload.fullName + '! Your score is shown above. We will send your 12-month roadmap to ' + payload.contactInfo + ' shortly.');
        }
    </script>

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

    fs.writeFileSync('index.html', head + cleanTail);
    console.log('Fixed the tail of index.html');
} else {
    console.log('Marker not found!');
}
