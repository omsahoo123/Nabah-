'use client';
import * as React from 'react';
import { useAuth } from '@/hooks/use-auth';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Edit } from 'lucide-react';
import type { Pharmacy, Medicine } from '@/lib/types';
import { pharmacies as initialPharmacies } from '@/lib/pharmacy-data';

const PHARMACY_DATA_KEY = 'pharmacy_data';

export default function ManagePharmacyPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [pharmacy, setPharmacy] = React.useState<Pharmacy | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingMedicine, setEditingMedicine] = React.useState<Medicine | null>(null);
  const [newMedicineName, setNewMedicineName] = React.useState('');
  const [newMedicineStock, setNewMedicineStock] = React.useState<'high' | 'low' | 'out of stock'>('high');

  React.useEffect(() => {
    const storedData = localStorage.getItem(PHARMACY_DATA_KEY);
    const allPharmacies = storedData ? JSON.parse(storedData) : initialPharmacies;
    const userPharmacy = allPharmacies.find((p: Pharmacy) => p.name === user?.name);
    
    if (userPharmacy) {
      setPharmacy(userPharmacy);
    } else if (user?.role === 'pharmacy') {
      // If no pharmacy data exists for this user, create a default one
      const newPharmacy: Pharmacy = {
        id: `PHA${String(allPharmacies.length + 1).padStart(3, '0')}`,
        name: user.name,
        distance: '0.0 km away',
        imageUrl: `https://picsum.photos/seed/pharmacy-${allPharmacies.length + 1}/400/300`,
        medicines: [],
      };
      const updatedPharmacies = [...allPharmacies, newPharmacy];
      localStorage.setItem(PHARMACY_DATA_KEY, JSON.stringify(updatedPharmacies));
      setPharmacy(newPharmacy);
    }
  }, [user]);

  const updateLocalStorage = (updatedPharmacy: Pharmacy) => {
    const storedData = localStorage.getItem(PHARMACY_DATA_KEY);
    const allPharmacies = storedData ? JSON.parse(storedData) : initialPharmacies;
    const updatedPharmacies = allPharmacies.map((p: Pharmacy) =>
      p.id === updatedPharmacy.id ? updatedPharmacy : p
    );
    localStorage.setItem(PHARMACY_DATA_KEY, JSON.stringify(updatedPharmacies));
  };
  
  const handleSaveMedicine = () => {
    if (!pharmacy) return;

    let updatedMedicines: Medicine[];
    if (editingMedicine) {
      // Update existing medicine
      updatedMedicines = pharmacy.medicines.map((med) =>
        med.name === editingMedicine.name ? { ...med, stock: newMedicineStock } : med
      );
       toast({ title: 'Medicine Updated', description: `${editingMedicine.name} stock level has been changed.` });
    } else {
       if (!newMedicineName) {
        toast({ title: 'Error', description: 'Medicine name cannot be empty.', variant: 'destructive' });
        return;
      }
      // Add new medicine
      if (pharmacy.medicines.some(med => med.name.toLowerCase() === newMedicineName.toLowerCase())) {
        toast({ title: 'Error', description: 'This medicine already exists.', variant: 'destructive' });
        return;
      }
      updatedMedicines = [...pharmacy.medicines, { name: newMedicineName, stock: newMedicineStock }];
       toast({ title: 'Medicine Added', description: `${newMedicineName} has been added to your inventory.` });
    }

    const updatedPharmacy = { ...pharmacy, medicines: updatedMedicines };
    setPharmacy(updatedPharmacy);
    updateLocalStorage(updatedPharmacy);
    
    setIsDialogOpen(false);
    setEditingMedicine(null);
    setNewMedicineName('');
  };

  const openEditDialog = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setNewMedicineStock(medicine.stock);
    setIsDialogOpen(true);
  };
  
  const openNewDialog = () => {
    setEditingMedicine(null);
    setNewMedicineName('');
    setNewMedicineStock('high');
    setIsDialogOpen(true);
  }

  if (user?.role !== 'pharmacy') {
    return (
      <div className="container mx-auto max-w-7xl text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">This page is for pharmacy owners only.</p>
      </div>
    );
  }

  if (!pharmacy) {
    return <div>Loading pharmacy data...</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
            Manage {pharmacy.name}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Update your medicine inventory and stock levels.
          </p>
        </div>
        <Button onClick={openNewDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Medicine
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medicine Inventory</CardTitle>
          <CardDescription>
            List of all available medicines in your pharmacy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine Name</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pharmacy.medicines.length > 0 ? (
                pharmacy.medicines.map((med) => (
                  <TableRow key={med.name}>
                    <TableCell className="font-medium">{med.name}</TableCell>
                    <TableCell className="capitalize">{med.stock.replace('_', ' ')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(med)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No medicines added yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMedicine ? 'Edit Medicine Stock' : 'Add New Medicine'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
             <div className="space-y-2">
              <Label htmlFor="med-name">Medicine Name</Label>
              <Input 
                id="med-name" 
                value={editingMedicine ? editingMedicine.name : newMedicineName}
                onChange={(e) => setNewMedicineName(e.target.value)}
                readOnly={!!editingMedicine}
                placeholder="e.g., Paracetamol"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="med-stock">Stock Level</Label>
              <Select 
                onValueChange={(value: 'high' | 'low' | 'out of stock') => setNewMedicineStock(value)}
                defaultValue={newMedicineStock}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stock level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">In Stock</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="out of stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
             <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            <Button onClick={handleSaveMedicine}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
