// Sistem dua bahasa (Indonesia & Inggris) tanpa alamat terpisah.
//
// Cara kerjanya: setiap teks dirender dua kali (versi `id` dan `en`) dengan atribut
// `data-l`, lalu CSS di global.css menyembunyikan versi yang tidak aktif berdasarkan
// atribut `data-lang` pada <html>. Karena kedua versi sudah ada di HTML, pergantian
// bahasa terjadi instan, tidak berkedip saat halaman dimuat, dan aman untuk hidrasi React.
//
// Atribut yang tidak bisa disembunyikan lewat CSS (aria-label, alt, placeholder)
// memakai hook `useLang` (React) atau atribut `data-i18n-*` (Astro, lihat applyLang).

export type Lang = 'id' | 'en'

export const DEFAULT_LANG: Lang = 'id'
export const LANG_STORAGE_KEY = 'lang'
export const LANG_EVENT = 'langchange'

/** Teks dalam dua bahasa. */
export type Bilingual = { id: string; en: string }

export const isLang = (value: unknown): value is Lang => value === 'id' || value === 'en'

export const readLang = (): Lang => {
  if (typeof document === 'undefined') return DEFAULT_LANG

  const current = document.documentElement.dataset.lang

  return isLang(current) ? current : DEFAULT_LANG
}

/** Menukar atribut elemen Astro yang ditandai `data-i18n-<attr>-en` / `-id`. */
const swapAttributes = (lang: Lang) => {
  document.querySelectorAll<HTMLElement>('[data-i18n-attrs]').forEach(el => {
    const attrs = (el.dataset.i18nAttrs ?? '').split(',').filter(Boolean)

    attrs.forEach(attr => {
      const value = el.getAttribute(`data-i18n-${attr}-${lang}`)

      if (value !== null) el.setAttribute(attr, value)
    })
  })
}

export const applyLang = (lang: Lang) => {
  const root = document.documentElement

  root.dataset.lang = lang
  root.lang = lang
  swapAttributes(lang)
}

export const setLang = (lang: Lang) => {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang)
  } catch {
    // Penyimpanan diblokir (mode privat): bahasa tetap berganti untuk halaman ini.
  }

  applyLang(lang)
  window.dispatchEvent(new CustomEvent<Lang>(LANG_EVENT, { detail: lang }))
}

/** Memilih teks sesuai bahasa: `pick({ id: 'Halo', en: 'Hello' }, lang)`. */
export const pick = (text: Bilingual, lang: Lang) => text[lang]

/**
 * Atribut dua bahasa untuk elemen Astro (alt, aria-label, title, placeholder).
 * Contoh: `<img {...i18nAttrs({ alt: { id: 'Foto', en: 'Photo' } })} />`
 */
export const i18nAttrs = (attrs: Record<string, Bilingual>) => {
  const out: Record<string, string> = { 'data-i18n-attrs': Object.keys(attrs).join(',') }

  for (const [attr, text] of Object.entries(attrs)) {
    out[attr] = text[DEFAULT_LANG]
    out[`data-i18n-${attr}-id`] = text.id
    out[`data-i18n-${attr}-en`] = text.en
  }

  return out
}

/** Menyamakan teks: string biasa dianggap sama di kedua bahasa. */
export const toBilingual = (text: string | Bilingual): Bilingual =>
  typeof text === 'string' ? { id: text, en: text } : text
