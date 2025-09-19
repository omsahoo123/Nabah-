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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, User, Calendar, Stethoscope } from 'lucide-react';
import { healthRecords } from '@/lib/records-data';
import { patients } from '@/lib/patients-data';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function PatientRecordPage() {
    const { toast } = useToast();
    const params = useParams();
    const patientId = params.patientId as string;

    const patient = patients.find(p => p.id === patientId);
    // In a real app, you'd filter records based on the patientId
    const patientRecords = healthRecords; 

    const handleDownload = (recordId: string) => {
        toast({
            title: "Download Started",
            description: `Downloading record ${recordId}.pdf...`,
        });
    };

    if (!patient) {
        return (
            <div className="container mx-auto max-w-4xl space-y-8 text-center">
                <h1 className="mt-8 text-2xl font-bold">Patient not found</h1>
                <Button asChild>
                    <Link href="/patients">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Patient List
                    </Link>
                </Button>
            </div>
        )
    }

  return (
    <div className="container mx-auto max-w-5xl space-y-8">
        <div>
            <Button variant="ghost" asChild className="mb-4">
                <Link href="/patients">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Patients
                </Link>
            </Button>
            <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={patient.avatar} data-ai-hint="patient portrait" />
                    <AvatarFallback className="text-3xl">{patient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
                    {patient.name}
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Viewing medical records for patient ID: {patient.id}
                    </p>
                </div>
            </div>
        </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className='font-headline'>Medical History</CardTitle>
          <CardDescription>A list of {patient.name}'s recent medical records.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Prescription</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    <Badge variant="secondary">{record.id}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>{record.diagnosis}</TableCell>
                  <TableCell>{record.doctor}</TableCell>
                  <TableCell className='max-w-xs truncate'>{record.prescription}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDownload(record.id)}>
                      <Download className="h-4 w-4" />
                       <span className="sr-only">Download record</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
