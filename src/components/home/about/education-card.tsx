import { GraduationCapIcon, LanguagesIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

const EDUCATION = [
  {
    icon: GraduationCapIcon,
    school: 'Islamic Religious Institute',
    period: '2019 - 2023',
    title: 'Bachelor of Islamic Education',
    detail: 'GPA 3.45'
  },
  {
    icon: LanguagesIcon,
    school: "Ma'had Utsman bin Affan (UBA)",
    period: '2018',
    title: 'Arab Proficiency Course',
    detail: 'Language, culture and way of thinking'
  }
]

const EducationCard = () => {
  return (
    <Card className='ring-border gap-4 rounded-[24px] bg-(--background-darker) shadow-none'>
      <CardContent className='space-y-1'>
        <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>Education</p>
      </CardContent>
      <CardContent className='space-y-4'>
        {EDUCATION.map(item => (
          <div key={item.title} className='flex items-start gap-3'>
            <span className='bg-accent/10 text-accent flex size-10 shrink-0 items-center justify-center rounded-xl'>
              <item.icon className='size-5' />
            </span>
            <div className='min-w-0'>
              <p className='text-foreground leading-tight font-medium'>{item.title}</p>
              <p className='text-muted-foreground text-sm'>
                {item.school} · {item.period}
              </p>
              <p className='text-muted-foreground text-sm'>{item.detail}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default EducationCard
