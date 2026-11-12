import { GraduationCapIcon, LanguagesIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import T, { Tx } from '@/components/i18n/t'

const EDUCATION = [
  {
    icon: GraduationCapIcon,
    school: { id: 'Institut Agama Islam', en: 'Islamic Institute' },
    period: '2019 - 2023',
    title: { id: 'Sarjana Pendidikan Agama Islam', en: 'Bachelor of Islamic Education' },
    detail: { id: 'IPK 3,45', en: 'GPA 3.45' }
  },
  {
    icon: LanguagesIcon,
    school: "Ma'had Utsman bin Affan (UBA)",
    period: '2018',
    title: { id: 'Kursus Bahasa Arab', en: 'Arabic Language Course' },
    detail: { id: 'Bahasa, budaya, dan cara berpikir', en: 'Language, culture, and ways of thinking' }
  }
]

const EducationCard = () => {
  return (
    <Card className='ring-border gap-4 rounded-[24px] bg-(--background-darker) shadow-none'>
      <CardContent className='space-y-1'>
        <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
          <T id='Pendidikan' en='Education' />
        </p>
      </CardContent>
      <CardContent className='space-y-4'>
        {EDUCATION.map(item => (
          <div key={item.title.id} className='flex items-start gap-3'>
            <span className='bg-accent/10 text-accent flex size-10 shrink-0 items-center justify-center rounded-xl'>
              <item.icon className='size-5' />
            </span>
            <div className='min-w-0'>
              <p className='text-foreground leading-tight font-medium'>
                <Tx text={item.title} />
              </p>
              <p className='text-muted-foreground text-sm'>
                <Tx text={item.school} /> · {item.period}
              </p>
              <p className='text-muted-foreground text-sm'>
                <Tx text={item.detail} />
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default EducationCard
