import { Badge } from '@/components/ui/badge'

import { Tx, textOf, type Text } from '@/components/i18n/t'

import { useLang } from '@/hooks/use-lang'

import { cn } from '@/lib/utils'

type ExperienceTimelineItemProps = {
  initials: string
  company: Text
  role: Text
  period?: Text
  status?: { text: Text; tone: 'positive' | 'accent' }
  stack: Text[]
  achievement: Text
  description: Text
}

const ExperienceTimelineItem = ({
  initials,
  company,
  role,
  period,
  status,
  stack,
  achievement,
  description
}: ExperienceTimelineItemProps) => {
  const { t } = useLang()

  return (
    <div className='space-y-4'>
      <div className='mb-6 flex items-center gap-3'>
        <div
          className='bg-accent/10 text-accent flex size-13.5 shrink-0 items-center justify-center rounded-md text-base font-semibold sm:size-14'
          aria-hidden='true'
        >
          {initials}
        </div>
        <div>
          <p className='text-muted-foreground'>
            <Tx text={company} />
          </p>
          <h3 className='text-lg font-medium sm:text-[26px] sm:leading-8'>
            <Tx text={role} />
          </h3>
        </div>
      </div>

      <div className='mb-1.5 space-y-3 text-sm sm:text-base'>
        {(period || status) && (
          <p className='flex items-center gap-2'>
            <img
              src='/images/experience/calendar.webp'
              alt={t({ id: 'Kalender', en: 'Calendar' })}
              className='size-6'
            />
            <span className='text-base'>
              {period && <Tx text={period} />}
              {status && (
                <span
                  className={cn(
                    period && 'ml-1',
                    'font-medium',
                    status.tone === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-accent'
                  )}
                >
                  <Tx text={status.text} />
                </span>
              )}
            </span>
          </p>
        )}

        <div className='flex flex-wrap items-center gap-2'>
          <img src='/images/experience/medal.webp' alt={t({ id: 'Medali', en: 'Medal' })} className='size-6' />
          {stack.map(tech => (
            <Badge
              key={textOf(tech, 'id')}
              variant='secondary'
              className='text-foreground h-5.5 rounded-full bg-(--background-darker)'
            >
              <Tx text={tech} />
            </Badge>
          ))}
        </div>

        <p className='flex items-start gap-2 font-medium'>
          <img
            src='/images/experience/speaker.webp'
            alt={t({ id: 'Pengeras suara', en: 'Megaphone' })}
            className='size-6'
          />
          <span className='text-base font-medium'>
            <Tx text={achievement} />
          </span>
        </p>
      </div>

      <p className='text-muted-foreground ml-8 max-w-145'>
        <Tx text={description} />
      </p>
    </div>
  )
}

export default ExperienceTimelineItem
