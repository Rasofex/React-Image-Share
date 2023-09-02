import { ChangeEvent, useState } from 'react'
import ImageKit from 'imagekit'

import { TranslatedName } from '@/utils/translatedName.ts'
import { useToast } from '@/components/ui/use-toast.ts'

export function AppService() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState<string | undefined>(undefined)
  const [urlClipboard, setUrlClipboard] = useState('')

  const imagekit = new ImageKit({
    publicKey: 'public_jWI6OohNX/01NqDMILkUeBxol18=',
    privateKey: 'private_MY/Nbp+yTw9xPT/LooCQpqggMug=',
    urlEndpoint: 'https://ik.imagekit.io/fatdhkpmc',
  })

  const { toast } = useToast()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files.length > 0) {
      setSelectedFile(files[0])
    }
  }

  const translatedName = (name: string) => {
    return new TranslatedName(name).name
  }

  const handleUpload = async () => {
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large!',
          description: 'File is more than 5MB!',
          duration: 5000,
        })
        return
      }
      setUploading(true)
      setUploaded(undefined)
      imagekit.upload(
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          file: selectedFile,
          fileName: translatedName(selectedFile.name),
          folder: '/',
          useUniqueFileName: true,
          isPrivateFile: false,
        },
        (error, result) => {
          if (error) {
            console.log(error)
          } else if (result) {
            const url: string = result.url
            const imageUrl = (url + '?tr=h-500').toString()
            console.log(url)
            setUploading(false)
            setUploaded(imageUrl)
            toast({
              variant: 'default',
              title: 'Image uploaded',
              description: 'Your image has been uploaded. Click to copy link.',
              duration: 5000,
            })
            setUrlClipboard(imageUrl)
          }
        },
      )
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(urlClipboard).then()
    toast({
      title: 'Copied to clipboard',
      description: 'Link copied to clipboard',
      duration: 5000,
    })
  }

  const resetAll = () => {
    setSelectedFile(null)
    setUploading(false)
    setUploaded(undefined)
    setUrlClipboard('')
  }

  return {
    selectedFile,
    uploading,
    uploaded,
    urlClipboard,
    handleFileChange,
    handleUpload,
    handleCopyLink,
    resetAll,
  }
}
