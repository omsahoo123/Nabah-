'use client';

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
  Users,
  Store,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user } = useAuth();

  const patientFeatures = [
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

  const doctorFeatures = [
    {
      title: 'Manage Appointments',
      description: 'View and manage your upcoming patient appointments.',
      href: '/appointments',
      icon: Calendar,
      cta: 'View Schedule',
    },
    {
      title: 'Start Consultation',
      description: 'Begin scheduled video consultations with your patients.',
      href: '/consultations',
      icon: Video,
      cta: 'Start a Call',
    },
    {
      title: 'Patient Records',
      description: 'Access and manage the health records of your patients.',
      href: '/patients',
      icon: Users,
      cta: 'View Patients',
    },
  ];
  
  const pharmacyFeatures = [
    {
      title: 'Manage Pharmacy',
      description: 'Update your pharmacy details and medicine stock.',
      href: '/manage-pharmacy',
      icon: Store,
      cta: 'Update Stock',
    },
  ];

  const getFeatures = () => {
    switch (user?.role) {
      case 'doctor':
        return doctorFeatures;
      case 'pharmacy':
        return pharmacyFeatures;
      default:
        return patientFeatures;
    }
  };
  
  const features = getFeatures();
  
  const getWelcomeMessage = () => {
     switch (user?.role) {
      case 'doctor':
        return `Welcome, Dr. ${user.name.split(' ').pop() || ''}`;
      case 'pharmacy':
        return `Welcome, ${user.name}`;
       default:
        return 'Welcome to Nabha Telehealth';
    }
  }

  const getSubMessage = () => {
     switch (user?.role) {
      case 'doctor':
        return 'Manage your patients and appointments efficiently.';
      case 'pharmacy':
        return 'Manage your pharmacy inventory and details.';
       default:
        return 'Your partner in accessible healthcare. Here\'s what you can do.';
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-7xl space-y-8">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
          {getWelcomeMessage()}
        </h1>
        <p className="mt-2 text-muted-foreground">{getSubMessage()}</p>
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
