import { toast } from '@/components/ui/use-toast.ts'

export function copyLink(urlClipboard: string) {
  navigator.clipboard.writeText(urlClipboard).then()
  toast({
    title: 'Скопировано в буфер',
    description: 'Ссылка скопирована в буфер обмена.',
    duration: 5000,
  })
}
