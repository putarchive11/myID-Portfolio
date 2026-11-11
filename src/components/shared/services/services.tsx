import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { MinusIcon, PlusIcon } from 'lucide-react'

import Eyebrow from '@/components/shared/eyebrow/eyebrow'
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '@/components/ui/accordion'

const SERVICES = [
  {
    title: 'Product Packaging Design',
    image: '/images/putra/service-packaging.webp',
    highlight: '7 new BPOM-approved products designed',
    tags: ['Packaging', 'Product label', 'Branding'],
    description:
      'I design product packaging and labels that look premium on the shelf and carry the information a product needs, such as the Black Garlic premium pouch.'
  },
  {
    title: 'Event & Promotional Posters',
    image: '/images/putra/service-poster.webp',
    highlight: 'Umrah packages, seminars and book fair campaigns',
    tags: ['Event poster', 'Banner', 'Certificate'],
    description:
      'I create posters, banners, flyers and certificates for events and promotions, such as umrah package schedules, seminar materials and booth banners.'
  },
  {
    title: 'Digital Marketing & E-commerce',
    image: '/images/putra/service-marketing.webp',
    highlight: '80 million average sales per month',
    tags: ['Marketplace', 'Online store', 'After-sales'],
    description:
      'I run and grow online stores: product listings, promotional content, seller relationships and after-sales service. Sold more than 1,000 products in one month.'
  },
  {
    title: 'Event Committee & Coordination',
    image: '/images/putra/service-committee.webp',
    highlight: 'Islamic Book Fair 2023 · Tifa Tour seminar',
    tags: ['Planning', 'Weekly meetings', 'Participants'],
    description:
      'I help organise office events and seminars so they run smoothly: preparing the marketing campaign, leading weekly meetings and coordinating participants.'
  },
  {
    title: 'Seminar & Training',
    image: '/images/putra/service-seminar.webp',
    highlight: 'Digital marketing for youth organizations',
    tags: ['Public speaking', 'Digital marketing', 'Workshop'],
    description:
      'I present seminars on digital marketing, like the session for youth organizations at posko KKN Citeureup, Bogor.'
  }
]

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [displayedIndex, setDisplayedIndex] = useState<number | null>(null)

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
          <Eyebrow>What I do</Eyebrow>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>I can help you with these things</h2>
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
              <AccordionItem key={service.title} value={index} onMouseEnter={() => handleServiceMouseEnter(index)}>
                <AccordionTrigger className='text-primary items-center border-0 py-4 text-lg hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden sm:text-xl lg:text-[26px]'>
                  <span>
                    {index + 1}. {service.title}
                  </span>
                  <span className='bg-card relative flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full'>
                    <PlusIcon className='text-accent size-4 rotate-0 opacity-100 transition-all duration-300 group-aria-expanded/accordion-trigger:rotate-90 group-aria-expanded/accordion-trigger:opacity-0' />
                    <MinusIcon className='text-accent absolute size-4 -rotate-90 opacity-0 transition-all duration-300 group-aria-expanded/accordion-trigger:rotate-0 group-aria-expanded/accordion-trigger:opacity-100' />
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='mt-2 space-y-4'>
                    <p className='text-sm font-medium tracking-wide uppercase'>{service.highlight}</p>
                    <p className='mb-1 flex flex-wrap items-center gap-3 text-sm font-medium tracking-wide uppercase'>
                      {service.tags.map((tool, toolIndex) => (
                        <span key={tool} className='flex items-center gap-2'>
                          {tool}
                          {toolIndex < service.tags.length - 1 && <span className='text-accent'>✦</span>}
                        </span>
                      ))}
                    </p>
                    <p className='text-muted-foreground text-base'>{service.description}</p>
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
                alt={SERVICES[displayedIndex].title}
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
