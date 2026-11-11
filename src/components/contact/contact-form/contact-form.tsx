import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { CONTACT } from '@/consts'

import type { ContactFormValues } from '@/components/contact/contact-form/contact-form-schema'
import { contactFormSchema, SERVICE_OPTIONS } from '@/components/contact/contact-form/contact-form-schema'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select'

import { cn } from '@/lib/utils'

const SERVICE_ITEMS = SERVICE_OPTIONS.map(option => ({ label: option, value: option }))

type ContactFormProps = {
  className?: string
}

const ContactForm = ({ className }: ContactFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      service: '',
      message: ''
    }
  })

  // Tidak ada backend: pesan dibuka di WhatsApp, siap dikirim ke Putra.
  const onSubmit = (values: ContactFormValues) => {
    const text = [
      `Assalamu'alaikum, nama saya ${values.name} (${values.email}).`,
      `Layanan: ${values.service}`,
      '',
      values.message
    ].join('\n')

    window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    toast.success('Membuka WhatsApp, tinggal tekan kirim.')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(className)}>
      <FieldGroup>
        <Field data-invalid={!!errors.name} className='gap-1'>
          <FieldLabel htmlFor='contact-name' className='text-muted-foreground text-base'>
            Nama*
          </FieldLabel>
          <Input
            id='contact-name'
            placeholder='Nama Anda'
            aria-invalid={!!errors.name}
            className='border-border h-11 rounded-[12px] bg-(--background-darker)'
            {...register('name')}
          />
          <FieldError errors={errors.name ? [errors.name] : undefined} />
        </Field>

        <Field data-invalid={!!errors.email} className='gap-1'>
          <FieldLabel htmlFor='contact-email' className='text-muted-foreground text-base'>
            Email*
          </FieldLabel>
          <Input
            id='contact-email'
            type='email'
            placeholder='nama@contoh.com'
            aria-invalid={!!errors.email}
            className='border-border h-11 rounded-[12px] bg-(--background-darker)'
            {...register('email')}
          />
          <FieldError errors={errors.email ? [errors.email] : undefined} />
        </Field>

        <Field data-invalid={!!errors.service} className='gap-1'>
          <FieldLabel htmlFor='contact-service' className='text-muted-foreground text-base'>
            Layanan*
          </FieldLabel>
          <Controller
            control={control}
            name='service'
            render={({ field }) => (
              <Select
                items={SERVICE_ITEMS}
                value={field.value || null}
                onValueChange={value => field.onChange(value ?? '')}
              >
                <SelectTrigger
                  id='contact-service'
                  className='border-border h-11! w-full rounded-[12px] bg-(--background-darker)'
                >
                  <SelectValue placeholder='Pilih layanan' />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    {SERVICE_ITEMS.map(item => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={errors.service ? [errors.service] : undefined} />
        </Field>

        <Field data-invalid={!!errors.message} className='gap-1'>
          <FieldLabel htmlFor='contact-message' className='text-muted-foreground text-base'>
            Pesan
          </FieldLabel>
          <Textarea
            id='contact-message'
            placeholder='Tulis pesan Anda'
            aria-invalid={!!errors.message}
            className='border-border min-h-25 rounded-[12px] bg-(--background-darker)'
            {...register('message')}
          />
          <FieldError errors={errors.message ? [errors.message] : undefined} />
        </Field>

        <Button
          type='submit'
          variant='outline'
          className='hover:bg-card hover:text-accent bg-card h-10 w-full rounded-[12px]'
        >
          Kirim via WhatsApp
        </Button>
      </FieldGroup>
    </form>
  )
}

export default ContactForm
