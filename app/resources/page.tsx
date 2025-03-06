import { BookOpen } from "lucide-react";

export default function Resources() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Resources</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Time Formats Guide</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">World Time Zones</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
