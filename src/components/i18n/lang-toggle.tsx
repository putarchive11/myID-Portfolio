import type { ComponentProps } from 'react'

import { useLang } from '@/hooks/use-lang'
import { cn } from '@/lib/utils'

type LangToggleProps = ComponentProps<'button'>

/** Tombol ganti bahasa ID ⇄ EN. */
const LangToggle = ({ className, children, ...props }: LangToggleProps) => {
  const { lang, setLang } = useLang()
  const next = lang === 'id' ? 'en' : 'id'

  return (
    <button
      type='button'
      onClick={() => setLang(next)}
      aria-label={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
      title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
      className={cn('flex items-center', className)}
      {...props}
    >
      <span className='flex size-4 shrink-0 items-center justify-center text-[10px] leading-none font-semibold tracking-tight'>
        <span data-l='id'>EN</span>
        <span data-l='en'>ID</span>
      </span>
      {children}
    </button>
  )
}

export default LangToggle
