// Bætir iPhone-heimaskjárstillingum inn í dist/index.html eftir smíði.
const fs = require('fs');
const BASE = '/bjarki-fitness';
const file = 'dist/index.html';
let html = fs.readFileSync(file, 'utf8');
const tags = [
  '<meta name="apple-mobile-web-app-capable" content="yes">',
  '<meta name="mobile-web-app-capable" content="yes">',
  '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
  '<meta name="apple-mobile-web-app-title" content="Bjarki">',
  '<meta name="theme-color" content="#0B0D10">',
  `<link rel="apple-touch-icon" href="${BASE}/apple-touch-icon.png">`,
  `<link rel="manifest" href="${BASE}/manifest.json">`,
  '<style>html,body{background-color:#0B0D10;}</style>',
].join('\n');
html = html.replace(/<meta name="viewport"[^>]*>/, '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">');
html = html.replace('<html lang="en">', '<html lang="is">');
html = html.replace('</head>', tags + '\n</head>');
fs.writeFileSync(file, html);
fs.writeFileSync('dist/404.html', html);
fs.writeFileSync('dist/.nojekyll', '');
console.log('PWA tags added');
