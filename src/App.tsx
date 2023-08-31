import _header from '@/components/_header.tsx'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ImageKit from 'imagekit'
import { Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { TranslatedNameRU } from '@/utils/translatedNameRU'

function App() {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
  }

  const translatedName = (name: string) => {
    return new TranslatedNameRU(name).name
  }

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true)
      setUploaded(undefined)
      imagekit.upload(
        {
          file: selectedFile,
          fileName: translatedName(selectedFile.name),
          folder: '/',
          useUniqueFileName: true,
          isPrivateFile: false,
        },
        (error, result) => {
          if (error) {
            console.log(error)
          } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const url: string = result.url
            const imageUrl = (url + '?tr=h-500').toString()
            console.log(url)
            setUploading(false)
            setUploaded(imageUrl)
            toast({
              title: 'Image uploaded',
              description: imageUrl,
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

  return (
    <div className="min-h-screen flex flex-col dark:bg-zinc-950">
      <_header />
      <main className="container flex-col flex-1 flex items-center justify-center">
        <Card hidden={!uploaded}>
          <CardContent className="pt-6">
            <img src={uploaded} alt="" />
          </CardContent>
        </Card>
        <div
          className={
            'pt-6 grid w-full max-w-sm items-center gap-1.5' +
            (!uploaded ? '' : ' hidden')
          }
        >
          <Label htmlFor="picture">Picture</Label>
          <Input
            className="dark:text-white cursor-pointer"
            id="picture"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <Button
            className={'mt-1'}
            disabled={uploading}
            onClick={handleUpload}
          >
            {uploading ? <Loader2 /> : 'Upload'}
          </Button>
        </div>
        <div
          className={
            'pt-6 grid w-full max-w-sm items-center gap-1.5' +
            (!uploaded ? ' hidden' : '')
          }
        >
          <Button onClick={handleCopyLink}>Copy Link</Button>
          <Button className={'mt-1'} variant="outline" onClick={resetAll}>
            Upload new image
          </Button>
        </div>
      </main>
    </div>
  )
}

export default App
