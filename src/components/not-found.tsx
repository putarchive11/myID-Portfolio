import { Button } from '@/components/ui/button'

import Icon404 from '@/assets/svg/404'
import T from '@/components/i18n/t'

const NotFound = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-9 p-6'>
      <Icon404 className='h-auto w-full sm:h-120 sm:w-146' />
      <div className='flex flex-col items-center gap-4 text-center'>
        <p className='text-muted-foreground text-xl sm:text-2xl'>
          <T id='Halaman yang Anda cari tidak ditemukan' en='The page you are looking for could not be found' />
        </p>
        <Button
          size='lg'
          render={
            <a href='/'>
              <T id='Kembali ke beranda' en='Back to home' />
            </a>
          }
          nativeButton={false}
        />
      </div>
    </div>
  )
}

export default NotFound
