'use strict';
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1); // Render sits behind a proxy: needed for real client IPs
app.disable('x-powered-by');

app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN'
  });
  next();
});

app.get('/healthz', (req, res) => res.type('text').send('ok'));

app.use('/api', require('./ai/analyze'));

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders(res, file) {
    if (file.endsWith('.ttf')) res.set('Cache-Control', 'public, max-age=2592000, immutable');
    else if (file.endsWith('.html')) res.set('Cache-Control', 'no-cache');
  }
}));

app.use('/api', (req, res) => res.status(404).json({ error: 'not_found' }));
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log('CVify AI listening on port ' + PORT));
