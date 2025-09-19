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
  Calendar as CalendarIcon,
  Check,
  X,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { appointments as initialAppointments } from '@/lib/appointments-data';
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
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleBooking = () => {
    if (date && selectedSlot) {
      toast({
        title: 'Appointment Booked!',
        description: `Your video consultation is confirmed for ${date.toLocaleDateString()} at ${selectedSlot}.`,
      });
      setSelectedSlot(null);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
          Schedule an Appointment
        </h1>
        <p className="mt-2 text-muted-foreground">
          Choose a date and time that works for you.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Select a Date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Available Times</CardTitle>
            <CardDescription>
              for{' '}
              {date
                ? date.toLocaleDateString('en-US', {
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
            {selectedSlot && (
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
  const [appointments, setAppointments] =
    React.useState(initialAppointments);
  const { toast } = useToast();

  const handleStartCall = (appointmentId: string) => {
    router.push('/consultations');
  };

  const handleAppointmentAction = (
    appointmentId: string,
    action: 'Confirmed' | 'Canceled'
  ) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === appointmentId ? { ...app, status: action } : app
      )
    );
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
              {appointments.map((appointment) => (
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
                        <p className="font-semibold">{appointment.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.patientId}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(appointment.date).toLocaleDateString('en-US', {
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
                            : 'destructive'
                      }
                      className={
                        appointment.status === 'Confirmed'
                          ? 'bg-blue-100 text-blue-800'
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
              ))}
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
      {user?.role === 'doctor' ? <DoctorAppointments /> : <PatientAppointments />}
    </div>
  );
}
