import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { MinusIcon, PlusIcon } from 'lucide-react'

import Eyebrow from '@/components/shared/eyebrow/eyebrow'
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '@/components/ui/accordion'
import T, { Tx, textOf } from '@/components/i18n/t'

import { useLang } from '@/hooks/use-lang'

const SERVICES = [
  {
    key: 'packaging',
    title: { id: 'Desain Kemasan Produk', en: 'Product Packaging Design' },
    image: '/images/putra/service-packaging.webp',
    highlight: { id: '7 produk baru ber-BPOM sudah didesain', en: '7 new BPOM-registered products designed' },
    tags: [{ id: 'Kemasan', en: 'Packaging' }, { id: 'Label produk', en: 'Product labels' }, 'Branding'],
    description: {
      id: 'Saya mendesain kemasan dan label produk yang tampil premium di rak dan memuat informasi yang dibutuhkan produk, seperti pouch premium Black Garlic.',
      en: 'I design packaging and product labels that look premium on the shelf and carry all the information a product needs, such as the premium Black Garlic pouch.'
    }
  },
  {
    key: 'poster',
    title: { id: 'Poster Acara & Promosi', en: 'Event & Promotional Posters' },
    image: '/images/putra/service-poster.webp',
    highlight: {
      id: 'Paket umrah, seminar, dan kampanye pameran buku',
      en: 'Umrah packages, seminars, and book fair campaigns'
    },
    tags: [{ id: 'Poster acara', en: 'Event posters' }, 'Banner', { id: 'Sertifikat', en: 'Certificates' }],
    description: {
      id: 'Saya membuat poster, banner, flyer, dan sertifikat untuk acara dan promosi, seperti jadwal paket umrah, materi seminar, dan banner booth.',
      en: 'I create posters, banners, flyers, and certificates for events and promotions, such as umrah package schedules, seminar materials, and booth banners.'
    }
  },
  {
    key: 'marketing',
    title: 'Digital Marketing & E-commerce',
    image: '/images/putra/service-marketing.webp',
    highlight: { id: 'Rata-rata omzet 80 juta per bulan', en: 'Average revenue of IDR 80 million per month' },
    tags: ['Marketplace', { id: 'Toko online', en: 'Online stores' }, { id: 'Purnajual', en: 'After-sales' }],
    description: {
      id: 'Saya mengelola dan mengembangkan toko online: listing produk, konten promosi, relasi seller, dan layanan purnajual. Pernah menjual lebih dari 1.000 produk dalam sebulan.',
      en: 'I manage and grow online stores: product listings, promotional content, seller relations, and after-sales service. I have sold more than 1,000 products in a single month.'
    }
  },
  {
    key: 'website',
    title: { id: 'Pembuatan Website & Kanal Pribadi', en: 'Websites & Personal Channels' },
    image: '/images/putra/service-website.webp',
    highlight: {
      id: 'Landing page toko, portofolio, dan aplikasi web',
      en: 'Store landing pages, portfolios, and web apps'
    },
    tags: ['Landing page', { id: 'Website pribadi', en: 'Personal website' }, 'Domain & hosting'],
    description: {
      id: 'Saya membuat landing page toko online, website portofolio, dan kanal pribadi yang cepat, rapi di HP, dan langsung tersambung ke WhatsApp, lengkap sampai domain dan online.',
      en: 'I build online store landing pages, portfolio websites, and personal channels that are fast, look great on mobile, and connect straight to WhatsApp, all the way to a live domain.'
    }
  }
]

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [displayedIndex, setDisplayedIndex] = useState<number | null>(null)
  const { lang } = useLang()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 })

  const offsetX = useTransform(springX, value => `calc(${value}px - 50%)`)
  const offsetY = useTransform(springY, value => `calc(${value}px - 50%)`)

  const rawTilt = useMotionValue(-8)
  const tilt = useSpring(rawTilt, { stiffness: 300, damping: 20 })

  useEffect(() => {
    rawTilt.set(hoveredIndex !== null && hoveredIndex % 2 === 1 ? 8 : -8)
  }, [hoveredIndex, rawTilt])

  const handleServiceMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setDisplayedIndex(index)
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()

    mouseX.set(event.clientX - bounds.left)
    mouseY.set(event.clientY - bounds.top)
  }

  const handleContainerMouseEnter = () => {
    if (!containerRef.current) return

    containerRef.current.style.setProperty('cursor', 'none', 'important')
    containerRef.current
      .querySelectorAll('button')
      .forEach(button => button.style.setProperty('cursor', 'none', 'important'))
  }

  const handleContainerMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.removeProperty('cursor')
      containerRef.current.querySelectorAll('button').forEach(button => button.style.removeProperty('cursor'))
    }

    setHoveredIndex(null)
  }

  return (
    <section id='services' className='border-b py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-10.5'>
        <div className='space-y-2'>
          <Eyebrow>
            <T id='Layanan saya' en='My services' />
          </Eyebrow>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            <T id='Hal-hal yang bisa saya bantu' en='What I can help you with' />
          </h2>
        </div>

        <div
          ref={containerRef}
          className='relative mx-auto'
          onMouseMove={handleMouseMove}
          onMouseEnter={handleContainerMouseEnter}
          onMouseLeave={handleContainerMouseLeave}
        >
          <Accordion className='divide-y'>
            {SERVICES.map((service, index) => (
              <AccordionItem key={service.key} value={index} onMouseEnter={() => handleServiceMouseEnter(index)}>
                <AccordionTrigger className='text-primary items-center border-0 py-4 text-lg hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden sm:text-xl lg:text-[26px]'>
                  <span>
                    {index + 1}. <Tx text={service.title} />
                  </span>
                  <span className='bg-card relative flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full'>
                    <PlusIcon className='text-accent size-4 rotate-0 opacity-100 transition-all duration-300 group-aria-expanded/accordion-trigger:rotate-90 group-aria-expanded/accordion-trigger:opacity-0' />
                    <MinusIcon className='text-accent absolute size-4 -rotate-90 opacity-0 transition-all duration-300 group-aria-expanded/accordion-trigger:rotate-0 group-aria-expanded/accordion-trigger:opacity-100' />
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='mt-2 space-y-4'>
                    <p className='text-sm font-medium tracking-wide uppercase'>
                      <Tx text={service.highlight} />
                    </p>
                    <p className='mb-1 flex flex-wrap items-center gap-3 text-sm font-medium tracking-wide uppercase'>
                      {service.tags.map((tool, toolIndex) => (
                        <span key={textOf(tool, 'id')} className='flex items-center gap-2'>
                          <Tx text={tool} />
                          {toolIndex < service.tags.length - 1 && <span className='text-accent'>✦</span>}
                        </span>
                      ))}
                    </p>
                    <p className='text-muted-foreground text-base'>
                      <Tx text={service.description} />
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <motion.div
            style={{ x: offsetX, y: offsetY, rotate: tilt, opacity: hoveredIndex === null ? 0 : 1 }}
            className='dark:bg-muted-foreground/50 pointer-events-none absolute top-0 left-0 z-10 hidden w-44 rounded-lg bg-white p-1 shadow-xl transition-opacity duration-200 sm:block'
          >
            {displayedIndex !== null && (
              <img
                src={SERVICES[displayedIndex].image}
                alt={textOf(SERVICES[displayedIndex].title, lang)}
                className='h-auto w-full rounded-lg object-cover'
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Services
