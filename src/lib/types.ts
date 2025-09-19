export type Appointment = {
  id: string;
  doctor: string;
  specialty: string;
  date: Date;
  time: string;
  status: 'confirmed' | 'completed' | 'canceled';
};

export type HealthRecord = {
  id: string;
  date: Date;
  diagnosis: string;
  doctor: string;
  prescription: string;
};

export type Pharmacy = {
  id: string;
  name: string;
  distance: string;
  imageUrl: string;
  medicines: { name: string; stock: 'high' | 'low' | 'out of stock' }[];
};
