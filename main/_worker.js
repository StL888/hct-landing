// Cloudflare Pages Advanced Mode — Geo-Blocking
// Gilt für: hct-edu-main (WarGames-Seite)

const BLOCKED_COUNTRIES = ['US', 'GB', 'CA', 'RU', 'CN'];

export default {
  async fetch(request, env) {
    const country = request.cf?.country;
    if (country && BLOCKED_COUNTRIES.includes(country)) {
      return new Response(
        '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Not Available</title>' +
        '<style>body{background:#0a0a0a;color:#00ff41;font-family:"Courier New",monospace;' +
        'display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;' +
        'text-align:center}' +
        '.box{max-width:480px;padding:48px;border:1px solid #00ff41}' +
        'h1{font-size:14px;margin-bottom:16px;letter-spacing:0.2em}' +
        'p{font-size:13px;line-height:1.7;opacity:0.7}</style></head>' +
        '<body><div class="box"><h1>ACCESS DENIED</h1>' +
        '<p>This service is not available in your region due to regulatory requirements.</p>' +
        '</div></body></html>',
        {
          status: 451,
          headers: { 'Content-Type': 'text/html; charset=UTF-8' },
        }
      );
    }
    return env.ASSETS.fetch(request);
  },
};
