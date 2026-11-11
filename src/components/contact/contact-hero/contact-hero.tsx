import Eyebrow from '@/components/shared/eyebrow/eyebrow'
import ProfileShowcase from '@/components/shared/profile-showcase'
import ServiceWizard from '@/components/contact/contact-form/service-wizard'

const ContactHero = () => {
  return (
    <section className='border-b py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-245 space-y-10 px-4 sm:px-6 lg:space-y-16 lg:px-10.5'>
        <div className='max-w-2xl space-y-2'>
          <Eyebrow>Hubungi saya</Eyebrow>
          <h1 className='text-2xl font-semibold sm:text-3xl lg:text-[36px]'>
            <span className='max-md:hidden'>Silakan kirim pesan,</span>{' '}
            <span className='text-nowrap max-md:hidden'>saya akan membalas secepatnya.</span>
            <span className='md:hidden'>
              Silakan kirim pesan, saya akan membalas secepatnya.
            </span>
          </h1>
        </div>

        <div className='grid gap-8 lg:grid-cols-2 lg:items-start'>
          <ServiceWizard className='order-2' />

          <ProfileShowcase
            className='order-1 mx-auto max-h-130 w-full lg:sticky lg:top-24'
            backgroundImageClassName='max-h-93.5'
          />
        </div>
      </div>
    </section>
  )
}

export default ContactHero
