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
import { Download, FileText } from 'lucide-react';
import type { HealthRecord } from '@/lib/types';

const healthRecords: HealthRecord[] = [
  {
    id: 'REC001',
    date: new Date('2023-10-26'),
    diagnosis: 'Common Cold',
    doctor: 'Dr. Emily Carter',
    prescription: 'Rest, Fluids, Paracetamol',
  },
  {
    id: 'REC002',
    date: new Date('2023-08-15'),
    diagnosis: 'Annual Check-up',
    doctor: 'Dr. Ben Adams',
    prescription: 'Vitamins, Diet plan',
  },
  {
    id: 'REC003',
    date: new Date('2023-05-02'),
    diagnosis: 'Allergic Rhinitis',
    doctor: 'Dr. Emily Carter',
    prescription: 'Antihistamines',
  },
  {
    id: 'REC004',
    date: new Date('2022-12-20'),
    diagnosis: 'Sprained Ankle',
    doctor: 'Dr. Ben Adams',
    prescription: 'R.I.C.E. method',
  },
];

export default function RecordsPage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
          Your Health Records
        </h1>
        <p className="mt-2 text-muted-foreground">
          Access your past diagnoses and prescriptions. This data is available offline.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className='font-headline'>Medical History</CardTitle>
          <CardDescription>A list of your recent medical records.</CardDescription>
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
              {healthRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    <Badge variant="secondary">{record.id}</Badge>
                  </TableCell>
                  <TableCell>
                    {record.date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>{record.diagnosis}</TableCell>
                  <TableCell>{record.doctor}</TableCell>
                  <TableCell className='max-w-xs truncate'>{record.prescription}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
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
