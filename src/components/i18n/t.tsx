import type { ReactNode } from 'react'

import type { Bilingual } from '@/lib/i18n'

type TProps = {

  /** Teks bahasa Indonesia. */
  id: ReactNode

  /** Teks bahasa Inggris. */
  en: ReactNode
}

/**
 * Teks dua bahasa untuk komponen React. Keduanya dirender, CSS menyembunyikan yang tidak aktif,
 * sehingga tidak ada kedip dan tidak ada hydration mismatch.
 */
const T = ({ id, en }: TProps) => (
  <>
    <span data-l='id'>{id}</span>
    <span data-l='en'>{en}</span>
  </>
)

/** Teks yang bisa satu bahasa (nama, angka) atau dua bahasa. */
export type Text = string | Bilingual

/** Merender `Text`: string apa adanya, objek dua bahasa lewat <T>. */
export const Tx = ({ text }: { text: Text }) => (typeof text === 'string' ? text : <T id={text.id} en={text.en} />)

/** Versi string polos dari `Text` untuk bahasa tertentu (atribut, key, alt). */
export const textOf = (text: Text, lang: 'id' | 'en') => (typeof text === 'string' ? text : text[lang])

export default T
