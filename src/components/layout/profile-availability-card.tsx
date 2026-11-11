import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { PROFILE } from '@/consts'

const ProfileAvailabilityCard = () => {
  return (
    <div className='flex items-center gap-3 py-2 pr-4 pl-2'>
      <Avatar size='lg'>
        <AvatarImage src={PROFILE.avatar} alt={PROFILE.name} />
        <AvatarFallback>P</AvatarFallback>
      </Avatar>

      <div className='text-left'>
        <p className='text-sm font-medium'>{PROFILE.name}</p>
        <p className='text-muted-foreground text-xs'>{PROFILE.title}</p>
      </div>

      <span className='ml-2 flex items-center gap-1.5 text-sm font-medium whitespace-nowrap text-green-600 dark:text-green-400'>
        <span className='relative inline-flex size-1.5'>
          <span className='absolute -inset-0.5 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-green-600/40 opacity-75 dark:bg-green-400/40' />
          <span className='relative inline-flex size-1.5 rounded-full bg-green-600 dark:bg-green-400' />
        </span>
        Tersedia
      </span>
    </div>
  )
}

export default ProfileAvailabilityCard
