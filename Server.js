const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

app.get('/tts', async (req, res) => {
  const text = req.query.text;
  if (!text) return res.status(400).send('Text is required');

  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=ur&client=tw-ob`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });

  res.set('Content-Type', 'audio/mpeg');
  response.body.pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
