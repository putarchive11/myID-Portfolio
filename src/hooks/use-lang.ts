import { setLang, type Bilingual, type Lang } from '@/lib/i18n'

/** Website hanya berbahasa Inggris; hook ini tetap ada agar komponen tidak perlu diubah. */
export const useLang = () => {
  const lang: Lang = 'en'

  const t = (text: Bilingual) => text.en

  return { lang, setLang, t }
}
