import type { Pharmacy } from '@/lib/types';

export const pharmacies: Pharmacy[] = [
  {
    id: 'PHA001',
    name: 'City Pharmacy',
    distance: '1.2 km away',
    imageUrl: 'https://picsum.photos/seed/pharmacy-1/400/300',
    medicines: [
      { name: 'Paracetamol', stock: 'high' },
      { name: 'Amoxicillin', stock: 'low' },
      { name: 'Ibuprofen', stock: 'high' },
      { name: 'Aspirin', stock: 'high' },
    ],
  },
  {
    id: 'PHA002',
    name: 'Wellness Drugstore',
    distance: '2.5 km away',
    imageUrl: 'https://picsum.photos/seed/pharmacy-2/400/300',
    medicines: [
      { name: 'Paracetamol', stock: 'high' },
      { name: 'Amoxicillin', stock: 'out of stock' },
      { name: 'Loratadine', stock: 'low' },
      { name: 'Omeprazole', stock: 'high' },
    ],
  },
  {
    id: 'PHA003',
    name: 'HealthFirst Meds',
    distance: '3.1 km away',
    imageUrl: 'https://picsum.photos/seed/pharmacy-3/400/300',
    medicines: [
      { name: 'Ibuprofen', stock: 'out of stock' },
      { name: 'Cetirizine', stock: 'high' },
      { name: 'Aspirin', stock: 'low' },
    ],
  },
];
