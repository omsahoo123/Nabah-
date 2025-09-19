'use client';
import * as React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Search,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Navigation,
} from 'lucide-react';
import type { Pharmacy } from '@/lib/types';
import { pharmacies as initialPharmacies } from '@/lib/pharmacy-data';

const PHARMACY_DATA_KEY = 'pharmacy_data';

const StockBadge = ({
  stock,
}: {
  stock: 'high' | 'low' | 'out of stock';
}) => {
  const stockInfo = {
    high: {
      icon: CheckCircle2,
      label: 'In Stock',
      color:
        'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    },
    low: {
      icon: AlertTriangle,
      label: 'Low Stock',
      color:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    },
    'out of stock': {
      icon: XCircle,
      label: 'Out of Stock',
      color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    },
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
  const [searchQuery, setSearchQuery] = React.useState('');
  const [allPharmacies, setAllPharmacies] = React.useState<Pharmacy[]>([]);
  const [filteredPharmacies, setFilteredPharmacies] = React.useState<Pharmacy[]>([]);

  React.useEffect(() => {
    const storedData = localStorage.getItem(PHARMACY_DATA_KEY);
    const pharmacies = storedData ? JSON.parse(storedData) : initialPharmacies;
    setAllPharmacies(pharmacies);
    setFilteredPharmacies(pharmacies);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredPharmacies(allPharmacies);
      return;
    }

    const filtered = allPharmacies
      .map((pharmacy) => {
        const matchingMedicines = pharmacy.medicines.filter((med) =>
          med.name.toLowerCase().includes(query)
        );
        return { ...pharmacy, medicines: matchingMedicines };
      })
      .filter((pharmacy) => pharmacy.medicines.length > 0);

    setFilteredPharmacies(filtered);
  };

  const handleGetDirections = (name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      name
    )}`;
    window.open(url, '_blank');
  };

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
          onChange={handleSearch}
          value={searchQuery}
        />
      </div>

      {filteredPharmacies.length === 0 && searchQuery && (
        <Card className="text-center py-12">
          <CardContent>
            <h3 className="text-xl font-semibold">No Results Found</h3>
            <p className="text-muted-foreground mt-2">
              We couldn't find any pharmacies with "{searchQuery}".
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {filteredPharmacies.map((pharmacy) => (
          <Card
            key={pharmacy.id}
            className="overflow-hidden shadow-md transition-shadow hover:shadow-xl"
          >
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
              <CardTitle className="font-headline text-xl">
                {pharmacy.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {pharmacy.distance}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="mb-2 font-semibold">
                {searchQuery
                  ? `Stock for "${searchQuery}"`
                  : 'Available Medicines'}
              </h4>
              <ul className="space-y-2">
                {pharmacy.medicines.map((med) => (
                  <li
                    key={med.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{med.name}</span>
                    <StockBadge stock={med.stock} />
                  </li>
                ))}
                 {pharmacy.medicines.length === 0 && !searchQuery && (
                  <li className="text-sm text-muted-foreground">No medicines listed for this pharmacy.</li>
                )}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleGetDirections(pharmacy.name)}
              >
                <Navigation className="mr-2 h-4 w-4" />
                Get Directions
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
