# 🚀 Hướng Dẫn Deploy Project Lên Netlify

## 📋 Tổng Quan Project
- **Framework**: Next.js 14 với TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber
- **Animation**: Framer Motion
- **Monitoring**: Sentry
- **Output**: Static export (phù hợp cho Netlify)

## 🔧 Chuẩn Bị Trước Khi Deploy

### 1. Kiểm tra Build Local
```bash
# Cài đặt dependencies
npm install

# Test build để đảm bảo không có lỗi
npm run build

# Test chạy production build
npm run start
```

### 2. Tạo file netlify.toml (Optional nhưng khuyến nghị)
```toml
[build]
  publish = "out"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

## 🌐 Phương Pháp 1: Deploy qua Git (Khuyến nghị)

### Bước 1: Push code lên GitHub
```bash
# Nếu chưa có repository trên GitHub
git add .
git commit -m "Ready for Netlify deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Bước 2: Connect với Netlify
1. Đăng nhập vào [Netlify](https://netlify.com)
2. Click **"New site from Git"**
3. Chọn **GitHub** và authorize
4. Chọn repository của bạn
5. Cấu hình build settings:
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `out`

### Bước 3: Environment Variables (Nếu cần)
Nếu project cần environment variables:
1. Vào **Site settings** → **Environment variables**
2. Thêm các biến môi trường cần thiết

## 🌐 Phương Pháp 2: Manual Deploy

### Bước 1: Build project
```bash
npm run build
```

### Bước 2: Deploy folder `out`
1. Vào [Netlify](https://netlify.com)
2. Kéo thả folder `out` vào vùng deploy
3. Hoặc click **"Deploy manually"** và chọn folder `out`

## ⚙️ Tối Ưu Hóa cho Netlify

### 1. Cập nhật next.config.mjs (Đã có sẵn ✅)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // ✅ Đã có - Perfect cho Netlify
    typescript: {
        ignoreBuildErrors: true,
    },
    // Thêm các cấu hình khác nếu cần
    images: {
        unoptimized: true // Thêm nếu sử dụng Image component
    }
};
```

### 2. Kiểm tra và cập nhật package.json (Đã có sẵn ✅)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build", // ✅ Đã có
    "start": "next start",
    "lint": "next lint"
  }
}
```

## 🚨 Troubleshooting

### Lỗi thường gặp và cách khắc phục:

1. **Build failed - TypeScript errors**
   ```bash
   # Kiểm tra lỗi TypeScript
   npm run lint
   # Hoặc tạm thời bỏ qua (đã có trong config)
   ```

2. **404 errors sau deploy**
   - Đảm bảo có file `netlify.toml` với redirects
   - Hoặc tạo file `public/_redirects`:
   ```
   /*    /index.html   200
   ```

3. **Large bundle size**
   ```bash
   # Phân tích bundle size
   npm install --save-dev @next/bundle-analyzer
   ```

4. **Environment variables không hoạt động**
   - Đảm bảo prefix `NEXT_PUBLIC_` cho client-side variables
   - Cấu hình trong Netlify dashboard

## 📊 Theo Dõi Performance

### 1. Sentry Integration (Đã có sẵn ✅)
- Project đã có Sentry config
- Sẽ tự động track errors sau deploy

### 2. Netlify Analytics
- Enable trong Netlify dashboard
- Theo dõi traffic và performance

## ✅ Checklist Trước Deploy

- [ ] `npm run build` chạy thành công
- [ ] Kiểm tra không có TypeScript errors critical
- [ ] Test responsive design
- [ ] Kiểm tra tất cả links hoạt động
- [ ] Environment variables được set up
- [ ] SEO meta tags đã được cấu hình

## 🎯 Next Steps Sau Deploy

1. **Custom Domain** (Optional)
   - Add domain trong Netlify settings
   - Configure DNS records

2. **HTTPS** (Tự động)
   - Netlify tự động enable HTTPS
   - Force HTTPS redirect

3. **Performance Optimization**
   - Enable asset optimization
   - Configure caching headers

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra Netlify deploy logs
2. Kiểm tra browser console errors
3. Verify build works locally first

---

**🎉 Chúc bạn deploy thành công!**

Project của bạn đã được cấu hình tốt và sẵn sàng cho Netlify deployment.