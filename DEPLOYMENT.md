# GreenleafAudit — Smart App Download Link

A lightweight, intelligent redirect page that detects device type and automatically sends users to the right app store.

**How it works:**
- **iOS** → Redirects to Apple App Store
- **Android** → Redirects to Google Play Store
- **Desktop** → Shows both download options + embedded QR code

## 🚀 Quick Start

### Deploy to Vercel (Recommended — 2 minutes)

1. **Ensure your GitHub repo is synced:**
   ```bash
   git add .
   git commit -m "Add smart download redirect page"
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your GitHub repo: `TJayasiri/download`
   - Click "Deploy" (no environment variables needed)
   - Your site will be live at: `download-theta.vercel.app` (or similar)

3. **Custom Domain (Optional):**
   - In Vercel dashboard → Project Settings → Domains
   - Add your custom domain (e.g., `download.greenleafassurance.com`)

### Generate QR Code

Once deployed, create a QR code pointing to your URL:
- Use [QR Server](https://qr-server.com/) or [QR Code Generator](https://www.qr-code-generator.com/)
- Input: `https://your-domain.com`
- Download and use in:
  - Email signatures
  - LinkedIn posts
  - Business cards
  - Marketing materials

## 📊 How Device Detection Works

The `api/redirect.js` file checks the user's device via HTTP headers:

```
User on iPhone → Detect iOS → Redirect to App Store
     ↓
User on Android → Detect Android → Redirect to Play Store
     ↓
User on Desktop → Show landing page with both options
```

## 🔧 Environment

- **Runtime:** Node.js 18.x (Vercel serverless)
- **Framework:** Vanilla JavaScript (no dependencies)
- **Deployment:** Vercel, GitHub-connected

## 📝 Files

- `api/redirect.js` — Main redirect logic (Vercel serverless function)
- `vercel.json` — Vercel configuration
- `package.json` — Project metadata
- `.gitignore` — Git ignore rules

## 🎯 Test URLs

- **Test iOS redirect:** Visit from iPhone/iPad
- **Test Android redirect:** Visit from Android phone
- **Test fallback page:** Visit from computer (shows both buttons + QR)

## 📱 App Links (Embedded)

- **iOS:** https://apps.apple.com/us/app/greenleafaudit/id6757359795
- **Android:** https://play.google.com/store/apps/details?id=com.greenleafassurance.greenleaf_audit

---

**Built for GreenleafAudit** — Professional app distribution. 🎯
