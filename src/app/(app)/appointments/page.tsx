'use client';
import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Video } from 'lucide-react';

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

export default function AppointmentsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);

  return (
    <div className="container mx-auto max-w-6xl space-y-8">
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
              disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Available Times</CardTitle>
            <CardDescription>
              for {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'today'}
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
                  You are booking a <Badge variant="secondary" className="bg-accent/50 text-accent-foreground">Video Consultation</Badge> for:
                </p>
                <div className='text-sm font-medium'>
                  <p>Date: {date?.toLocaleDateString()}</p>
                  <p>Time: {selectedSlot}</p>
                </div>
                <Button className="w-full">
                  Confirm Booking
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
