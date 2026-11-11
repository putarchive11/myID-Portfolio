import Timeline from '@/components/ui/timeline'
import ExperienceTimelineItem from '@/components/home/experience/experience-timeline-item'

const EXPERIENCES = [
  {
    index: '01',
    initials: 'EC',
    company: 'E-commerce & Online Stores',
    role: 'E-commerce Leader',
    status: { text: 'Digital Marketing', tone: 'accent' as const },
    stack: ['Marketplace', 'Digital marketing', 'Seller relations', 'After-sales'],
    achievement: 'Average sales of 80 million per month, and more than 1,000 products sold in one month',
    description:
      'Led online sales as an e-commerce leader. Built and managed good relationships with sellers and provided after-sales support to keep customers coming back.'
  },
  {
    index: '02',
    initials: 'AH',
    company: 'Al-Hijaz Herbal · Islamic Book Fair 2023',
    role: 'Office Committee',
    period: '20 - 24 September 2023',
    stack: ['Event poster', 'Marketing campaign', 'Booth A-11', 'Istora Senayan'],
    achievement: 'Created the event poster marketing campaign and led weekly meetings',
    description:
      "Part of the office committee for Al-Hijaz Herbal's booth at the Islamic Book Fair 2023. Designed the booth banners, product flyers and promotional posters, and coordinated the team through weekly meetings."
  },
  {
    index: '03',
    initials: 'TT',
    company: 'Tifa Tour · Umrah & Hajj',
    role: 'Seminar Committee & Poster Designer',
    period: '7 August 2022',
    stack: ['Event poster', 'Participant coordination', 'Seminar committee'],
    achievement: 'Coordinated participants of the "Membentuk Karakter Pengusaha Umrah" seminar',
    description:
      'Committee member (panitia) of the Tifa Tour training "Committee Training for Developing Umrah Entrepreneur Character". Designed the umrah package and event posters and coordinated the seminar participants.'
  },
  {
    index: '04',
    initials: 'KKN',
    company: 'Posko KKN Citeureup, Bogor',
    role: 'Seminar Presenter',
    stack: ['Public speaking', 'Digital marketing', 'Youth organizations'],
    achievement: 'Presented digital marketing for youth organizations',
    description:
      'During the community service program (KKN) in Citeureup, Bogor, delivered a seminar on how youth organizations can use digital marketing.'
  }
]

const ExperienceTimeline = () => {
  return (
    <Timeline
      data={EXPERIENCES.map(({ index, ...experience }) => ({
        index,
        content: <ExperienceTimelineItem {...experience} />
      }))}
    />
  )
}

export default ExperienceTimeline
