import { MailIcon, PhoneIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import AvailabilityBadge from '@/components/shared/availability-badge'

import { cn } from '@/lib/utils'

import { CONTACT, PROFILE } from '@/consts'

const SOCIALS = [
  { label: 'WhatsApp', icon: PhoneIcon, href: CONTACT.whatsapp, external: true },
  { label: 'Email', icon: MailIcon, href: `mailto:${CONTACT.email}`, external: false }
]

type ProfileShowcaseProps = {
  className?: string
  backgroundImageClassName?: string
  profileImageClassName?: string
}

const ProfileShowcase = ({ className, backgroundImageClassName }: ProfileShowcaseProps) => {
  return (
    <div className={cn('flex flex-col justify-end overflow-hidden', className)}>
      <div className='relative w-full flex-1 overflow-hidden rounded-3xl'>
        <img
          src={PROFILE.photo}
          alt={PROFILE.name}
          className={cn('size-full object-cover object-top', backgroundImageClassName)}
        />

        <div className='absolute inset-x-0 bottom-0 flex justify-center'>
          <AvailabilityBadge className='h-7.5 gap-1.5 rounded-[12px] rounded-b-none border-0 px-3 py-1 text-sm uppercase' />
        </div>
      </div>

      <div className='flex flex-col items-center justify-between gap-1.5 px-5 py-4'>
        <p className='text-center font-medium'>{PROFILE.name}</p>
        <p className='text-muted-foreground text-center text-sm'>{PROFILE.title}</p>

        <div className='flex items-center gap-1'>
          {SOCIALS.map(({ label, icon: Icon, href, external }) => (
            <Button
              key={label}
              variant='ghost'
              size='icon-sm'
              aria-label={label}
              className='text-muted-foreground/80 hover:text-accent hover:bg-transparent dark:hover:bg-transparent'
              render={
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                />
              }
              nativeButton={false}
            >
              <Icon className='size-4.5' />
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileShowcase
