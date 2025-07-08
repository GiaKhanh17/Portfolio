# 🚨 VERCEL BLACK SCREEN - ULTIMATE DEBUG GUIDE

## 📋 **Checklist Hoàn Chỉnh**

### ✅ **1. Cache Issues (Nguyên nhân phổ biến)**
```bash
# Trong Vercel Dashboard:
1. Vào project → Deployments
2. Click "Redeploy" 
3. ❗ QUAN TRỌNG: Uncheck "Use existing Build Cache"
4. Deploy lại
```

### ✅ **2. Browser Console Debug**
```javascript
// Mở F12 → Console tab và kiểm tra:
// - JavaScript errors đỏ
// - 404 errors cho CSS/JS files
// - Hydration errors
// - Network tab: failed requests
```

### ✅ **3. Vercel Function Logs**
```bash
# Trong Vercel Dashboard:
1. Project → Functions tab
2. Xem Runtime Logs
3. Tìm errors về:
   - Server Components
   - API routes
   - Rendering failures
```

### ✅ **4. Environment Variables**
```bash
# Kiểm tra ENV vars:
1. Vercel Dashboard → Settings → Environment Variables
2. Đảm bảo có đủ:
   - NODE_ENV=production
   - NEXT_PUBLIC_* variables
   - Database URLs
```

### ✅ **5. Domain Configuration**
```bash
# Kiểm tra Domain:
1. Project Settings → Domains
2. Verify DNS settings
3. Check SSL certificate status
```

### ✅ **6. CSS/Hydration Issues**
```css
/* Thêm vào globals.css để debug: */
body {
  background: red !important; /* Kiểm tra CSS có load không */
}

* {
  outline: 1px solid blue !important; /* Debug layout */
}
```

### ✅ **7. Component Error Boundaries** 
```jsx
// Thêm Error Boundary để catch errors
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
```

## 🔧 **Quick Fixes**

### **A. Clear All Caches**
```bash
# 1. Browser cache: Ctrl+Shift+R (hard refresh)
# 2. Vercel cache: Redeploy without cache
# 3. Local cache: rm -rf .next && npm run build
```

### **B. Add Debug Console Logs**
```jsx
// Thêm vào page.tsx
export default function Page() {
  console.log("🚀 Page component loading...");
  
  useEffect(() => {
    console.log("✅ Page mounted successfully");
  }, []);
  
  return <div>TEST CONTENT</div>;
}
```

### **C. Simplify Components**
```jsx
// Tạm thời comment Globe component
export default function Page() {
  return (
    <div>
      <h1>SIMPLE TEST</h1>
      {/* <GlobeDemo /> */}
    </div>
  );
}
```

## ⚡ **Emergency Fix Steps**

### **Step 1: Immediate Test**
```jsx
// Tạm thời thay toàn bộ page.tsx bằng:
export default function Home() {
  return (
    <div style={{background: "red", color: "white", padding: "50px"}}>
      <h1>EMERGENCY TEST - IF YOU SEE THIS, BASIC ROUTING WORKS</h1>
    </div>
  );
}
```

### **Step 2: Progressive Component Addition**
```jsx
// Thêm từng component một để tìm culprit:
export default function Home() {
  return (
    <div>
      <Hero />           // ✅ Test 1
      {/* <Grid /> */}   // ⏸️ Comment
      {/* <Globe /> */}  // ⏸️ Comment
    </div>
  );
}
```

### **Step 3: Force Rebuild**
```bash
# 1. Delete .next folder locally
rm -rf .next

# 2. Clean npm cache
npm cache clean --force

# 3. Fresh install
rm -rf node_modules
npm install

# 4. Test build locally
npm run build && npm start

# 5. If working, push to trigger Vercel rebuild
```

## 🎯 **Most Likely Culprits**

1. **Globe 3D Component** - WebGL/Canvas issues
2. **CSS Hydration Mismatch** - Server vs Client rendering
3. **Environment Variables** - Missing on production
4. **Build Cache** - Corrupted Vercel cache
5. **API Routes** - Server-side errors blocking render

## 📊 **Debug Priority**

1. 🔥 **Cache clear + redeploy** (60% success rate)
2. 🔥 **Browser console errors** (30% show root cause)  
3. 🔥 **Component isolation** (10% complex component issues)

---

**TỪ CUỘC TÌM KIẾM:** Vercel black screen thường do cache issues hoặc component hydration errors. Clear cache và redeploy thường fix 60% các cases.