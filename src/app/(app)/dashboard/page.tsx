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
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/use-translation';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const patientFeatures = [
    {
      title: t('dashboard.patient.symptomChecker.title'),
      description: t('dashboard.patient.symptomChecker.description'),
      href: '/symptom-checker',
      icon: Stethoscope,
      cta: t('dashboard.patient.symptomChecker.cta'),
    },
    {
      title: t('dashboard.patient.scheduleAppointment.title'),
      description: t('dashboard.patient.scheduleAppointment.description'),
      href: '/appointments',
      icon: Calendar,
      cta: t('dashboard.patient.scheduleAppointment.cta'),
    },
    {
      title: t('dashboard.patient.videoConsultation.title'),
      description: t('dashboard.patient.videoConsultation.description'),
      href: '/consultations',
      icon: Video,
      cta: t('dashboard.patient.videoConsultation.cta'),
    },
    {
      title: t('dashboard.patient.healthRecords.title'),
      description: t('dashboard.patient.healthRecords.description'),
      href: '/records',
      icon: HeartPulse,
      cta: t('dashboard.patient.healthRecords.cta'),
    },
    {
      title: t('dashboard.patient.pharmacyChecker.title'),
      description: t('dashboard.patient.pharmacyChecker.description'),
      href: '/pharmacy',
      icon: Pill,
      cta: t('dashboard.patient.pharmacyChecker.cta'),
    },
  ];

  const doctorFeatures = [
    {
      title: t('dashboard.doctor.manageAppointments.title'),
      description: t('dashboard.doctor.manageAppointments.description'),
      href: '/appointments',
      icon: Calendar,
      cta: t('dashboard.doctor.manageAppointments.cta'),
    },
    {
      title: t('dashboard.doctor.startConsultation.title'),
      description: t('dashboard.doctor.startConsultation.description'),
      href: '/consultations',
      icon: Video,
      cta: t('dashboard.doctor.startConsultation.cta'),
    },
    {
      title: t('dashboard.doctor.patientRecords.title'),
      description: t('dashboard.doctor.patientRecords.description'),
      href: '/patients',
      icon: Users,
      cta: t('dashboard.doctor.patientRecords.cta'),
    },
  ];

  const features = user?.role === 'doctor' ? doctorFeatures : patientFeatures;
  const welcomeMessage =
    user?.role === 'doctor'
      ? t('dashboard.doctor.welcome', {
          name: user.name.split(' ').pop() || '',
        })
      : t('dashboard.patient.welcome');
  const subMessage =
    user?.role === 'doctor'
      ? t('dashboard.doctor.subMessage')
      : t('dashboard.patient.subMessage');

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
          {welcomeMessage}
        </h1>
        <p className="mt-2 text-muted-foreground">{subMessage}</p>
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
