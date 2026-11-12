import { ArrowRightIcon, FileDownIcon, MailIcon, PhoneIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import T, { Tx } from '@/components/i18n/t'
import { cn } from '@/lib/utils'

import { CONTACT, PROFILE } from '@/consts'

const HELP_WITH = [
  { id: 'Website & profil pribadi', en: 'Personal websites & profiles' },
  { id: 'Landing page toko online', en: 'Online store landing pages' },
  { id: 'Board book kenangan anak', en: 'Children’s keepsake board books' },
  { id: 'Desain kemasan & label produk', en: 'Packaging & product label design' },
  { id: 'Poster acara & materi promosi', en: 'Event posters & promotional materials' },
  { id: 'Pengelolaan toko marketplace', en: 'Marketplace store management' }
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
          <p className='text-foreground text-2xl font-medium lg:text-[30px]'>
            <T id='Diskusikan kebutuhan Anda' en='Tell me what you need' />
          </p>
          <p className='text-muted-foreground text-base'>
            <T
              id='Ceritakan kebutuhan Anda, mulai dari landing page toko online, desain kemasan produk, hingga materi promosi acara. Bersama-sama kita rumuskan solusi yang sesuai dengan tujuan dan anggaran Anda.'
              en='Tell me what you need, from an online store landing page to product packaging and event promotion. Together we will shape a solution that fits your goals and budget.'
            />
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
            <li key={item.id} className='text-foreground flex items-center gap-2 text-base font-medium'>
              <span className='bg-foreground size-1.5 shrink-0 rounded-full' />
              <Tx text={item} />
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
                <T id='Hubungi via WhatsApp' en='Message on WhatsApp' />
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
            <T id='Unduh Portofolio (PDF)' en='Download Portfolio (PDF)' />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContactCard
