import { useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { toast } from 'sonner'

import { CONTACT } from '@/consts'
import { cn } from '@/lib/utils'

// Daftar layanan dan harga. Ubah di sini untuk mengganti harga atau menambah layanan.
export const SERVICES = [
  {
    id: 'website',
    title: 'Pembuatan Website',
    price: 'Rp1.500.000',
    meta: 'Gratis domain · revisi maks. 1 bulan',
    description: 'Landing page toko, profil usaha, atau situs pribadi. Rapi di HP dan tersambung ke WhatsApp.'
  },
  {
    id: 'poster',
    title: 'Desain Poster',
    price: 'Rp50.000',
    unit: '/poster',
    meta: 'Untuk promo, acara, atau kajian',
    description: 'Poster siap unggah ke media sosial atau siap cetak.'
  },
  {
    id: 'konten',
    title: 'Desain Konten Media Sosial',
    price: 'Rp35.000',
    unit: '/desain',
    meta: 'Feed atau story',
    description: 'Konten produk dan promo untuk Instagram, TikTok, atau katalog WhatsApp.'
  },
  {
    id: 'kemasan',
    title: 'Desain Kemasan & Label Produk',
    price: 'Rp250.000',
    unit: '/desain',
    meta: 'Mulai dari',
    description: 'Label dan kemasan yang memuat informasi produk dengan lengkap dan tampil rapi di rak.'
  },
  {
    id: 'marketplace',
    title: 'Setup Toko Marketplace',
    price: 'Rp300.000',
    meta: 'Mulai dari',
    description: 'Membuka toko, menyusun listing produk, foto katalog, dan deskripsi di Shopee atau Tokopedia.'
  },
  {
    id: 'lainnya',
    title: 'Konsultasi atau kebutuhan lain',
    price: 'Gratis',
    meta: 'Ceritakan dulu kebutuhan Anda',
    description: 'Belum yakin butuh apa? Kirim ceritanya, saya bantu carikan pilihan yang pas.'
  }
] as const

type Service = (typeof SERVICES)[number]

const STEPS = ['Pilih layanan', 'Ceritakan kebutuhan', 'Cek dan kirim']

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
  const [errors, setErrors] = useState<{ name?: string; detail?: string }>({})

  const goNext = () => {
    if (step === 0 && !service) {
      toast.error('Pilih salah satu layanan dulu.')

      return
    }

    if (step === 1) {
      const next: typeof errors = {}

      if (name.trim().length < 2) next.name = 'Tulis nama Anda.'
      if (detail.trim().length < 10) next.detail = 'Ceritakan kebutuhan Anda minimal 10 karakter.'
      setErrors(next)
      if (Object.keys(next).length) return
    }

    setStep(s => Math.min(s + 1, STEPS.length - 1))
  }

  const send = () => {
    if (!service) return

    const harga = 'unit' in service ? `${service.price}${service.unit}` : service.price

    const text = [
      `Assalamu'alaikum, saya ${name.trim()}.`,
      `Saya tertarik dengan layanan: ${service.title} (${harga}).`,
      '',
      detail.trim(),
      deadline.trim() ? `\nTarget selesai: ${deadline.trim()}` : ''
    ]
      .join('\n')
      .trim()

    window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    toast.success('Membuka WhatsApp, tinggal tekan kirim.')
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
    <div className={cn('bg-card overflow-hidden rounded-[28px] shadow-xl ring-1 ring-black/5 dark:ring-white/10', className)}>
      <div className='from-accent relative bg-linear-to-br to-[#e11d1d] px-6 pt-6 pb-12 text-white sm:px-8'>
        <div className='absolute top-7 right-6 flex items-center gap-1.5 sm:right-8'>
          {STEPS.map((label, i) => (
            <span
              key={label}
              className={cn('h-1.5 rounded-full transition-all duration-300', i === step ? 'w-7 bg-white' : 'w-1.5 bg-white/50')}
            />
          ))}
        </div>
        <p className='text-2xl font-semibold sm:text-[28px]'>{STEPS[step]}</p>
        <p className='text-sm text-white/85 sm:text-base'>
          Langkah {step + 1} dari {STEPS.length}
        </p>
      </div>

      <div className='bg-card relative -mt-6 rounded-t-[28px] px-5 pt-7 pb-6 sm:px-8'>
        <AnimatePresence mode='wait' initial={false}>
          {step === 0 && (
            <StepPanel stepKey={0}>
              <div className='max-h-[420px] space-y-3 overflow-y-auto pr-1'>
                {SERVICES.map(item => {
                  const selected = service?.id === item.id

                  return (
                    <button
                      key={item.id}
                      type='button'
                      onClick={() => setService(item)}
                      aria-pressed={selected}
                      className={cn(
                        'w-full rounded-2xl border p-4 text-left transition-colors',
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
                            <p className='text-foreground font-medium'>{item.title}</p>
                            <p className='text-foreground font-semibold whitespace-nowrap'>
                              {item.price}
                              {'unit' in item && <span className='text-muted-foreground text-sm font-normal'>{item.unit}</span>}
                            </p>
                          </div>
                          <p className='text-accent text-sm'>{item.meta}</p>
                          <p className='text-muted-foreground text-sm'>{item.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </StepPanel>
          )}

          {step === 1 && (
            <StepPanel stepKey={1}>
              <p className='text-muted-foreground text-sm'>
                Layanan: <span className='text-foreground font-medium'>{service?.title}</span>
              </p>
              <label className='block space-y-1'>
                <span className='text-muted-foreground text-sm'>Nama*</span>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='Nama Anda'
                  className='border-border h-11 w-full rounded-xl border bg-(--background-darker) px-3 outline-none focus:border-accent'
                />
                {errors.name && <span className='text-sm text-red-600'>{errors.name}</span>}
              </label>
              <label className='block space-y-1'>
                <span className='text-muted-foreground text-sm'>Ceritakan kebutuhan Anda*</span>
                <textarea
                  value={detail}
                  onChange={e => setDetail(e.target.value)}
                  rows={5}
                  placeholder='Contoh: landing page untuk toko madu, ada katalog 20 produk dan tombol pesan lewat WhatsApp.'
                  className='border-border w-full rounded-xl border bg-(--background-darker) px-3 py-2.5 outline-none focus:border-accent'
                />
                {errors.detail && <span className='text-sm text-red-600'>{errors.detail}</span>}
              </label>
              <label className='block space-y-1'>
                <span className='text-muted-foreground text-sm'>Target selesai (opsional)</span>
                <input
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  placeholder='Contoh: akhir bulan ini'
                  className='border-border h-11 w-full rounded-xl border bg-(--background-darker) px-3 outline-none focus:border-accent'
                />
              </label>
            </StepPanel>
          )}

          {step === 2 && service && (
            <StepPanel stepKey={2}>
              <div className='space-y-3 rounded-2xl border p-4'>
                <div className='flex items-baseline justify-between gap-3'>
                  <p className='font-medium'>{service.title}</p>
                  <p className='font-semibold whitespace-nowrap'>
                    {service.price}
                    {'unit' in service && <span className='text-muted-foreground text-sm font-normal'>{service.unit}</span>}
                  </p>
                </div>
                <p className='text-accent text-sm'>{service.meta}</p>
                <div className='border-t pt-3 text-sm'>
                  <p className='text-muted-foreground'>Nama</p>
                  <p className='font-medium'>{name}</p>
                </div>
                <div className='text-sm'>
                  <p className='text-muted-foreground'>Kebutuhan</p>
                  <p className='whitespace-pre-line'>{detail}</p>
                </div>
                {deadline && (
                  <div className='text-sm'>
                    <p className='text-muted-foreground'>Target selesai</p>
                    <p>{deadline}</p>
                  </div>
                )}
              </div>
              <p className='text-muted-foreground text-sm'>
                Pesan ini akan terbuka di WhatsApp. Harga akhir disepakati bersama setelah kebutuhan jelas.
              </p>
              <button
                type='button'
                onClick={send}
                className='bg-accent text-accent-foreground h-12 w-full rounded-xl font-medium transition-opacity hover:opacity-90'
              >
                Kirim via WhatsApp
              </button>
              <button type='button' onClick={reset} className='text-muted-foreground w-full text-sm underline-offset-4 hover:underline'>
                Mulai ulang
              </button>
            </StepPanel>
          )}
        </AnimatePresence>

        <div className='mt-6 flex items-center justify-center gap-3'>
          {step > 0 && (
            <button
              type='button'
              onClick={() => setStep(s => s - 1)}
              aria-label='Kembali'
              className='flex size-12 items-center justify-center rounded-full border transition-colors hover:bg-(--background-darker)'
            >
              <ChevronLeftIcon className='size-5' />
            </button>
          )}
          {step < STEPS.length - 1 && (
            <button
              type='button'
              onClick={goNext}
              aria-label='Lanjut'
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
    </div>
  )
}

export default ServiceWizard
