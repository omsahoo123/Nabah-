'use client';
import * as React from 'react';
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
import { FileText, PlusCircle, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { patients as initialPatients, Patient } from '@/lib/patients-data';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/use-translation';

const newPatientSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  diagnosis: z
    .string()
    .min(3, { message: 'Initial diagnosis must be at least 3 characters.' }),
});

const PATIENTS_STORAGE_KEY = 'patients_data';

export default function PatientsPage() {
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  React.useEffect(() => {
    const storedPatients = localStorage.getItem(PATIENTS_STORAGE_KEY);
    if (storedPatients) {
      // Need to parse dates from strings
      const parsedPatients = JSON.parse(storedPatients).map((p: Patient) => ({
        ...p,
        lastVisit: new Date(p.lastVisit),
      }));
      setPatients(parsedPatients);
    } else {
      setPatients(initialPatients);
      localStorage.setItem(
        PATIENTS_STORAGE_KEY,
        JSON.stringify(initialPatients)
      );
    }
  }, []);

  const form = useForm<z.infer<typeof newPatientSchema>>({
    resolver: zodResolver(newPatientSchema),
    defaultValues: {
      name: '',
      email: '',
      diagnosis: '',
    },
  });

  function onSubmit(values: z.infer<typeof newPatientSchema>) {
    const newPatient = {
      id: `PAT${String(patients.length + 1).padStart(3, '0')}`,
      name: values.name,
      avatar: `https://picsum.photos/seed/patient-${
        patients.length + 1
      }/100/100`,
      lastVisit: new Date(),
      diagnosis: values.diagnosis,
    };

    const updatedPatients = [newPatient, ...patients];
    setPatients(updatedPatients);
    localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(updatedPatients));

    toast({
      title: t('patients.toast.patientAdded.title'),
      description: t('patients.toast.patientAdded.description', {
        name: values.name,
      }),
    });
    form.reset();
    setIsDialogOpen(false);
  }

  function handleDelete(patientId: string) {
    const updatedPatients = patients.filter((p) => p.id !== patientId);
    setPatients(updatedPatients);
    localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(updatedPatients));
    toast({
      title: t('patients.toast.patientDeleted.title'),
      description: t('patients.toast.patientDeleted.description'),
      variant: 'destructive',
    });
  }

  return (
    <div className="container mx-auto max-w-7xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
            {t('patients.title')}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t('patients.description')}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" />
              {t('patients.addNewPatient')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('patients.dialog.title')}</DialogTitle>
              <DialogDescription>
                {t('patients.dialog.description')}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('patients.dialog.form.name')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            'patients.dialog.form.namePlaceholder'
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('patients.dialog.form.email')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            'patients.dialog.form.emailPlaceholder'
                          )}
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="diagnosis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('patients.dialog.form.diagnosis')}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t(
                            'patients.dialog.form.diagnosisPlaceholder'
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      {t('cancel')}
                    </Button>
                  </DialogClose>
                  <Button type="submit">{t('patients.dialog.save')}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">
            {t('patients.listTitle')}
          </CardTitle>
          <CardDescription>{t('patients.listDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('patient')}</TableHead>
                <TableHead>{t('patients.lastVisit')}</TableHead>
                <TableHead>{t('patients.lastDiagnosis')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={patient.avatar}
                          data-ai-hint="patient portrait"
                        />
                        <AvatarFallback>
                          {patient.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {patient.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(patient.lastVisit).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.diagnosis}</Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/patients/${patient.id}`}>
                        <FileText className="mr-2 h-4 w-4" />
                        {t('patients.viewRecords')}
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {t('patients.deleteDialog.title')}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {t('patients.deleteDialog.description')}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(patient.id)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            {t('delete')}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
