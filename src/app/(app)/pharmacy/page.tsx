import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, MapPin, CheckCircle2, AlertTriangle, XCircle, Navigation } from 'lucide-react';
import type { Pharmacy } from '@/lib/types';

const pharmacies: Pharmacy[] = [
  {
    id: 'PHA001',
    name: 'City Pharmacy',
    distance: '1.2 km away',
    imageUrl: 'https://picsum.photos/seed/pharmacy-1/400/300',
    medicines: [
      { name: 'Paracetamol', stock: 'high' },
      { name: 'Amoxicillin', stock: 'low' },
      { name: 'Ibuprofen', stock: 'high' },
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
    ],
  },
];

const StockBadge = ({ stock }: { stock: 'high' | 'low' | 'out of stock' }) => {
  const stockInfo = {
    high: { icon: CheckCircle2, label: 'In Stock', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
    low: { icon: AlertTriangle, label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' },
    'out of stock': { icon: XCircle, label: 'Out of Stock', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
  };
  const { icon: Icon, label, color } = stockInfo[stock];
  return (
    <Badge variant="outline" className={`border-0 ${color}`}>
      <Icon className="mr-1 h-3 w-3" />
      {label}
    </Badge>
  );
};


export default function PharmacyPage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
          Medicine Availability
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find medicines in nearby pharmacies.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for a medicine (e.g., Paracetamol)"
          className="w-full rounded-full bg-card py-6 pl-12 text-base"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {pharmacies.map((pharmacy) => (
          <Card key={pharmacy.id} className="overflow-hidden shadow-md transition-shadow hover:shadow-xl">
            <div className="relative h-48 w-full">
              <Image
                src={pharmacy.imageUrl}
                alt={`Image of ${pharmacy.name}`}
                fill
                className="object-cover"
                data-ai-hint="pharmacy store"
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl">{pharmacy.name}</CardTitle>
              <CardDescription className='flex items-center gap-1'>
                <MapPin className='h-4 w-4' /> {pharmacy.distance}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="mb-2 font-semibold">Stock for "Paracetamol"</h4>
              <ul className="space-y-2">
                {pharmacy.medicines.map((med) => (
                    med.name === 'Paracetamol' && (
                    <li key={med.name} className="flex items-center justify-between text-sm">
                        <span>{med.name}</span>
                        <StockBadge stock={med.stock} />
                    </li>
                    )
                ))}
              </ul>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className='w-full'>
                    <Navigation className='mr-2 h-4 w-4'/>
                    Get Directions
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
