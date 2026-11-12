import { useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react'
import { toast } from 'sonner'

import T, { Tx, textOf, type Text } from '@/components/i18n/t'

import { useLang } from '@/hooks/use-lang'

import { CONTACT } from '@/consts'
import { cn } from '@/lib/utils'

// Daftar layanan dan harga. Ubah di sini untuk mengganti harga atau menambah layanan.
export const SERVICES = [
  {
    id: 'website',
    title: { id: 'Pembuatan Website', en: 'Website Development' },
    price: 'Rp1.500.000',
    meta: { id: 'Gratis domain · revisi maks. 1 bulan', en: 'Free domain · revisions for up to 1 month' },
    images: [
      '/images/putra/work-umroh-landing.webp',
      '/images/putra/work-nafis-online.webp',
      '/images/putra/work-hanifah-edu.webp'
    ],
    description: {
      id: 'Landing page toko, profil usaha, atau situs pribadi. Rapi di HP dan tersambung ke WhatsApp.',
      en: 'Store landing page, business profile, or personal site. Looks great on mobile and connects to WhatsApp.'
    }
  },
  {
    id: 'boardbook',
    title: { id: 'Board Book Kenangan Si Kecil', en: 'Little One’s Keepsake Board Book' },
    price: 'Rp185.000',
    meta: {
      id: '13 - 15 halaman · termasuk cetak dan desain ilustrasi',
      en: '13 - 15 pages · printing and illustration design included'
    },
    images: [
      '/images/putra/bb-sampul.webp',
      '/images/putra/boardbook-isi-rules.webp',
      '/images/putra/boardbook-isi-doa.webp'
    ],
    description: {
      id: 'Buku halaman tebal berisi foto dan momen tumbuh kembang buah hati. Selesai maks. 5 hari kerja, belum termasuk ongkir.',
      en: 'A sturdy board book filled with photos and milestones of your little one. Ready within 5 working days, shipping not included.'
    }
  },
  {
    id: 'poster',
    title: { id: 'Desain Poster', en: 'Poster Design' },
    price: 'Rp50.000',
    unit: { id: '/poster', en: '/poster' },
    meta: { id: 'Untuk promo, acara, atau kajian', en: 'For promotions, events, or study circles' },
    images: ['/images/putra/service-poster.webp', '/images/putra/work-tifa.webp', '/images/putra/work-ibf.webp'],
    description: {
      id: 'Poster siap unggah ke media sosial atau siap cetak.',
      en: 'Posters ready to post on social media or to print.'
    }
  },
  {
    id: 'konten',
    title: { id: 'Desain Konten Media Sosial', en: 'Social Media Content Design' },
    price: 'Rp35.000',
    unit: { id: '/desain', en: '/design' },
    meta: { id: 'Feed atau story', en: 'Feed or story' },
    images: ['/images/putra/service-marketing.webp'],
    description: {
      id: 'Konten produk dan promo untuk Instagram, TikTok, atau katalog WhatsApp.',
      en: 'Product and promo content for Instagram, TikTok, or a WhatsApp catalog.'
    }
  },
  {
    id: 'kemasan',
    title: { id: 'Desain Kemasan & Label Produk', en: 'Packaging & Product Label Design' },
    price: 'Rp250.000',
    unit: { id: '/desain', en: '/design' },
    meta: { id: 'Mulai dari', en: 'Starting from' },
    images: ['/images/putra/service-packaging.webp', '/images/putra/work-packaging.webp'],
    description: {
      id: 'Label dan kemasan yang memuat informasi produk dengan lengkap dan tampil rapi di rak.',
      en: 'Labels and packaging that carry complete product information and look neat on the shelf.'
    }
  },
  {
    id: 'marketplace',
    title: { id: 'Pembuatan Toko Marketplace', en: 'Marketplace Store Setup' },
    price: 'Rp500.000',
    meta: {
      id: 'Gratis masuk grup reseller herbal dan buku · langsung ada 50 produk',
      en: 'Free access to the herbal & book reseller group · 50 products ready from day one'
    },
    description: {
      id: 'Saya bukakan toko Anda di Shopee atau Tokopedia, lengkap dengan 50 produk herbal dan buku islami yang sudah terpasang dan siap dijual.',
      en: 'I open your store on Shopee or Tokopedia, complete with 50 herbal products and Islamic books already listed and ready to sell.'
    }
  },
  {
    id: 'lainnya',
    title: { id: 'Konsultasi atau kebutuhan lain', en: 'Consultation or something else' },
    price: { id: 'Gratis', en: 'Free' },
    meta: { id: 'Ceritakan dulu kebutuhan Anda', en: 'Tell me what you need first' },
    description: {
      id: 'Belum yakin butuh apa? Kirim ceritanya, saya bantu carikan pilihan yang pas.',
      en: 'Not sure what you need yet? Tell me about it and I will help you find the right option.'
    }
  }
] as const

type Service = (typeof SERVICES)[number]

const STEPS = [
  { id: 'Pilih layanan', en: 'Choose a service' },
  { id: 'Ceritakan kebutuhan', en: 'Describe your needs' },
  { id: 'Cek dan kirim', en: 'Review and send' }
]

const StepPanel = ({ children, stepKey }: { children: React.ReactNode; stepKey: number }) => (
  <motion.div
    key={stepKey}
    initial={{ opacity: 0, x: 24 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -24 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className='space-y-3'
  >
    {children}
  </motion.div>
)

const ServiceWizard = ({ className }: { className?: string }) => {
  const [step, setStep] = useState(0)
  const [service, setService] = useState<Service | null>(null)
  const [name, setName] = useState('')
  const [detail, setDetail] = useState('')
  const [deadline, setDeadline] = useState('')
  const [errors, setErrors] = useState<{ name?: Text; detail?: Text }>({})
  const { lang, t } = useLang()
  const [preview, setPreview] = useState<{ images: readonly string[]; index: number; title: string } | null>(null)

  const goNext = () => {
    if (step === 0 && !service) {
      toast.error(t({ id: 'Pilih salah satu layanan dulu.', en: 'Please choose a service first.' }))

      return
    }

    if (step === 1) {
      const next: typeof errors = {}

      if (name.trim().length < 2) next.name = { id: 'Tulis nama Anda.', en: 'Please enter your name.' }
      if (detail.trim().length < 10)
        next.detail = {
          id: 'Ceritakan kebutuhan Anda minimal 10 karakter.',
          en: 'Please describe your needs in at least 10 characters.'
        }
      setErrors(next)
      if (Object.keys(next).length) return
    }

    setStep(s => Math.min(s + 1, STEPS.length - 1))
  }

  const send = () => {
    if (!service) return

    const price = textOf(service.price, lang)
    const harga = 'unit' in service ? `${price}${textOf(service.unit, lang)}` : price
    const title = textOf(service.title, lang)

    const text = (
      lang === 'en'
        ? [
            `Assalamu'alaikum, my name is ${name.trim()}.`,
            `I'm interested in: ${title} (${harga}).`,
            '',
            detail.trim(),
            deadline.trim() ? `\nTarget date: ${deadline.trim()}` : ''
          ]
        : [
            `Assalamu'alaikum, saya ${name.trim()}.`,
            `Saya tertarik dengan layanan: ${title} (${harga}).`,
            '',
            detail.trim(),
            deadline.trim() ? `\nTarget selesai: ${deadline.trim()}` : ''
          ]
    )
      .join('\n')
      .trim()

    window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    toast.success(t({ id: 'Membuka WhatsApp, tinggal tekan kirim.', en: 'Opening WhatsApp, just tap send.' }))
  }

  const reset = () => {
    setStep(0)
    setService(null)
    setName('')
    setDetail('')
    setDeadline('')
    setErrors({})
  }

  return (
    <div
      className={cn(
        'bg-card overflow-hidden rounded-[28px] shadow-xl ring-1 ring-black/5 dark:ring-white/10',
        className
      )}
    >
      <div className='from-accent relative bg-linear-to-br to-[#e11d1d] px-6 pt-6 pb-12 text-white sm:px-8'>
        <div className='absolute top-7 right-6 flex items-center gap-1.5 sm:right-8'>
          {STEPS.map((label, i) => (
            <span
              key={label.id}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === step ? 'w-7 bg-white' : 'w-1.5 bg-white/50'
              )}
            />
          ))}
        </div>
        <p className='text-2xl font-semibold sm:text-[28px]'>
          <Tx text={STEPS[step]} />
        </p>
        <p className='text-sm text-white/85 sm:text-base'>
          <T id={`Langkah ${step + 1} dari ${STEPS.length}`} en={`Step ${step + 1} of ${STEPS.length}`} />
        </p>
      </div>

      <div className='bg-card relative -mt-6 rounded-t-[28px] px-5 pt-7 pb-6 sm:px-8'>
        <AnimatePresence mode='wait' initial={false}>
          {step === 0 && (
            <StepPanel stepKey={0}>
              <div role='radiogroup' aria-label={t(STEPS[0])} className='max-h-[420px] space-y-3 overflow-y-auto pr-1'>
                {SERVICES.map(item => {
                  const selected = service?.id === item.id

                  return (
                    <div
                      key={item.id}
                      role='radio'
                      tabIndex={0}
                      aria-checked={selected}
                      onClick={() => setService(item)}
                      onKeyDown={event => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setService(item)
                        }
                      }}
                      className={cn(
                        'focus-visible:ring-accent w-full cursor-pointer rounded-2xl border p-4 text-left transition-colors outline-none focus-visible:ring-2',
                        selected ? 'border-accent bg-accent/5' : 'hover:border-foreground/25'
                      )}
                    >
                      <div className='flex items-start gap-3'>
                        <span
                          className={cn(
                            'mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                            selected ? 'border-accent bg-accent' : 'border-foreground/30'
                          )}
                        >
                          {selected && <CheckIcon className='size-2.5 text-white' strokeWidth={4} />}
                        </span>
                        <div className='min-w-0 flex-1 space-y-1'>
                          <div className='flex flex-wrap items-baseline justify-between gap-x-3'>
                            <p className='text-foreground font-medium'>
                              <Tx text={item.title} />
                            </p>
                            <p className='text-foreground font-semibold whitespace-nowrap'>
                              <Tx text={item.price} />
                              {'unit' in item && (
                                <span className='text-muted-foreground text-sm font-normal'>
                                  <Tx text={item.unit} />
                                </span>
                              )}
                            </p>
                          </div>
                          <p className='text-accent text-sm'>
                            <Tx text={item.meta} />
                          </p>
                          <p className='text-muted-foreground text-sm'>
                            <Tx text={item.description} />
                          </p>
                          {'images' in item && (
                            <div className='flex gap-2 pt-2'>
                              {item.images.map((src, i) => (
                                <button
                                  key={src}
                                  type='button'
                                  onClick={event => {
                                    event.stopPropagation()
                                    setPreview({ images: item.images, index: i, title: textOf(item.title, lang) })
                                  }}
                                  aria-label={t({
                                    id: `Lihat foto ${i + 1} ${item.title.id}`,
                                    en: `View photo ${i + 1} of ${item.title.en}`
                                  })}
                                  className='size-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-black/10 transition-transform hover:scale-105 sm:size-20'
                                >
                                  <img src={src} alt='' loading='lazy' className='size-full object-cover' />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </StepPanel>
          )}

          {step === 1 && (
            <StepPanel stepKey={1}>
              <p className='text-muted-foreground text-sm'>
                <T id='Layanan:' en='Service:' />{' '}
                <span className='text-foreground font-medium'>{service && <Tx text={service.title} />}</span>
              </p>
              <label className='block space-y-1'>
                <span className='text-muted-foreground text-sm'>
                  <T id='Nama*' en='Name*' />
                </span>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t({ id: 'Nama Anda', en: 'Your name' })}
                  className='border-border focus:border-accent h-11 w-full rounded-xl border bg-(--background-darker) px-3 outline-none'
                />
                {errors.name && (
                  <span className='text-sm text-red-600'>
                    <Tx text={errors.name} />
                  </span>
                )}
              </label>
              <label className='block space-y-1'>
                <span className='text-muted-foreground text-sm'>
                  <T id='Ceritakan kebutuhan Anda*' en='Describe what you need*' />
                </span>
                <textarea
                  value={detail}
                  onChange={e => setDetail(e.target.value)}
                  rows={5}
                  placeholder={t({
                    id: 'Contoh: landing page untuk toko madu, ada katalog 20 produk dan tombol pesan lewat WhatsApp.',
                    en: 'Example: a landing page for a honey shop with a 20-product catalog and a WhatsApp order button.'
                  })}
                  className='border-border focus:border-accent w-full rounded-xl border bg-(--background-darker) px-3 py-2.5 outline-none'
                />
                {errors.detail && (
                  <span className='text-sm text-red-600'>
                    <Tx text={errors.detail} />
                  </span>
                )}
              </label>
              <label className='block space-y-1'>
                <span className='text-muted-foreground text-sm'>
                  <T id='Target selesai (opsional)' en='Target date (optional)' />
                </span>
                <input
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  placeholder={t({ id: 'Contoh: akhir bulan ini', en: 'Example: end of this month' })}
                  className='border-border focus:border-accent h-11 w-full rounded-xl border bg-(--background-darker) px-3 outline-none'
                />
              </label>
            </StepPanel>
          )}

          {step === 2 && service && (
            <StepPanel stepKey={2}>
              <div className='space-y-3 rounded-2xl border p-4'>
                <div className='flex items-baseline justify-between gap-3'>
                  <p className='font-medium'>
                    <Tx text={service.title} />
                  </p>
                  <p className='font-semibold whitespace-nowrap'>
                    <Tx text={service.price} />
                    {'unit' in service && (
                      <span className='text-muted-foreground text-sm font-normal'>
                        <Tx text={service.unit} />
                      </span>
                    )}
                  </p>
                </div>
                <p className='text-accent text-sm'>
                  <Tx text={service.meta} />
                </p>
                <div className='border-t pt-3 text-sm'>
                  <p className='text-muted-foreground'>
                    <T id='Nama' en='Name' />
                  </p>
                  <p className='font-medium'>{name}</p>
                </div>
                <div className='text-sm'>
                  <p className='text-muted-foreground'>
                    <T id='Kebutuhan' en='Needs' />
                  </p>
                  <p className='whitespace-pre-line'>{detail}</p>
                </div>
                {deadline && (
                  <div className='text-sm'>
                    <p className='text-muted-foreground'>
                      <T id='Target selesai' en='Target date' />
                    </p>
                    <p>{deadline}</p>
                  </div>
                )}
              </div>
              <p className='text-muted-foreground text-sm'>
                <T
                  id='Pesan ini akan terbuka di WhatsApp. Harga akhir disepakati bersama setelah kebutuhan jelas.'
                  en='This message will open in WhatsApp. The final price is agreed together once the requirements are clear.'
                />
              </p>
              <button
                type='button'
                onClick={send}
                className='bg-accent text-accent-foreground h-12 w-full rounded-xl font-medium transition-opacity hover:opacity-90'
              >
                <T id='Kirim via WhatsApp' en='Send via WhatsApp' />
              </button>
              <button
                type='button'
                onClick={reset}
                className='text-muted-foreground w-full text-sm underline-offset-4 hover:underline'
              >
                <T id='Mulai ulang' en='Start over' />
              </button>
            </StepPanel>
          )}
        </AnimatePresence>

        <div className='mt-6 flex items-center justify-center gap-3'>
          {step > 0 && (
            <button
              type='button'
              onClick={() => setStep(s => s - 1)}
              aria-label={t({ id: 'Kembali', en: 'Back' })}
              className='flex size-12 items-center justify-center rounded-full border transition-colors hover:bg-(--background-darker)'
            >
              <ChevronLeftIcon className='size-5' />
            </button>
          )}
          {step < STEPS.length - 1 && (
            <button
              type='button'
              onClick={goNext}
              aria-label={t({ id: 'Lanjut', en: 'Next' })}
              className={cn(
                'flex size-14 items-center justify-center rounded-full transition-colors',
                (step === 0 && service) || step === 1
                  ? 'bg-accent text-accent-foreground hover:opacity-90'
                  : 'bg-foreground/10 text-foreground/40'
              )}
            >
              <ChevronRightIcon className='size-6' />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            role='dialog'
            aria-modal='true'
            aria-label={preview.title}
            className='fixed inset-0 z-80 flex flex-col items-center justify-center gap-4 bg-black/80 p-4 backdrop-blur-sm'
          >
            <button
              type='button'
              onClick={() => setPreview(null)}
              aria-label={t({ id: 'Tutup', en: 'Close' })}
              className='absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25'
            >
              <XIcon className='size-5' />
            </button>
            <img
              src={preview.images[preview.index]}
              alt={preview.title}
              onClick={event => event.stopPropagation()}
              className='max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl'
            />
            <div className='flex items-center gap-3 text-white' onClick={event => event.stopPropagation()}>
              {preview.images.length > 1 && (
                <button
                  type='button'
                  aria-label={t({ id: 'Foto sebelumnya', en: 'Previous photo' })}
                  onClick={() =>
                    setPreview(p => p && { ...p, index: (p.index - 1 + p.images.length) % p.images.length })
                  }
                  className='flex size-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25'
                >
                  <ChevronLeftIcon className='size-5' />
                </button>
              )}
              <span className='text-sm'>
                {preview.title} · {preview.index + 1}/{preview.images.length}
              </span>
              {preview.images.length > 1 && (
                <button
                  type='button'
                  aria-label={t({ id: 'Foto berikutnya', en: 'Next photo' })}
                  onClick={() => setPreview(p => p && { ...p, index: (p.index + 1) % p.images.length })}
                  className='flex size-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25'
                >
                  <ChevronRightIcon className='size-5' />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ServiceWizard
