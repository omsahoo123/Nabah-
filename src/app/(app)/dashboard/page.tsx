import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Stethoscope,
  Calendar,
  Video,
  HeartPulse,
  Pill,
  ArrowRight,
} from 'lucide-react';

const features = [
  {
    title: 'AI Symptom Checker',
    description: 'Get preliminary diagnostic suggestions based on your symptoms.',
    href: '/symptom-checker',
    icon: Stethoscope,
    cta: 'Check Symptoms',
  },
  {
    title: 'Schedule Appointment',
    description: 'Book and manage your appointments with healthcare providers.',
    href: '/appointments',
    icon: Calendar,
    cta: 'Book Now',
  },
  {
    title: 'Video Consultation',
    description: 'Connect with doctors via video call in your preferred language.',
    href: '/consultations',
    icon: Video,
    cta: 'Start a Call',
  },
  {
    title: 'Health Records',
    description: 'Access your medical history and records, even when offline.',
    href: '/records',
    icon: HeartPulse,
    cta: 'View Records',
  },
  {
    title: 'Pharmacy Checker',
    description: 'Find nearby pharmacies and check medicine availability.',
    href: '/pharmacy',
    icon: Pill,
    cta: 'Find Medicine',
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
          Welcome to Nabha Telehealth
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your partner in accessible healthcare. Here's what you can do.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="flex flex-col rounded-xl border-border/80 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <CardTitle className="font-headline text-xl leading-tight">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link href={feature.href}>
                  {feature.cta} <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
