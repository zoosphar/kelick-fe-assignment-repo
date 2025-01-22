import { Progress } from "@/components/ui/progress"

export function UploadProgress({ progress }: { progress: number }) {
  return (
    <div className="border-2 border-dashed border-muted rounded-lg p-8 space-y-4">
      <Progress value={progress} />
      <p className="text-center text-sm text-muted-foreground">
        Please wait while we upload your file...
      </p>
    </div>
  )
}

