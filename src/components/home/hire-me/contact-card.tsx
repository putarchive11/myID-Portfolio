import { ArrowRightIcon, FileDownIcon, MailIcon, PhoneIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import { CONTACT, PROFILE } from '@/consts'

const HELP_WITH = [
  'Landing page toko online',
  'Aplikasi web sederhana',
  'Kemasan & label produk',
  'Poster acara & promo',
  'Toko online & marketplace',
  'Panitia acara'
]

const ContactCard = ({ className }: { className?: string }) => {
  const contacts = [
    { label: 'WhatsApp', value: CONTACT.phoneDisplay, href: CONTACT.whatsapp, icon: PhoneIcon, external: true },
    { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: MailIcon, external: false }
  ]

  return (
    <Card className={cn('bg-background rounded-2xl border py-6', className)}>
      <CardContent className='space-y-6 px-6'>
        <div className='space-y-2.5'>
          <p className='text-foreground text-2xl font-medium lg:text-[30px]'>Mari bekerja sama</p>
          <p className='text-muted-foreground text-base'>
            Butuh landing page untuk toko Anda, desain kemasan produk, poster acara, atau bantuan mengelola toko
            online? Kirim pesan ke saya.
          </p>
        </div>

        <Separator />

        <div className='grid gap-3 sm:grid-cols-2'>
          {contacts.map(contact => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.external ? '_blank' : undefined}
              rel={contact.external ? 'noopener noreferrer' : undefined}
              className='hover:border-accent/40 flex items-center gap-3 rounded-xl border bg-(--background-darker) p-3 no-underline transition-colors'
            >
              <span className='bg-accent text-accent-foreground flex size-10 shrink-0 items-center justify-center rounded-full'>
                <contact.icon className='size-4.5' />
              </span>
              <span className='min-w-0'>
                <span className='text-muted-foreground block text-xs tracking-wide uppercase'>{contact.label}</span>
                <span className='text-foreground block truncate font-medium'>{contact.value}</span>
              </span>
            </a>
          ))}
        </div>

        <ul className='grid gap-x-4 gap-y-2 sm:grid-cols-2'>
          {HELP_WITH.map(item => (
            <li key={item} className='text-foreground flex items-center gap-2 text-base font-medium'>
              <span className='bg-foreground size-1.5 shrink-0 rounded-full' />
              {item}
            </li>
          ))}
        </ul>

        <div className='flex flex-wrap gap-2.5'>
          <Button
            variant='outline'
            className='hover:bg-card bg-card dark:bg-card hover:text-accent group/button h-11 gap-2.5 rounded-full pr-4 pl-4 text-base shadow-sm transition-[padding] duration-300 hover:pl-2'
            render={
              <a href={CONTACT.whatsapp} target='_blank' rel='noopener noreferrer'>
                <span className='bg-accent relative flex size-2.5 items-center justify-center overflow-hidden rounded-full transition-all duration-300 group-hover/button:size-6.5'>
                  <ArrowRightIcon className='text-accent-foreground absolute size-4.5 -translate-x-3 opacity-0 transition-all duration-300 group-hover/button:translate-x-0 group-hover/button:opacity-100' />
                </span>
                Chat via WhatsApp
              </a>
            }
            nativeButton={false}
          />
          <Button
            variant='outline'
            className='hover:bg-background dark:bg-background hover:text-accent h-11 gap-2 rounded-full px-4 text-base'
            render={<a href={PROFILE.portfolioPdf} target='_blank' rel='noopener noreferrer' />}
            nativeButton={false}
          >
            <FileDownIcon className='size-4' />
            Portofolio PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContactCard
