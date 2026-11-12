import { useSyncExternalStore } from 'react'

import { DEFAULT_LANG, LANG_EVENT, readLang, setLang, type Bilingual, type Lang } from '@/lib/i18n'

const subscribe = (onChange: () => void) => {
  window.addEventListener(LANG_EVENT, onChange)

  // Navigasi Astro (ClientRouter) mengganti atribut <html>; ikuti juga perubahan itu.
  const observer = new MutationObserver(onChange)

  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] })

  return () => {
    window.removeEventListener(LANG_EVENT, onChange)
    observer.disconnect()
  }
}

/**
 * Bahasa aktif untuk komponen React. Saat hidrasi selalu mulai dari bahasa default
 * (sama dengan HTML dari server), lalu menyesuaikan — jadi tidak ada hydration mismatch.
 * Untuk teks yang terlihat, pakai komponen <T>; hook ini untuk atribut dan string hitungan.
 */
export const useLang = () => {
  const lang = useSyncExternalStore<Lang>(subscribe, readLang, () => DEFAULT_LANG)

  const t = (text: Bilingual) => text[lang]

  return { lang, setLang, t }
}
