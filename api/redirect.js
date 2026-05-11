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
            gap: 15px;
            margin-bottom: 30px;
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
          a {
            display: inline-block;
            padding: 14px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
          }
          .btn-ios {
            background: #007AFF;
            color: white;
          }
          .btn-ios:hover {
            background: #0051D5;
            transform: translateY(-2px);
          }
          .btn-android {
            background: #3DDC84;
            color: #1f2937;
          }
          .btn-android:hover {
            background: #1fa366;
            transform: translateY(-2px);
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
            <a href="${iosUrl}" class="btn-ios">🍎 App Store</a>
            <a href="${androidUrl}" class="btn-android">🤖 Google Play</a>
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
