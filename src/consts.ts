// Site Configuration
// Centralized configuration for site metadata, SEO, branding and personal profile data.
// Edit the values here to update the name, title and contact details used across the site.

export const PROFILE = {
  name: 'Putra Rayhan Assidiqi',
  fullName: 'Putra Rayhan Assidiqi S.Pd',
  firstName: 'Putra',
  title: 'Web Builder & Designer',
  summary:
    'Membangun landing page toko online dan aplikasi web yang sederhana, cepat, dan siap jualan. Berpengalaman memimpin penjualan e-commerce dengan rata-rata omzet 80 juta per bulan, mengelola acara kantor, serta mendesain kemasan produk dan banner promosi.',
  summaryEn:
    'I build simple, fast, sales-ready online store landing pages and web apps. Experienced in leading e-commerce sales averaging IDR 80 million in monthly revenue, running company events, and designing product packaging and promotional banners.',
  avatar: '/images/putra/avatar.webp',

  // Foto kecil di kartu yang muncul di atas layar saat halaman di-scroll.
  scrollAvatar: '/images/putra/avatar-scroll.webp',
  photo: '/images/putra/graduation.webp',

  // Foto di kartu profil halaman Kontak.
  contactPhoto: '/images/putra/contact-photo.webp',
  portfolioPdf: '/portofolio-putra-rayhan-assidiqi.pdf'
}

export const CONTACT = {
  phoneDisplay: '+62 877 7799 5846',
  whatsapp: 'https://wa.me/6287777995846',
  email: 'putranyarayhan@gmail.com'
}

export const SITE_TITLE = `${PROFILE.name} - Portofolio ${PROFILE.title}`
export const SITE_DESCRIPTION = `Portofolio ${PROFILE.fullName}, web builder dan desainer: landing page toko online, aplikasi web, kemasan produk, poster acara, dan kepanitiaan.`

export const GITHUB_URL = 'https://github.com/putarchive11/myID-Portfolio'
export const SITE_URL = 'https://putranyarayhan.my.id/'

export const SITE_METADATA = {
  title: {
    template: `%s - ${PROFILE.name}`,
    default: SITE_TITLE
  },
  description: SITE_DESCRIPTION,
  keywords: ['Putra Rayhan Assidiqi', 'web builder', 'desainer', 'landing page', 'portofolio', 'desain kemasan'],
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  publisher: PROFILE.name,
  robots: {
    index: true,
    follow: true
  },
  language: 'id-ID',
  locale: 'id_ID',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }]
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: PROFILE.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '',
    creator: '',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/images/og-image.png']
  },
  verification: {
    google: '', // Add your Google verification code
    yandex: '', // Add your Yandex verification code
    bing: '' // Add your Bing verification code
  }
}

// Social / contact links
export const SOCIAL_LINKS = {
  whatsapp: CONTACT.whatsapp,
  email: `mailto:${CONTACT.email}`
}

// Person information for structured data
export const COMPANY_INFO = {
  name: PROFILE.name,
  legalName: PROFILE.fullName,
  url: SITE_URL,
  logo: PROFILE.avatar,
  contactPoint: {
    telephone: CONTACT.phoneDisplay,
    contactType: 'personal',
    email: CONTACT.email
  },
  sameAs: [] as string[]
}
