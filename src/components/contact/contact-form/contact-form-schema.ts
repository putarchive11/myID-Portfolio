import { z } from 'zod'

export const SERVICE_OPTIONS = [
  'Desain Kemasan Produk',
  'Poster Acara & Promosi',
  'Digital Marketing & E-commerce',
  'Pembuatan Website & Kanal Pribadi',
  'Lainnya'
] as const

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter.'),
  email: z.string().email('Masukkan alamat email yang valid.'),
  service: z.string().min(1, 'Pilih salah satu layanan.'),
  message: z.string().min(10, 'Pesan minimal 10 karakter.')
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
