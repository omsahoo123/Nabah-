
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


export const appointments: Appointment[] = [
    {
      id: 'APP001',
      patientId: 'PAT001',
      patientName: 'Aarav Sharma',
      patientAvatar: 'https://picsum.photos/seed/patient-1/100/100',
      date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
      time: '10:00 AM',
      status: 'Confirmed',
      doctorName: 'Dr. Emily Carter',
      doctorAvatar: 'https://picsum.photos/seed/doctor-1/100/100',
    },
    {
      id: 'APP002',
      patientId: 'PAT002',
      patientName: 'Priya Patel',
      patientAvatar: 'https://picsum.photos/seed/patient-2/100/100',
      date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
      time: '02:30 PM',
      status: 'Confirmed',
      doctorName: 'Dr. Emily Carter',
      doctorAvatar: 'https://picsum.photos/seed/doctor-1/100/100',
    },
    {
      id: 'APP003',
      patientId: 'PAT003',
      patientName: 'Rohan Mehta',
      patientAvatar: 'https://picsum.photos/seed/patient-3/100/100',
      date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
      time: '11:00 AM',
      status: 'Upcoming',
      doctorName: 'Dr. Ben Adams',
      doctorAvatar: 'https://picsum.photos/seed/doctor-2/100/100',
    },
    {
      id: 'APP004',
      patientId: 'PAT004',
      patientName: 'Saanvi Singh',
      patientAvatar: 'https://picsum.photos/seed/patient-4/100/100',
      date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
      time: '03:00 PM',
      status: 'Completed',
      doctorName: 'Dr. Emily Carter',
      doctorAvatar: 'https://picsum.photos/seed/doctor-1/100/100',
    },
  ];
  
