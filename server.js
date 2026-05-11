import { createServer } from 'node:http';
import { promises as fs } from 'node:fs';
import { extname, join } from 'node:path';

const publicDir = new URL('./public/', import.meta.url);
const iosUrl = 'https://apps.apple.com/us/app/greenleafaudit/id6757359795';
const androidUrl = 'https://play.google.com/store/apps/details?id=com.greenleafassurance.greenleaf_audit';

const mimeTypes = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

function isAssetPath(pathname) {
  return Boolean(extname(pathname));
}

function deviceRedirect(userAgent) {
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !/Android/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  if (isIOS) return iosUrl;
  if (isAndroid) return androidUrl;
  return null;
}

async function serveStatic(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';
    const filePath = join(publicDir.pathname, pathname);
    const data = await fs.readFile(filePath);
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}

async function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname === '/favicon.svg' || pathname.startsWith('/app-store-badge') || pathname.startsWith('/google-play-badge')) {
    return serveStatic(req, res);
  }

  if (pathname === '/' || pathname === '/download') {
    const redirectUrl = deviceRedirect(req.headers['user-agent'] || '');
    if (redirectUrl) {
      res.writeHead(302, { Location: redirectUrl });
      return res.end();
    }
  }

  if (isAssetPath(pathname)) {
    return serveStatic(req, res);
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GreenleafAudit - Download</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/favicon.svg">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: radial-gradient(circle at top, rgba(98, 187, 193, 0.12), transparent 28%), #000;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: rgba(10, 12, 15, 0.92);
      border-radius: 42px;
      padding: 46px;
      box-shadow: 0 45px 110px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255, 255, 255, 0.03);
      max-width: 700px;
      text-align: center;
      border: 1px solid rgba(98, 187, 193, 0.14);
      backdrop-filter: blur(24px);
      position: relative;
      overflow: hidden;
    }
    .container::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top left, rgba(98, 187, 193, 0.12), transparent 20%), radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.08), transparent 20%);
      pointer-events: none;
    }
    .top-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 18px;
      border-radius: 999px;
      border: 1px solid rgba(98, 187, 193, 0.18);
      background: rgba(255, 255, 255, 0.03);
      color: #9edfe5;
      font-size: 12px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      margin-bottom: 22px;
      position: relative;
      z-index: 1;
    }
    .top-badge::after {
      content: "Premium";
      opacity: 0.55;
    }
    h1 {
      color: #f8fafc;
      margin-bottom: 8px;
      font-size: 40px;
      letter-spacing: -0.03em;
      position: relative;
      z-index: 1;
    }
    p {
      color: #adb9c2;
      margin-bottom: 36px;
      font-size: 15px;
      line-height: 1.9;
      max-width: 520px;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      z-index: 1;
    }
    .buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 22px;
      margin-bottom: 32px;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    .buttons a {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      border-radius: 24px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.04);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
      text-decoration: none;
      transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
    }
    .buttons a:hover {
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 0.06);
      box-shadow: inset 0 0 0 1px rgba(98, 187, 193, 0.22), 0 20px 40px rgba(0, 0, 0, 0.28);
    }
    .buttons img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }
    @media (max-width: 560px) {
      .buttons {
        grid-template-columns: 1fr;
      }
      .container {
        padding: 32px 20px;
      }
      h1 {
        font-size: 28px;
      }
    }
    .qr-section {
      margin-top: 44px;
      padding-top: 30px;
      border-top: 1px solid rgba(98, 187, 193, 0.12);
      position: relative;
      z-index: 1;
    }
    .qr-section h3 {
      color: #9edfe5;
      margin-bottom: 20px;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.18em;
    }
    .qr-code {
      max-width: 300px;
      margin: 0 auto;
      border-radius: 38px;
      padding: 22px;
      background: rgba(255, 255, 255, 0.03);
      box-shadow: inset 0 0 0 1px rgba(98, 187, 193, 0.12), 0 26px 60px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(26px);
    }
    .qr-note {
      color: #9edfe5;
      font-size: 13px;
      margin-top: 18px;
      letter-spacing: 0.14em;
    }
    .qr-code canvas,
    .qr-code svg {
      width: 100% !important;
      height: auto !important;
      display: block;
      border-radius: 24px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="top-badge">Smart app access</div>
    <h1>Download GreenleafAudit</h1>
    <p>Choose your store or scan the QR code below to open the app page instantly.</p>
    <div class="buttons">
      <a href="${iosUrl}" target="_blank" rel="noopener noreferrer">
        <img src="/app-store-badge.svg" alt="Download on App Store">
      </a>
      <a href="${androidUrl}" target="_blank" rel="noopener noreferrer">
        <img src="/google-play-badge.svg" alt="Get it on Google Play">
      </a>
    </div>
    <div class="qr-section">
      <h3>Or scan this QR code</h3>
      <div class="qr-code" id="qr-code"></div>
      <p class="qr-note">Scan to open GreenleafAudit on your device</p>
    </div>
  </div>
  <script src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script>
  <script>
    const qr = new QRCodeStyling({
      width: 260,
      height: 260,
      data: "https://download-gules.vercel.app",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23010400'/%3E%3Ctext x='50' y='62' text-anchor='middle' font-size='48' font-weight='700' font-family='Tahoma, Arial, sans-serif' fill='%2362BBC1'%3EGL%3C/text%3E%3C/svg%3E",
      dotsOptions: { color: "#62BBC1", type: "rounded" },
      cornersSquareOptions: { type: "extra-rounded", color: "#62BBC1" },
      cornersDotOptions: { type: "dot", color: "#62BBC1" },
      backgroundOptions: { color: "#010400" },
      imageOptions: { crossOrigin: "anonymous", margin: 8, imageSize: 0.25 }
    });
    qr.append(document.getElementById("qr-code"));
  </script>
</body>
</html>`;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

createServer(handleRequest).listen(3000, () => {
  console.log('Local GreenleafAudit dev server running at http://localhost:3000');
});
