// Site Configuration
// Centralized configuration for site metadata, SEO, branding and personal profile data.
// Edit the values here to update the name, title and contact details used across the site.

export const PROFILE = {
  name: 'Putra Rayhan Assidiqi',
  fullName: 'Putra Rayhan Assidiqi S.Pd',
  firstName: 'Putra',
  title: 'Creative Designer',
  summary:
    'Experienced as an e-commerce leader with average monthly sales of 80 million, organized and managed various office events, ensuring smooth execution and engagement, designed multiple product and promotional banners.',
  avatar: '/images/putra/avatar.webp',
  photo: '/images/putra/graduation.webp',
  portfolioPdf: '/portofolio-putra-rayhan-assidiqi.pdf'
}

export const CONTACT = {
  phoneDisplay: '+62 877 7799 5846',
  whatsapp: 'https://wa.me/6287777995846',
  email: 'putranyarayhan@gmail.com'
}

export const SITE_TITLE = `${PROFILE.name} - ${PROFILE.title} Portfolio`
export const SITE_DESCRIPTION = `Portfolio of ${PROFILE.fullName}, a creative designer and digital marketer: product packaging, event posters, e-commerce and event committee work.`

export const GITHUB_URL = 'https://github.com/putarchive11/myID-Portfolio'
export const SITE_URL = '/'

export const SITE_METADATA = {
  title: {
    template: `%s - ${PROFILE.name}`,
    default: SITE_TITLE
  },
  description: SITE_DESCRIPTION,
  keywords: ['Putra Rayhan Assidiqi', 'creative designer', 'digital marketing', 'portfolio', 'event poster'],
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  publisher: PROFILE.name,
  robots: {
    index: true,
    follow: true
  },
  language: 'en-US',
  locale: 'en_US',
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
    locale: 'en_US',
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
