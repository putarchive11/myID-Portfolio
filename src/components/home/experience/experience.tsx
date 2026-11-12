import Timeline from '@/components/ui/timeline'
import ExperienceTimelineItem from '@/components/home/experience/experience-timeline-item'

const EXPERIENCES = [
  {
    index: '01',
    initials: 'EC',
    company: { id: 'E-commerce & Toko Online', en: 'E-commerce & Online Stores' },
    role: 'E-commerce Leader',
    status: { text: 'Digital Marketing', tone: 'accent' as const },
    stack: [
      'Marketplace',
      'Digital marketing',
      { id: 'Relasi seller', en: 'Seller relations' },
      { id: 'Layanan purnajual', en: 'After-sales service' }
    ],
    achievement: {
      id: 'Rata-rata penjualan 80 juta per bulan dan lebih dari 1.000 produk terjual dalam sebulan',
      en: 'Average sales of IDR 80 million per month and more than 1,000 products sold in a month'
    },
    description: {
      id: 'Memimpin penjualan online sebagai e-commerce leader. Membangun dan menjaga hubungan baik dengan seller serta memberi layanan purnajual agar pelanggan kembali berbelanja.',
      en: 'Led online sales as e-commerce leader. Built and maintained good relationships with sellers and provided after-sales service so customers kept coming back.'
    }
  },
  {
    index: '02',
    initials: 'AH',
    company: 'Al-Hijaz Herbal · Islamic Book Fair 2023',
    role: { id: 'Panitia Kantor', en: 'Company Event Committee' },
    period: { id: '20 - 24 September 2023', en: '20 - 24 September 2023' },
    stack: [
      { id: 'Poster acara', en: 'Event posters' },
      { id: 'Kampanye pemasaran', en: 'Marketing campaign' },
      'Booth A-11',
      'Istora Senayan'
    ],
    achievement: {
      id: 'Membuat kampanye pemasaran poster acara dan memimpin rapat mingguan',
      en: 'Created the event poster marketing campaign and led weekly meetings'
    },
    description: {
      id: 'Bagian dari panitia kantor untuk booth Al-Hijaz Herbal di Islamic Book Fair 2023. Mendesain banner booth, flyer produk, dan poster promosi, serta mengoordinasikan tim lewat rapat mingguan.',
      en: 'Part of the company committee for the Al-Hijaz Herbal booth at Islamic Book Fair 2023. Designed the booth banner, product flyers, and promotional posters, and coordinated the team through weekly meetings.'
    }
  },
  {
    index: '03',
    initials: 'TT',
    company: 'Tifa Tour · Umrah & Hajj',
    role: { id: 'Panitia Seminar & Desainer Poster', en: 'Seminar Committee & Poster Designer' },
    period: { id: '7 Agustus 2022', en: '7 August 2022' },
    stack: [
      { id: 'Poster acara', en: 'Event posters' },
      { id: 'Koordinasi peserta', en: 'Participant coordination' },
      { id: 'Panitia seminar', en: 'Seminar committee' }
    ],
    achievement: {
      id: 'Mengoordinasikan peserta seminar "Membentuk Karakter Pengusaha Umrah"',
      en: 'Coordinated participants of the seminar "Building the Character of an Umrah Entrepreneur"'
    },
    description: {
      id: 'Panitia pelatihan Tifa Tour "Membentuk Karakter Pengusaha Umrah". Mendesain poster paket umrah dan poster acara, serta mengoordinasikan peserta seminar.',
      en: 'Committee member for the Tifa Tour training "Building the Character of an Umrah Entrepreneur". Designed umrah package and event posters, and coordinated seminar participants.'
    }
  },
  {
    index: '04',
    initials: 'KKN',
    company: { id: 'Posko KKN Citeureup, Bogor', en: 'Community Service (KKN) Post, Citeureup, Bogor' },
    role: { id: 'Pemateri Seminar', en: 'Seminar Speaker' },
    stack: ['Public speaking', 'Digital marketing', { id: 'Karang taruna', en: 'Youth organization' }],
    achievement: {
      id: 'Membawakan materi digital marketing untuk karang taruna',
      en: 'Delivered a digital marketing talk for the local youth organization'
    },
    description: {
      id: 'Saat KKN di Citeureup, Bogor, menyampaikan seminar tentang cara karang taruna memanfaatkan digital marketing.',
      en: 'During university community service (KKN) in Citeureup, Bogor, gave a seminar on how the local youth organization can use digital marketing.'
    }
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
