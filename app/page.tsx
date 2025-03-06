import { ArrowRight, Clock, Calculator, Globe, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: Clock,
      title: "Time Calculations",
      description: "Add, subtract, and calculate time differences with ease",
    },
    {
      icon: Calculator,
      title: "Time Converter",
      description: "Convert between different time formats and units",
    },
    {
      icon: Globe,
      title: "Time Zone Tools",
      description: "Convert times across different time zones globally",
    },
    {
      icon: Calendar,
      title: "Date Calculator",
      description: "Calculate durations between dates and add/subtract time periods",
    },
  ];

  return (
    <div className="space-y-12 py-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Your Ultimate Time Calculator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Powerful time calculation tools for professionals and everyday users.
          Simple, accurate, and efficient.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button asChild size="lg">
            <Link href="/calculator">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/tools">
              View All Tools
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-4">
                <Icon className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="mt-2 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
