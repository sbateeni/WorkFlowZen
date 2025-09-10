# 🚀 Vercel Deployment Guide for WorkFlowZen

This guide will help you deploy WorkFlowZen to Vercel successfully.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Vercel CLI** (optional): `npm install -g vercel`

## 🔧 Setup Steps

### 1. Environment Variables

Create a `.env.local` file (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Fill in your environment variables:
- `NEXT_PUBLIC_APP_NAME=WorkFlowZen`
- `NEXT_PUBLIC_APP_VERSION=1.0.0`

### 2. Vercel Dashboard Deployment

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 3. Environment Variables in Vercel

Add environment variables in Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add each variable from your `.env.local`
3. Set appropriate environments (Production, Preview, Development)

### 4. Domain Configuration

1. Go to Project Settings → Domains
2. Add your custom domain (optional)
3. Configure DNS settings as instructed

## 🛠️ CLI Deployment

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login to Vercel

```bash
vercel login
```

### Deploy

```bash
# Preview deployment
npm run deploy:preview
# or
vercel

# Production deployment
npm run deploy
# or
vercel --prod
```

### Using Deployment Scripts

**Windows:**
```bash
deploy.bat
# or for preview
deploy.bat preview
```

**Linux/macOS:**
```bash
chmod +x deploy.sh
./deploy.sh
# or for preview
./deploy.sh preview
```

## ⚙️ Vercel Configuration

The project includes a `vercel.json` file with optimized settings:

- **Functions**: 30-second timeout for API routes
- **Regions**: Frankfurt (fra1) and Washington DC (iad1)
- **Security Headers**: XSS protection, content type options
- **Caching**: Static assets cached for 1 year
- **Rewrites**: API route handling

## 🔍 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   npm run build
   ```
   Fix any TypeScript or build errors locally first.

2. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_` for client-side
   - Check Vercel dashboard environment variables
   - Redeploy after adding new variables

3. **404 Errors**
   - Check `next.config.js` redirects
   - Verify file names and routes
   - Check dynamic routes syntax

4. **Performance Issues**
   - Enable Vercel Analytics
   - Check bundle size with `npm run build`
   - Optimize images and assets

### Debug Commands

```bash
# Check build output
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Local production build
npm run build && npm start
```

## 📊 Post-Deployment

### 1. Verify Deployment

- Test all routes: `/dashboard`, `/consultation`, `/data-entry`
- Check language switching (Arabic/English)
- Test responsive design on mobile
- Verify form submissions work

### 2. Performance Monitoring

- Enable Vercel Analytics
- Set up error tracking (Sentry, LogRocket)
- Monitor Core Web Vitals

### 3. Security

- Review security headers in Network tab
- Test XSS protection
- Verify HTTPS redirect

## 🎯 Optimization Tips

1. **Images**: Use Next.js Image component
2. **Fonts**: Optimize font loading
3. **Bundle**: Analyze with `@next/bundle-analyzer`
4. **Database**: Use connection pooling
5. **API**: Implement caching strategies

## 📞 Support

If you encounter issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review build logs in Vercel dashboard
3. Test deployment locally first
4. Check GitHub issues for similar problems

---

**Happy Deploying!** 🎉

Your WorkFlowZen application will be live at: `https://your-project-name.vercel.app`