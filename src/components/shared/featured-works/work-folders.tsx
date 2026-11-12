import { useCallback, useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react'

import Eyebrow from '@/components/shared/eyebrow/eyebrow'
import GlassFolder, { type FolderFile } from '@/components/ui/glass-folder-cards'

import { useTheme } from '@/hooks/use-theme'

import { cn } from '@/lib/utils'
import type { CaseStudyMetadata } from '@/lib/case-studies'

type WorkFoldersProps = {
  caseStudies: CaseStudyMetadata[]
  id?: string
  eyebrow?: string
  title?: string
}

const photosOf = (item: CaseStudyMetadata) => {
  const list = item.galeri && item.galeri.length > 0 ? item.galeri : [item.image, item.heroImage]

  return list.filter((src): src is string => Boolean(src))
}

const MAX_FOLDER_WIDTH = 360

// Lebar map kaca mengikuti lebar kolomnya (komponen butuh angka px, bukan persen).
const useWidth = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current

    if (!el) return

    const measure = () => setWidth(Math.min(MAX_FOLDER_WIDTH, Math.floor(el.clientWidth)))

    measure()

    const observer = new ResizeObserver(measure)

    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return { ref, width }
}

const Folder = ({
  item,
  index,
  tone,
  onOpen
}: {
  item: CaseStudyMetadata
  index: number
  tone: 'light' | 'dark'
  onOpen: (photoIndex: number) => void
}) => {
  const photos = photosOf(item)
  const { ref, width } = useWidth<HTMLDivElement>()

  const files: FolderFile[] = photos.map((src, i) => ({
    name: `Foto ${i + 1}`,
    meta: `${i + 1}/${photos.length}`,
    image: src
  }))

  return (
    <div className='ring-border flex h-full w-full flex-col gap-5 rounded-[24px] bg-(--background-darker) p-5 ring-1 sm:p-6'>
      <div ref={ref} className='flex w-full justify-center'>
        {width > 0 && (
          <GlassFolder
            label={item.organisation ?? item.jenis ?? 'Proyek'}
            meta={`${photos.length} foto`}
            tone={tone}
            image={photos[0]}
            files={files}
            action='none'
            width={width}
            appearDelay={(index % 3) * 140}
            onFileSelect={(_, photoIndex) => onOpen(photoIndex)}
          />
        )}
      </div>

      <button
        type='button'
        onClick={() => onOpen(0)}
        data-cursor='pointer'
        aria-label={`Lihat galeri ${item.title}`}
        className='group/info space-y-1.5 text-left'
      >
        <p className='text-muted-foreground text-sm'>
          {[item.role, item.period ?? item.duration].filter(Boolean).join(' · ')}
        </p>
        <h3 className='text-foreground group-hover/info:text-accent text-lg leading-snug font-medium transition-colors sm:text-xl'>
          {item.title}
        </h3>
        <span className='text-muted-foreground inline-flex items-center gap-1 text-sm'>
          Lihat galeri
          <ArrowUpRightIcon className='size-3.5' />
        </span>
      </button>
    </div>
  )
}

const WorkFolders = ({ caseStudies, id = 'karya-desain', eyebrow = 'Desain dan acara', title }: WorkFoldersProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [photoIndex, setPhotoIndex] = useState(0)
  const { theme } = useTheme()

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

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {caseStudies.map((item, index) => (
            <Folder
              key={item.slug}
              item={item}
              index={index}
              tone={theme}
              onOpen={photo => {
                setPhotoIndex(photo)
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
