// Tipe dan teks dua bahasa studi kasus. Tidak memakai astro:content,
// jadi aman diimpor oleh komponen React yang berjalan di browser.

export type CaseStudyMetadata = {
  slug: string
  title?: string
  description?: string
  organisation?: string
  role?: string
  duration?: string
  period?: string
  tools?: string[]
  publishedAt?: string
  image?: string
  heroImage?: string
  logo?: string
  kategori?: 'web' | 'desain'
  jenis?: string
  showcase?: string
  galeri?: string[]
  liveUrl?: string
  github?: string

  /** Terjemahan bahasa Inggris dari src/content/case-studies-en (jika ada). */
  en?: CaseStudyTranslation
}

export type CaseStudyTranslation = {
  title?: string
  description?: string
  organisation?: string
  role?: string
  duration?: string
  period?: string
  jenis?: string
  tools?: string[]
}

type TranslatableKey = 'title' | 'description' | 'organisation' | 'role' | 'duration' | 'period' | 'jenis'

/** Teks studi kasus dalam dua bahasa; versi Inggris jatuh ke versi Indonesia bila belum diterjemahkan. */
export const caseText = (item: CaseStudyMetadata, key: TranslatableKey) => {
  const id = item[key] ?? ''

  return { id, en: item.en?.[key] ?? id }
}

/** Daftar alat/cakupan dalam dua bahasa, dipasangkan per posisi. */
export const caseTools = (item: CaseStudyMetadata) =>
  (item.tools ?? []).map((tool, i) => ({ id: tool, en: item.en?.tools?.[i] ?? tool }))
