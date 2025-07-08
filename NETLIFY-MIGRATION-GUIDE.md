# 🚀 MIGRATION GUIDE: VERCEL → NETLIFY

## 📋 **BƯỚC 1: SETUP LOCAL**

### **1.1 Cập nhật package.json**
```bash
npm install @netlify/plugin-nextjs --save-dev
```

### **1.2 Thay thế next.config.mjs**
```bash
# Backup file cũ
mv next.config.mjs next.config.vercel.mjs

# Copy file mới cho Netlify  
cp next.config.netlify.mjs next.config.mjs
```

### **1.3 Test build locally**
```bash
npm run build
npm start
# Kiểm tra http://localhost:3000 có hoạt động không
```

## 📋 **BƯỚC 2: SETUP NETLIFY**

### **2.1 Tạo Netlify Account**
1. Đi tới: https://netlify.com
2. Sign up with GitHub
3. Authorize Netlify access

### **2.2 Connect Repository**
1. **Dashboard → "Add new site"**
2. **"Import an existing project"**  
3. **Choose GitHub → Select your repo**
4. **Branch:** `main` (hoặc nhánh chính)

### **2.3 Build Settings**
```bash
# Build command
npm run build

# Publish directory  
.next

# Node.js version
18
```

### **2.4 Environment Variables**
**Site settings → Environment variables → Add:**
```bash
NODE_ENV=production
SENTRY_DSN=your_sentry_dsn_here
# Thêm các ENV vars khác từ Vercel
```

## 📋 **BƯỚC 3: FIX COMMON ISSUES**

### **3.1 Globe 3D Component Fix**
```jsx
// components/ui/GribGlobe.tsx - Netlify optimization
"use client";

import dynamic from "next/dynamic";
import React from "react";

const World = dynamic(() => import("./Globe").then((m) => m.World), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="text-purple-500">Loading Globe...</div>
    </div>
  )
});

export function GlobeDemo() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    
    // Check WebGL support for Netlify
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn('WebGL not supported on Netlify');
        setError(true);
      }
    } catch (err) {
      console.warn('WebGL check failed:', err);
      setError(true);
    }
  }, []);

  if (!isMounted) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-pulse">Initializing...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-96 flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">🌐</div>
          <h3 className="text-xl mb-2">Interactive Globe</h3>
          <p className="text-gray-300">Fallback view for Netlify</p>
        </div>
      </div>
    );
  }

  // Globe config và render logic...
  return (
    <div className="relative h-96">
      <World data={sampleArcs} globeConfig={globeConfig} />
    </div>
  );
}
```

### **3.2 Image Optimization**
```jsx
// Netlify image optimization
import Image from 'next/image';

// Thay đổi từ:
<img src="/image.jpg" />

// Thành:
<Image 
  src="/image.jpg" 
  alt="description"
  width={500}
  height={300}
  unoptimized={true} // For Netlify
/>
```

## 📋 **BƯỚC 4: DEPLOY**

### **4.1 Push Changes**
```bash
git add .
git commit -m "Migrate to Netlify: Add netlify.toml and update next.config"
git push origin main
```

### **4.2 Monitor Build**
1. **Netlify Dashboard → Site → Deploys**
2. **Watch build logs in real-time**
3. **Check for errors in build process**

### **4.3 Test Live Site**
```bash
# Netlify sẽ cho URL dạng:
https://wonderful-site-name.netlify.app

# Test:
1. Homepage loads ✅
2. Globe component works ✅  
3. Navigation works ✅
4. No console errors ✅
```

## 📋 **BƯỚC 5: CUSTOM DOMAIN (Optional)**

### **5.1 Add Custom Domain**
1. **Site settings → Domain management**
2. **Add custom domain**
3. **Update DNS records:**
   ```
   Type: CNAME
   Name: www (or @)
   Value: wonderful-site-name.netlify.app
   ```

### **5.2 Enable HTTPS**
Netlify tự động enable SSL certificate - không cần config gì thêm!

## 🎯 **ADVANTAGES của NETLIFY**

### **✅ Pros:**
- ✅ **Better caching** cho static sites
- ✅ **Automatic SSL** certificates  
- ✅ **Edge redirects** faster than Vercel
- ✅ **Better handling** of 3D/WebGL content
- ✅ **Form handling** built-in
- ✅ **Branch deploys** for testing

### **⚠️ Considerations:**
- ⚠️ **Serverless functions** có limit khác Vercel
- ⚠️ **Build time** có thể lâu hơn một chút
- ⚠️ **Analytics** cần plugin riêng

## 🚨 **TROUBLESHOOTING**

### **Build Fails:**
```bash
# Check Node.js version
Node version: 18.x (recommended)

# Clear cache và rebuild
Site settings → Build & deploy → Clear cache
```

### **Globe Component Issues:**
```bash
# Add to netlify.toml
[build.environment]
  NODE_OPTIONS = "--max-old-space-size=4096"
```

### **404 Errors:**
```bash
# Check netlify.toml redirects
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🎉 **EXPECTED RESULTS**

Sau khi setup:
- ✅ **No more black screen**
- ✅ **Faster load times** 
- ✅ **Better stability**
- ✅ **Automatic deployments**
- ✅ **Free SSL certificate**
- ✅ **Global CDN**

---

**🚀 Netlify thường xử lý Next.js + 3D components tốt hơn Vercel!**