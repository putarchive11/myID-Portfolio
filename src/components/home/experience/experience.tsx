import Timeline from '@/components/ui/timeline'
import ExperienceTimelineItem from '@/components/home/experience/experience-timeline-item'

const EXPERIENCES = [
  {
    index: '01',
    initials: 'EC',
    company: 'E-commerce & Toko Online',
    role: 'E-commerce Leader',
    status: { text: 'Digital Marketing', tone: 'accent' as const },
    stack: ['Marketplace', 'Digital marketing', 'Relasi seller', 'Layanan purnajual'],
    achievement: 'Rata-rata penjualan 80 juta per bulan dan lebih dari 1.000 produk terjual dalam sebulan',
    description:
      'Memimpin penjualan online sebagai e-commerce leader. Membangun dan menjaga hubungan baik dengan seller serta memberi layanan purnajual agar pelanggan kembali berbelanja.'
  },
  {
    index: '02',
    initials: 'AH',
    company: 'Al-Hijaz Herbal · Islamic Book Fair 2023',
    role: 'Panitia Kantor',
    period: '20 - 24 September 2023',
    stack: ['Poster acara', 'Kampanye pemasaran', 'Booth A-11', 'Istora Senayan'],
    achievement: 'Membuat kampanye pemasaran poster acara dan memimpin rapat mingguan',
    description:
      'Bagian dari panitia kantor untuk booth Al-Hijaz Herbal di Islamic Book Fair 2023. Mendesain banner booth, flyer produk, dan poster promosi, serta mengoordinasikan tim lewat rapat mingguan.'
  },
  {
    index: '03',
    initials: 'TT',
    company: 'Tifa Tour · Umrah & Hajj',
    role: 'Panitia Seminar & Desainer Poster',
    period: '7 Agustus 2022',
    stack: ['Poster acara', 'Koordinasi peserta', 'Panitia seminar'],
    achievement: 'Mengoordinasikan peserta seminar "Membentuk Karakter Pengusaha Umrah"',
    description:
      'Panitia pelatihan Tifa Tour "Membentuk Karakter Pengusaha Umrah". Mendesain poster paket umrah dan poster acara, serta mengoordinasikan peserta seminar.'
  },
  {
    index: '04',
    initials: 'KKN',
    company: 'Posko KKN Citeureup, Bogor',
    role: 'Pemateri Seminar',
    stack: ['Public speaking', 'Digital marketing', 'Karang taruna'],
    achievement: 'Membawakan materi digital marketing untuk karang taruna',
    description:
      'Saat KKN di Citeureup, Bogor, menyampaikan seminar tentang cara karang taruna memanfaatkan digital marketing.'
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
