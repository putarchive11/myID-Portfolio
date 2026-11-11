import { useCallback, useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react'

import Eyebrow from '@/components/shared/eyebrow/eyebrow'

import { cn } from '@/lib/utils'
import type { CaseStudyMetadata } from '@/lib/case-studies'

type WorkFoldersProps = {
  caseStudies: CaseStudyMetadata[]
  id?: string
  eyebrow?: string
  title?: string
}

// Posisi foto yang mengintip dari map: tertutup, saat disorot
const PEEK = [
  { rest: '-translate-x-[22%] translate-y-[10%] -rotate-[10deg]', hover: 'group-hover/folder:-translate-x-[34%] group-hover/folder:-translate-y-[2%] group-hover/folder:-rotate-[15deg]' },
  { rest: 'translate-y-[2%]', hover: 'group-hover/folder:-translate-y-[14%]' },
  { rest: 'translate-x-[22%] translate-y-[10%] rotate-[9deg]', hover: 'group-hover/folder:translate-x-[34%] group-hover/folder:-translate-y-[2%] group-hover/folder:rotate-[14deg]' }
]

const photosOf = (item: CaseStudyMetadata) => {
  const list = item.galeri && item.galeri.length > 0 ? item.galeri : [item.image, item.heroImage]

  return list.filter((src): src is string => Boolean(src))
}

const Folder = ({ item, onOpen }: { item: CaseStudyMetadata; onOpen: () => void }) => {
  const photos = photosOf(item)

  return (
    <button
      type='button'
      onClick={onOpen}
      data-cursor='pointer'
      aria-label={`Buka folder ${item.title}`}
      className='group/folder ring-border flex h-full w-full flex-col justify-start gap-5 rounded-[24px] bg-(--background-darker) p-5 text-left ring-1 transition-shadow hover:shadow-lg sm:p-6'
    >
      <div className='relative aspect-[5/4] w-full'>
        {/* Bagian belakang map dengan tab */}
        <div className='absolute inset-x-[7%] top-[16%] bottom-[5%] rounded-2xl bg-[#c79f67] shadow-sm dark:bg-[#8a6a3f]'>
          <div className='absolute -top-[9%] left-[8%] h-[12%] w-[34%] rounded-t-xl bg-[#c79f67] dark:bg-[#8a6a3f]' />
        </div>

        {photos.slice(0, 3).map((src, i) => (
          <div
            key={src}
            style={{ zIndex: i + 1 }}
            className={cn(
              'absolute top-[8%] left-1/2 -ml-[29%] aspect-[4/3] w-[58%] overflow-hidden rounded-lg border-[3px] border-white bg-white shadow-lg transition-transform duration-500 ease-out',
              PEEK[i].rest,
              PEEK[i].hover
            )}
          >
            <img src={src} alt='' loading='lazy' className='size-full object-cover' />
          </div>
        ))}

        {/* Bagian depan map */}
        <div className='absolute inset-x-[4%] bottom-[3%] z-10 h-[50%] origin-bottom transform-[perspective(1200px)_rotateX(-12deg)] rounded-2xl bg-linear-to-b from-[#e7c998] to-[#d8b47c] shadow-[0_-6px_18px_-8px_rgb(0_0_0/0.35)] transition-transform duration-500 group-hover/folder:transform-[perspective(1200px)_rotateX(-30deg)] dark:from-[#b38b55] dark:to-[#9c7746]'>
          <div className='absolute inset-x-[10%] top-[14%] h-px bg-white/45' />
          <span className='absolute bottom-[14%] left-[9%] rounded-md bg-white/85 px-2 py-0.5 text-[11px] font-medium text-[#7a5a2c] sm:text-xs'>
            {photos.length} foto
          </span>
        </div>
      </div>

      <div className='space-y-1.5'>
        <p className='text-muted-foreground text-sm'>{item.organisation ?? item.role}</p>
        <h3 className='text-foreground text-lg leading-snug font-medium sm:text-xl'>{item.title}</h3>
      </div>
    </button>
  )
}

const WorkFolders = ({ caseStudies, id = 'karya-desain', eyebrow = 'Desain dan acara', title }: WorkFoldersProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [photoIndex, setPhotoIndex] = useState(0)

  const open = openIndex === null ? null : caseStudies[openIndex]
  const photos = open ? photosOf(open) : []

  const close = useCallback(() => setOpenIndex(null), [])
  const step = useCallback(
    (dir: number) => setPhotoIndex(i => (photos.length ? (i + dir + photos.length) % photos.length : 0)),
    [photos.length]
  )

  useEffect(() => {
    if (open === null) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }

    const previous = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, step])

  return (
    <section id={id} className='border-b py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-12 lg:px-10.5'>
        <div className='space-y-2'>
          <Eyebrow>{eyebrow}</Eyebrow>
          {title && <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>{title}</h2>}
        </div>

        <div className='grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4'>
          {caseStudies.map((item, index) => (
            <Folder
              key={item.slug}
              item={item}
              onOpen={() => {
                setPhotoIndex(0)
                setOpenIndex(index)
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key='overlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-80 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6'
            onClick={close}
            role='dialog'
            aria-modal='true'
            aria-label={open.title}
          >
            <motion.div
              initial={{ y: 40, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.97, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              onClick={event => event.stopPropagation()}
              className='bg-card relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[28px] shadow-2xl sm:rounded-[28px]'
            >
              <button
                type='button'
                onClick={close}
                aria-label='Tutup'
                className='absolute top-3 right-3 z-20 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70'
              >
                <XIcon className='size-5' />
              </button>

              <div className='overflow-y-auto'>
                <div className='relative flex aspect-[4/3] items-center justify-center bg-[#101413] sm:aspect-video'>
                  <AnimatePresence mode='wait' initial={false}>
                    <motion.img
                      key={photos[photoIndex]}
                      src={photos[photoIndex]}
                      alt={`${open.title} — foto ${photoIndex + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className='max-h-full max-w-full object-contain'
                    />
                  </AnimatePresence>

                  {photos.length > 1 && (
                    <>
                      <button
                        type='button'
                        onClick={() => step(-1)}
                        aria-label='Foto sebelumnya'
                        className='absolute left-3 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70'
                      >
                        <ChevronLeftIcon className='size-5' />
                      </button>
                      <button
                        type='button'
                        onClick={() => step(1)}
                        aria-label='Foto berikutnya'
                        className='absolute right-3 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70'
                      >
                        <ChevronRightIcon className='size-5' />
                      </button>
                      <span className='absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs text-white tabular-nums'>
                        {photoIndex + 1} / {photos.length}
                      </span>
                    </>
                  )}
                </div>

                {photos.length > 1 && (
                  <div className='flex gap-2 overflow-x-auto px-5 pt-4 sm:px-7'>
                    {photos.map((src, i) => (
                      <button
                        key={src}
                        type='button'
                        onClick={() => setPhotoIndex(i)}
                        aria-label={`Foto ${i + 1}`}
                        className={cn(
                          'h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition-opacity',
                          i === photoIndex ? 'ring-accent opacity-100' : 'opacity-60 ring-transparent hover:opacity-100'
                        )}
                      >
                        <img src={src} alt='' className='size-full object-cover' />
                      </button>
                    ))}
                  </div>
                )}

                <div className='space-y-4 px-5 py-6 sm:px-7'>
                  <div className='text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-sm'>
                    {open.organisation && <span className='text-foreground font-medium'>{open.organisation}</span>}
                    {open.role && <span>· {open.role}</span>}
                    {(open.period ?? open.duration) && <span>· {open.period ?? open.duration}</span>}
                  </div>
                  <h3 className='text-2xl leading-tight font-semibold sm:text-3xl'>{open.title}</h3>
                  <p className='text-muted-foreground text-base'>{open.description}</p>

                  {open.tools && open.tools.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                      {open.tools.map(tool => (
                        <span key={tool} className='rounded-full bg-(--background-darker) px-3 py-1 text-sm'>
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  <a
                    href={`/case-study/${open.slug}`}
                    className='bg-accent text-accent-foreground inline-flex h-11 items-center gap-2 rounded-full px-5 font-medium no-underline transition-opacity hover:opacity-90'
                  >
                    Baca cerita lengkapnya
                    <ArrowUpRightIcon className='size-4' />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default WorkFolders
