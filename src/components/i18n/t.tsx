import type { ReactNode } from 'react'

import type { Bilingual } from '@/lib/i18n'

type TProps = {

  /** Teks bahasa Indonesia (cadangan, tidak ditampilkan). */
  id: ReactNode

  /** Teks bahasa Inggris (yang ditampilkan). */
  en: ReactNode
}

/** Teks halaman. Website kini hanya berbahasa Inggris, jadi yang dirender hanya `en`. */
const T = ({ en }: TProps) => <>{en}</>

/** Teks yang bisa satu bahasa (nama, angka) atau berpasangan. */
export type Text = string | Bilingual

/** Merender `Text`: string apa adanya, objek berpasangan diambil versi Inggrisnya. */
export const Tx = ({ text }: { text: Text }) => <>{typeof text === 'string' ? text : text.en}</>

/** Versi string polos dari `Text` (untuk atribut, key, alt). */
export const textOf = (text: Text, lang: 'id' | 'en' = 'en') => (typeof text === 'string' ? text : text[lang])

export default T
