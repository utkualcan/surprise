# 💖 Aşkımızın 10. Ayı - Romantik Web Sitesi

Bu proje, 08.11.2024'te başlayan aşkımızın 10. ay kutlaması için özel olarak tasarlanmış romantik bir web sitesidir.

## 🎯 Özellikler

- **Gün Sayacı**: Birlikte geçen günler ve 10. ay kutlamasına kalan günler
- **Romantik Mesajlar**: Özel yazılar ve duygusal içerikler
- **Fotoğraf Galerisi**: Birlikte çekilen özel fotoğraflar (placeholder)
- **Uzak Mesafe Teması**: Mesafe ilişkisi için özel tasarım
- **Animasyonlar**: Framer Motion ile güzel geçiş efektleri
- **Mobil Uyumlu**: Tüm cihazlarda mükemmel görünüm

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Kurulum
```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

### Yapılandırma
1. `src/app/page.tsx` dosyasında tarihleri güncelleyin:
   - `startDate`: İlişkinizin başlangıç tarihi
   - `targetDate`: 10. ay kutlaması tarihi

2. Fotoğrafları eklemek için:
   - `public/images/photos/` klasörüne fotoğraflarınızı ekleyin
   - `src/app/page.tsx` dosyasındaki `photos` array'ini güncelleyin

## 📁 Proje Yapısı

```
love-website/
├── public/
│   └── images/
│       └── photos/          # Fotoğraflarınızı buraya ekleyin
├── src/
│   ├── app/
│   │   ├── page.tsx         # Ana sayfa
│   │   ├── layout.tsx       # Layout
│   │   └── globals.css      # Global stiller
│   └── components/          # React bileşenleri
├── package.json
└── README.md
```

## 🎨 Özelleştirme

### Renkler ve Tema
- Ana renkler: Pembe, Mor, Mavi
- Gradient arka planlar
- Glassmorphism efektleri

### Animasyonlar
- Framer Motion kullanılıyor
- Sayfa yüklendiğinde sıralı animasyonlar
- Hover efektleri

### Fotoğraf Ekleme
1. Fotoğraflarınızı `public/images/photos/` klasörüne koyun
2. `src/app/page.tsx` dosyasındaki `photos` array'ini güncelleyin:

```javascript
const photos = [
  {
    id: 1,
    src: "/images/photos/your-photo.jpg",
    title: "Fotoğraf Başlığı",
    description: "Açıklama"
  }
];
```

## 🌐 Yayınlama

### Vercel (Önerilen)
1. GitHub'a projenizi yükleyin
2. [Vercel](https://vercel.com)'e gidin
3. GitHub reponuzu bağlayın
4. Otomatik deploy edilecek

### Netlify
1. GitHub'a projenizi yükleyin
2. [Netlify](https://netlify.com)'a gidin
3. "New site from Git" seçin
4. GitHub reponuzu bağlayın

### GitHub Pages
```bash
npm run build
npm run export
```

## 🛠️ Teknolojiler

- **Next.js 15**: React framework
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Styling
- **Framer Motion**: Animasyonlar
- **Lucide React**: İkonlar

## 📱 Mobil Uyumluluk

- Responsive tasarım
- Touch-friendly arayüz
- Mobil optimizasyonu

## 🎵 Müzik Ekleme (Opsiyonel)

Arka plan müziği eklemek için:
1. `public/audio/` klasörü oluşturun
2. Müzik dosyanızı ekleyin
3. `page.tsx` dosyasına audio player ekleyin

## 💝 Özel Mesajlar

Romantik mesajları özelleştirmek için `src/app/page.tsx` dosyasındaki metinleri değiştirin.

## 🔧 Sorun Giderme

### Proje çalışmıyor
```bash
# Node modules'u temizleyin
rm -rf node_modules
npm install

# Cache'i temizleyin
npm run dev -- --clear
```

### Fotoğraflar görünmüyor
- Dosya yollarını kontrol edin
- Dosya formatlarını kontrol edin (jpg, png, webp)
- Dosya boyutlarını optimize edin

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. GitHub Issues açın
2. Detaylı hata mesajını paylaşın
3. Hangi adımda sorun yaşadığınızı belirtin

## 🎉 Özellikler

- ✅ Gün sayacı
- ✅ Romantik mesajlar
- ✅ Fotoğraf galerisi
- ✅ Uzak mesafe teması
- ✅ Animasyonlar
- ✅ Mobil uyumlu
- ✅ Modern tasarım
- ✅ SEO optimizasyonu

---

**Sevgiyle kodlandı ❤️**

*08.11.2024 - Sonsuzluk*
