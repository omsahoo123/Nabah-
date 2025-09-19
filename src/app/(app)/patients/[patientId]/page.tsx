'use client';
import * as React from 'react';
import { useParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';
import { healthRecords as allHealthRecords } from '@/lib/records-data';
import { patients as initialPatients, Patient } from '@/lib/patients-data';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';

const PATIENTS_STORAGE_KEY = 'patients_data';

export default function PatientRecordPage() {
  const { toast } = useToast();
  const params = useParams();
  const patientId = params.patientId as string;
  const [patient, setPatient] = React.useState<Patient | null | undefined>(
    undefined
  );
  const { t } = useTranslation();

  React.useEffect(() => {
    const storedPatients = localStorage.getItem(PATIENTS_STORAGE_KEY);
    let allPatients = initialPatients;
    if (storedPatients) {
      allPatients = JSON.parse(storedPatients).map((p: Patient) => ({
        ...p,
        lastVisit: new Date(p.lastVisit),
      }));
    }

    const foundPatient = allPatients.find((p) => p.id === patientId);
    setPatient(foundPatient);
  }, [patientId]);

  const patientRecords = allHealthRecords.filter(
    (record) => record.patientId === patientId
  );

  const handleDownload = (recordId: string) => {
    toast({
      title: t('patientRecords.toast.downloadStarted.title'),
      description: t('patientRecords.toast.downloadStarted.description', {
        recordId,
      }),
    });
  };

  if (patient === undefined) {
    // Still loading patient data
    return (
      <div className="container mx-auto max-w-4xl space-y-8 text-center">
        <h1 className="mt-8 text-2xl font-bold">
          {t('patientRecords.loading')}
        </h1>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container mx-auto max-w-4xl space-y-8 text-center">
        <h1 className="mt-8 text-2xl font-bold">
          {t('patientRecords.notFound')}
        </h1>
        <Button asChild>
          <Link href="/patients">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('patientRecords.backToPatients')}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl space-y-8">
      <div>
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/patients">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('patientRecords.backToPatients')}
          </Link>
        </Button>
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src={patient.avatar} data-ai-hint="patient portrait" />
            <AvatarFallback className="text-3xl">
              {patient.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
              {patient.name}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {t('patientRecords.pageDescription', { patientId: patient.id })}
            </p>
          </div>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">
            {t('patientRecords.medicalHistory')}
          </CardTitle>
          <CardDescription>
            {t('patientRecords.medicalHistoryDescription', {
              name: patient.name,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('patientRecords.recordId')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('diagnosis')}</TableHead>
                <TableHead>{t('doctor')}</TableHead>
                <TableHead>{t('prescription')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientRecords.length > 0 ? (
                patientRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      <Badge variant="secondary">{record.id}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(record.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>{record.diagnosis}</TableCell>
                    <TableCell>{record.doctor}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {record.prescription}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(record.id)}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">
                          {t('patientRecords.downloadRecord')}
                        </span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    {t('patientRecords.noRecords')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
