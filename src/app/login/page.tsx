'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Icons } from '@/components/icons';
import { User, Stethoscope, Store } from 'lucide-react';
import { useAuth, UserRole } from '@/hooks/use-auth';
import Link from 'next/link';
import type { Doctor } from '@/lib/types';
import { doctors as initialDoctors } from '@/lib/doctors-data';

const DOCTORS_KEY = 'doctors_data';


const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
  role: z.enum(['patient', 'doctor', 'pharmacy'], {
    required_error: 'Please select a role.',
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'patient',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would validate credentials against a backend.
      // Here, we'll just simulate a successful login.
      let name = 'Aarav Sharma';
      if (values.role === 'doctor') {
        const storedData = localStorage.getItem(DOCTORS_KEY);
        const allDoctors = storedData ? JSON.parse(storedData) : initialDoctors;
        // In a real app, we would look up user by email from a DB.
        // For this demo, we assume the first doctor is the one logging in
        // if no other logic is in place. A better approach would be to find
        // the doctor by a unique identifier like email, if it were stored.
        // For now, we'll default to a generic name if no doctors are found.
        name = allDoctors.length > 0 ? allDoctors[0].name : 'Dr. Sample';
        
        // A better approach if we had email in doctors data:
        // const doctor = allDoctors.find(d => d.email === values.email);
        // name = doctor ? doctor.name : 'Dr. Sample';

      } else if (values.role === 'pharmacy') {
        name = 'City Pharmacy';
      }
      
      const user = {
        name: name,
        email: values.email,
        role: values.role as UserRole,
      };

      login(user);

      toast({
        title: 'Login Successful',
        description: `Welcome back, ${user.name.split(' ')[0]}!`,
      });
      router.push('/dashboard');
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-4">
        <div className="flex flex-col items-center text-center">
            <Icons.logo className="h-12 w-12 text-primary" />
            <h1 className="mt-4 text-3xl font-headline font-bold tracking-tight md:text-4xl">
                Welcome to Nabha
            </h1>
            <p className="mt-2 text-muted-foreground">
                Your partner in accessible healthcare.
            </p>
        </div>
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Login</CardTitle>
            <CardDescription>
              Select your role and enter your credentials to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select your role</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                        >
                          <FormItem>
                            <RadioGroupItem value="patient" id="patient" className="sr-only peer" />
                            <FormLabel htmlFor="patient" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                <User className="mb-3 h-6 w-6" />
                                Patient
                            </FormLabel>
                          </FormItem>
                          <FormItem>
                            <RadioGroupItem value="doctor" id="doctor" className="sr-only peer" />
                             <FormLabel htmlFor="doctor" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                <Stethoscope className="mb-3 h-6 w-6" />
                                Doctor
                            </FormLabel>
                          </FormItem>
                          <FormItem>
                            <RadioGroupItem value="pharmacy" id="pharmacy" className="sr-only peer" />
                             <FormLabel htmlFor="pharmacy" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                <Store className="mb-3 h-6 w-6" />
                                Pharmacy
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
         <p className="px-8 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                Sign up
            </Link>
        </p>
      </div>
    </div>
  );
}
