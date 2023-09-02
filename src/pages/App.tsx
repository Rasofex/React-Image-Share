import _header from '@/components/_header.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { AppService } from '@/pages/app.service.ts'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'

function App() {
  const {
    uploading,
    uploaded,
    handleFileChange,
    handleUpload,
    handleCopyLink,
    resetAll,
  } = AppService()

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
            {uploading ? <UseAnimations animation={loading} /> : 'Upload'}
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
