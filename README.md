# QR Cart

QR kod tabanlı, PWA destekli dijital menü ve sipariş sepeti uygulaması. Müşteriler QR kodu okutarak menüye erişir, ürün ekleyip sepetlerini yönetebilir.

## Özellikler

- QR kod ile menüye erişim
- Kategori ve ürün görüntüleme
- Sepet yönetimi (Pinia store)
- Karanlık mod
- Türkçe / İngilizce dil desteği (vue-i18n)
- PWA — yüklenebilir, çevrimdışı çalışabilir
- Mobil uyumlu, Tailwind CSS ile responsive tasarım

## Teknolojiler

- Vue 3 + Vite
- Pinia (state management)
- Vue Router
- vue-i18n
- Tailwind CSS
- qrcode
- PWA (Service Worker)

## Kurulum

```bash
cd client
npm install
```

### Geliştirme

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

## Proje Yapısı

```
client/
├── public/
│   ├── exampleData/     # Örnek kategori ve ürün verileri (JSON)
│   └── img/icons/       # PWA ikonları
├── src/
│   ├── components/      # Header, BasketModal, InstallModal, vb.
│   ├── views/           # HomeView, CategoryView, ProductView, 404
│   ├── stores/          # Pinia (cart store)
│   ├── services/        # QR kod, i18n, uuid
│   ├── locales/         # tr.json, en.json
│   └── router/          # Vue Router tanımları
```
