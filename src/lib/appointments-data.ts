
export type Appointment = {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  date: string; // ISO string
  time: string;
  status: 'Confirmed' | 'Completed' | 'Upcoming' | 'Canceled';
  doctorName: string;
  doctorAvatar: string;
};


export const appointments: Appointment[] = [];
  
