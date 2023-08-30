import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestCard() {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          ullamcorper leo quis nisl consequat, id aliquet justo sagittis.
          Phasellus vitae semper nisi. Morbi quis nibh sit amet elit ullamcorper
          tincidunt.
        </p>
      </CardContent>
    </Card>
  )
}
