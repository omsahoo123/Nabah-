'use client';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Video,
  User,
  Check,
  X,
  Stethoscope,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { appointments as initialAppointments, Appointment } from '@/lib/appointments-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { doctors as initialDoctors, Doctor } from '@/lib/doctors-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const APPOINTMENTS_KEY = 'appointments_data';
const DOCTORS_KEY = 'doctors_data';


const availableSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '04:30 PM',
];

function PatientAppointments() {
  const { user } = useAuth();
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = React.useState<string | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    const storedData = localStorage.getItem(DOCTORS_KEY);
    const allDoctors = storedData ? JSON.parse(storedData) : initialDoctors;
    setDoctors(allDoctors);
  }, []);

  const handleBooking = () => {
    if (date && selectedSlot && selectedDoctor && user) {
      const storedData = localStorage.getItem(APPOINTMENTS_KEY);
      const allAppointments = storedData ? JSON.parse(storedData) : initialAppointments;
      
      const doctor = doctors.find(d => d.name === selectedDoctor);
      if (!doctor) {
        toast({ title: 'Error', description: 'Selected doctor not found.', variant: 'destructive'});
        return;
      }

      const newAppointment: Appointment = {
        id: `APP${String(allAppointments.length + 1).padStart(3, '0')}`,
        patientId: user.email, // Using email as a unique patient ID
        patientName: user.name,
        patientAvatar: user.avatar || 'https://picsum.photos/seed/default-avatar/100/100',
        date: date.toISOString(),
        time: selectedSlot,
        status: 'Upcoming',
        doctorName: doctor.name,
        doctorAvatar: doctor.avatar
      };

      const updatedAppointments = [...allAppointments, newAppointment];
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updatedAppointments));

      toast({
        title: 'Appointment Booked!',
        description: `Your video consultation with ${selectedDoctor} is confirmed for ${date.toLocaleDateString()} at ${selectedSlot}.`,
      });
      setSelectedSlot(null);
      // We keep the doctor selected for easier subsequent bookings.
    } else {
        toast({ title: 'Incomplete Information', description: 'Please select a date, time, and doctor to book an appointment.', variant: 'destructive' });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
          Schedule an Appointment
        </h1>
        <p className="mt-2 text-muted-foreground">
          Choose a doctor, date, and time that works for you.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Select a Date & Doctor</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-8">
             <div className="w-full max-w-sm">
                <Select onValueChange={setSelectedDoctor} value={selectedDoctor || ""}>
                    <SelectTrigger className="w-full text-base py-6">
                        <SelectValue placeholder={<div className="flex items-center gap-2 text-muted-foreground"><Stethoscope /> Select a Doctor</div>} />
                    </SelectTrigger>
                    <SelectContent>
                        {doctors.length > 0 ? (
                            doctors.map(doctor => (
                                <SelectItem key={doctor.id} value={doctor.name}>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={doctor.avatar} />
                                            <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{doctor.name}</p>
                                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                                        </div>
                                    </div>
                                </SelectItem>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-muted-foreground">No doctors available. Please sign up a doctor account first.</div>
                        )}
                    </SelectContent>
                </Select>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Available Times</CardTitle>
            <CardDescription>
              for{' '}
              {date
                ? date.toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'today'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {availableSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={selectedSlot === slot ? 'default' : 'outline'}
                  onClick={() => setSelectedSlot(slot)}
                  className="font-normal"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {slot}
                </Button>
              ))}
            </div>
            {selectedSlot && selectedDoctor && (
              <div className="!mt-6 space-y-4 rounded-lg border bg-secondary p-4">
                <h3 className="font-semibold">Confirm Appointment</h3>
                <p className="text-sm text-muted-foreground">
                  You are booking a{' '}
                  <Badge
                    variant="secondary"
                    className="bg-accent/50 text-accent-foreground"
                  >
                    Video Consultation
                  </Badge>{' '}
                  for:
                </p>
                <div className="text-sm font-medium">
                  <p>Doctor: {selectedDoctor}</p>
                  <p>Date: {date?.toLocaleDateString()}</p>
                  <p>Time: {selectedSlot}</p>
                </div>
                <Button className="w-full" onClick={handleBooking}>
                  Confirm Booking
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function DoctorAppointments() {
  const router = useRouter();
  const { user } = useAuth();
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const { toast } = useToast();

  React.useEffect(() => {
    const storedData = localStorage.getItem(APPOINTMENTS_KEY);
    const allAppointments = storedData ? JSON.parse(storedData) : initialAppointments;
    const doctorAppointments = allAppointments.filter((app: Appointment) => app.doctorName === user?.name);
    setAppointments(doctorAppointments);
  }, [user]);

  const updateLocalStorage = (updatedAppointments: Appointment[]) => {
      const storedData = localStorage.getItem(APPOINTMENTS_KEY);
      const allAppointments = storedData ? JSON.parse(storedData) : initialAppointments;
      const otherAppointments = allAppointments.filter((app: Appointment) => app.doctorName !== user?.name);
      const newAllAppointments = [...otherAppointments, ...updatedAppointments];
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(newAllAppointments));
  }

  const handleStartCall = (appointmentId: string) => {
    router.push('/consultations');
  };

  const handleAppointmentAction = (
    appointmentId: string,
    action: 'Confirmed' | 'Canceled'
  ) => {
    const updated = appointments.map((app) =>
      app.id === appointmentId ? { ...app, status: action } : app
    );
    setAppointments(updated);
    updateLocalStorage(updated);
    toast({
      title: `Appointment ${action}`,
      description: `The appointment has been successfully ${action.toLowerCase()}.`,
    });
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
          Manage Appointments
        </h1>
        <p className="mt-2 text-muted-foreground">
          View and manage your upcoming patient appointments.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">
            Upcoming Consultations
          </CardTitle>
          <CardDescription>
            Here are your scheduled appointments for the upcoming week.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={appointment.patientAvatar}
                            data-ai-hint="patient portrait"
                          />
                          <AvatarFallback>
                            {appointment.patientName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">
                            {appointment.patientName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.patientId}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(appointment.date).toLocaleDateString(undefined, {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          appointment.status === 'Confirmed'
                            ? 'default'
                            : appointment.status === 'Completed'
                            ? 'secondary'
                            : appointment.status === 'Upcoming'
                            ? 'outline'
                            : 'destructive'
                        }
                         className={
                          appointment.status === 'Confirmed'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : appointment.status === 'Upcoming'
                            ? 'text-amber-800 bg-amber-100 border-amber-300'
                            : ''
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {appointment.status === 'Confirmed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStartCall(appointment.id)}
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Start Call
                        </Button>
                      )}
                      {appointment.status === 'Upcoming' && (
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleAppointmentAction(
                                appointment.id,
                                'Confirmed'
                              )
                            }
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleAppointmentAction(
                                appointment.id,
                                'Canceled'
                              )
                            }
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                 <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No appointments scheduled.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default function AppointmentsPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto max-w-6xl space-y-8">
      {user?.role === 'doctor' ? (
        <DoctorAppointments />
      ) : (
        <PatientAppointments />
      )}
    </div>
  );
}
