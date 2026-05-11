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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .container {
            background: white;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 600px;
            text-align: center;
          }
          h1 {
            color: #333;
            margin-bottom: 15px;
            font-size: 32px;
          }
          p {
            color: #666;
            margin-bottom: 40px;
            font-size: 16px;
            line-height: 1.6;
          }
          .buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
            align-items: center;
          }
          .buttons a {
            display: inline-block;
            padding: 0;
            border-radius: 0;
            background: none;
            text-decoration: none;
            transition: transform 0.3s ease, filter 0.3s ease;
          }
          .buttons a:hover {
            transform: scale(1.05);
            filter: brightness(1.1);
          }
          .buttons img {
            width: 100%;
            max-width: 200px;
            height: auto;
            display: block;
          }
          @media (max-width: 480px) {
            .buttons {
              grid-template-columns: 1fr;
            }
            .container {
              padding: 30px 20px;
            }
            h1 {
              font-size: 24px;
            }
          }
          .qr-section {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid #e5e7eb;
          }
          .qr-section h3 {
            color: #333;
            margin-bottom: 20px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .qr-code {
            max-width: 200px;
            margin: 0 auto;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>📱 Download GreenleafAudit</h1>
          <p>Choose your platform to get started:</p>
          
          <div class="buttons">
            <a href="${iosUrl}" target="_blank" rel="noopener noreferrer">
              <img src="https://developer.apple.com/app-store/marketing/guidelines/v5/images/badge-example-preferred_2x.png" alt="Download on App Store">
            </a>
            <a href="${androidUrl}" target="_blank" rel="noopener noreferrer">
              <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play">
            </a>
          </div>
          
          <div class="qr-section">
            <h3>Or scan this QR code</h3>
            <div class="qr-code">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://download.greenleafassurance.com" alt="QR Code" style="width: 100%; border-radius: 8px;">
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
  }
}
