export const appointments = [
    {
      id: 'APP001',
      patientId: 'PAT001',
      patientName: 'Aarav Sharma',
      patientAvatar: 'https://picsum.photos/seed/patient-1/100/100',
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: '10:00 AM',
      status: 'Confirmed',
    },
    {
      id: 'APP002',
      patientId: 'PAT002',
      patientName: 'Priya Patel',
      patientAvatar: 'https://picsum.photos/seed/patient-2/100/100',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: '02:30 PM',
      status: 'Confirmed',
    },
    {
      id: 'APP003',
      patientId: 'PAT003',
      patientName: 'Rohan Mehta',
      patientAvatar: 'https://picsum.photos/seed/patient-3/100/100',
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: '11:00 AM',
      status: 'Upcoming',
    },
    {
      id: 'APP004',
      patientId: 'PAT004',
      patientName: 'Saanvi Singh',
      patientAvatar: 'https://picsum.photos/seed/patient-4/100/100',
      date: new Date(new Date().setDate(new Date().getDate() - 5)),
      time: '03:00 PM',
      status: 'Completed',
    },
  ];
  