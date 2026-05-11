export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  
  // App Store URLs
  const iosUrl = 'https://apps.apple.com/us/app/greenleafaudit/id6757359795';
  const androidUrl = 'https://play.google.com/store/apps/details?id=com.greenleafassurance.greenleaf_audit';
  
  // Device detection
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !/Android/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  
  if (isIOS) {
    return res.redirect(302, iosUrl);
  } else if (isAndroid) {
    return res.redirect(302, androidUrl);
  } else {
    // Desktop or unknown — show both options
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GreenleafAudit - Download</title>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='8' fill='%23010400'/><text x='50' y='72' text-anchor='middle' font-family='Tahoma, Arial, sans-serif' font-size='52' font-weight='700'><tspan fill='%23ffffff'>G</tspan><tspan fill='%2362BBC1'>L</tspan></text></svg>">
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect width='180' height='180' rx='40' fill='%23010400'/><text x='90' y='130' text-anchor='middle' font-family='Tahoma, Arial, sans-serif' font-size='94' font-weight='700'><tspan fill='%23ffffff'>G</tspan><tspan fill='%2362BBC1'>L</tspan></text></svg>">
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
            background: rgba(10, 12, 15, 0.96);
            border-radius: 32px;
            padding: 44px;
            box-shadow: 0 40px 120px rgba(0, 0, 0, 0.55);
            max-width: 640px;
            text-align: center;
            border: 1px solid rgba(98, 187, 193, 0.16);
            backdrop-filter: saturate(180%) blur(16px);
          }
          h1 {
            color: #f8fafc;
            margin-bottom: 10px;
            font-size: 34px;
          }
          p {
            color: #b3c1c7;
            margin-bottom: 30px;
            font-size: 15px;
            line-height: 1.7;
          }
          .buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
            margin-bottom: 30px;
            align-items: center;
          }
          .buttons a {
            display: inline-block;
            padding: 0;
            border-radius: 16px;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.04);
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
            text-decoration: none;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }
          .buttons a:hover {
            transform: translateY(-2px);
            box-shadow: inset 0 0 0 1px rgba(98, 187, 193, 0.22), 0 16px 30px rgba(0, 0, 0, 0.25);
          }
          .buttons img {
            width: 100%;
            height: auto;
            display: block;
          }
          @media (max-width: 560px) {
            .buttons {
              grid-template-columns: 1fr;
            }
            .container {
              padding: 30px 20px;
            }
            h1 {
              font-size: 26px;
            }
          }
          .qr-section {
            margin-top: 44px;
            padding-top: 30px;
            border-top: 1px solid rgba(98, 187, 193, 0.14);
          }
          .qr-section h3 {
            color: #9edfe5;
            margin-bottom: 20px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.16em;
          }
          .qr-code {
            max-width: 280px;
            margin: 0 auto;
            border-radius: 32px;
            padding: 18px;
            background: rgba(255, 255, 255, 0.04);
            box-shadow: inset 0 0 0 1px rgba(98, 187, 193, 0.12), 0 28px 60px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(20px);
          }
          .qr-code canvas,
          .qr-code svg {
            width: 100% !important;
            height: auto !important;
            display: block;
            border-radius: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
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
      </html>
    `);
  }
}
