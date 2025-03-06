import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Mail className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Contact Us</h1>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground">Contact form coming soon...</p>
        </div>
      </div>
    </div>
  );
}
