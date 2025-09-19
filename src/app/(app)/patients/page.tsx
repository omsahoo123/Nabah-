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
  import { FileText, PlusCircle } from 'lucide-react';
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

  
  const patients = [
    {
      id: 'PAT001',
      name: 'Aarav Sharma',
      avatar: 'https://picsum.photos/seed/patient-1/100/100',
      lastVisit: new Date('2023-10-26'),
      diagnosis: 'Common Cold',
    },
    {
      id: 'PAT002',
      name: 'Priya Patel',
      avatar: 'https://picsum.photos/seed/patient-2/100/100',
      lastVisit: new Date('2023-09-12'),
      diagnosis: 'Migraine',
    },
    {
      id: 'PAT003',
      name: 'Rohan Mehta',
      avatar: 'https://picsum.photos/seed/patient-3/100/100',
      lastVisit: new Date('2023-11-01'),
      diagnosis: 'Follow-up',
    },
     {
      id: 'PAT004',
      name: 'Saanvi Singh',
      avatar: 'https://picsum.photos/seed/patient-4/100/100',
      lastVisit: new Date('2023-07-20'),
      diagnosis: 'Allergy Check',
    },
  ];
  
  export default function PatientsPage() {
    return (
      <div className="container mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
                    Your Patients
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Manage your patient records and view their history.
                </p>
            </div>
            <Button>
                <PlusCircle className="mr-2" />
                Add New Patient
            </Button>
        </div>
  
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className='font-headline'>Patient List</CardTitle>
            <CardDescription>A list of all patients assigned to you.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Last Diagnosis</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                        <div className='flex items-center gap-3'>
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={patient.avatar} data-ai-hint="patient portrait" />
                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='font-semibold'>{patient.name}</p>
                                <p className='text-sm text-muted-foreground'>{patient.id}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                      {patient.lastVisit.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">{patient.diagnosis}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                         View Records
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
  