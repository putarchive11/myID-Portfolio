// Teks berpasangan Indonesia/Inggris. Website kini hanya menampilkan bahasa Inggris;
// versi Indonesia tetap disimpan di kode sebagai cadangan.

export type Lang = 'id' | 'en'

export const DEFAULT_LANG: Lang = 'en'

/** Teks dalam dua bahasa. */
export type Bilingual = { id: string; en: string }

/** Tidak dipakai lagi (tanpa tombol bahasa); dipertahankan agar impor lama tetap valid. */
export const setLang = (lang: Lang) => {
  void lang
}

/** Atribut untuk elemen Astro (alt, aria-label, placeholder): memakai versi Inggris. */
export const i18nAttrs = (attrs: Record<string, Bilingual>) => {
  const out: Record<string, string> = {}

  for (const [attr, text] of Object.entries(attrs)) out[attr] = text.en

  return out
}

/** Menyamakan teks: string biasa dianggap sama di kedua bahasa. */
export const toBilingual = (text: string | Bilingual): Bilingual =>
  typeof text === 'string' ? { id: text, en: text } : text
