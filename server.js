const express = require('express');
const axios = require('axios');
const app = express();

app.get('/video', async (req, res) => {
    if (req.query.url) {
        const url = req.query.url;

        if (url.includes('https://www.xnxx.com')) {
            try {
                const response = await axios.get(`https://line.1010diy.com/web/free-mp3-finder/query?q=${url}&type=xnxx&pageToken=`);
                const data = response.data;

                const playerUrl = data.data.items[0].player;
                const videoUrlMatch = playerUrl.match(/src="(.*?)"/);
                const videoUrl = videoUrlMatch ? videoUrlMatch[1] : null;

                if (videoUrl) {
                    res.json({
                        ok: true,
                        channel: '@CodeingHub',
                        owner: '@MrThePHP',
                        result: { video: videoUrl }
                    });
                } else {
                    res.json({
                        ok: false,
                        channel: '@CodeingHub',
                        owner: '@MrThePHP'
                    });
                }
            } catch (error) {
                res.json({
                    ok: false,
                    channel: '@CodeingHub',
                    owner: '@MrThePHP'
                });
            }
        } else {
            res.json({
                ok: false,
                channel: '@CodeingHub',
                owner: '@MrThePHP'
            });
        }
    } else {
        res.json({
            ok: false,
            channel: '@CodeingHub',
            owner: '@MrThePHP'
        });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
