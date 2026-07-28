export default async function handler(req, res) {
    let target = req.query.url;
    if (!target) return res.status(400).send('Search item missing');

    // Smart pipeline: turns keywords into general search requests safely
    if (!target.includes('.')) {
        target = '://duckduckgo.com' + encodeURIComponent(target);
    }
    if (!/^https?:\/\//i.test(target)) {
        target = 'https://' + target;
    }

    try {
        const response = await fetch(target, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        const html = await response.text();
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(html);
    } catch (err) {
        return res.status(500).send(`Error: ${err.message}`);
    }
}
