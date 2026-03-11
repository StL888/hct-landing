// Cloudflare Pages Functions — Geo-Blocking Middleware
// Läuft vor jeder Anfrage auf beiden Landing Pages
// Blockiert: US, GB, CA, RU, CN → HTTP 451

const BLOCKED_COUNTRIES = ['US', 'GB', 'CA', 'RU', 'CN'];

export async function onRequest(context) {
  const country = context.request.cf?.country;
  if (country && BLOCKED_COUNTRIES.includes(country)) {
    return new Response(
      '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Not Available</title>' +
      '<style>body{background:#080b0f;color:#c8d0d8;font-family:system-ui;display:flex;' +
      'justify-content:center;align-items:center;min-height:100vh;margin:0;text-align:center}' +
      '.box{max-width:480px;padding:48px}h1{color:#ffd700;font-size:18px;margin-bottom:16px}' +
      'p{font-size:14px;line-height:1.7;opacity:0.7}</style></head>' +
      '<body><div class="box"><h1>Holistic Coin Trainer</h1>' +
      '<p>This service is not available in your region due to regulatory requirements.</p>' +
      '</div></body></html>',
      {
        status: 451,
        headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      }
    );
  }
  return await context.next();
}
