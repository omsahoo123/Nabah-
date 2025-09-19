'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth, User } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email(),
  phone: z.string().optional(),
  age: z.coerce.number().int().positive().optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  address: z.string().optional(),
  avatar: z.string().optional(),
});

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      age: user?.age || undefined,
      gender: user?.gender || undefined,
      address: user?.address || '',
      avatar: user?.avatar || '',
    },
  });

  React.useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        age: user.age || undefined,
        gender: user.gender || undefined,
        address: user.address || '',
        avatar: user.avatar || '',
      });
    }
  }, [user, form]);
  
  const handleAvatarUpload = () => {
    // In a real app, this would open a file picker and handle the upload.
    // For this demo, we'll just cycle through a few placeholder images.
    const newAvatar = `https://picsum.photos/seed/user-avatar-${Math.floor(Math.random() * 10)}/100/100`;
    form.setValue('avatar', newAvatar);
    toast({
      title: 'Avatar Changed',
      description: "Don't forget to save your changes!",
    });
  };

  function onSubmit(values: z.infer<typeof profileSchema>) {
    if (!user) return;
    
    const updatedUserData: User = {
        ...user,
        ...values,
        age: values.age ? Number(values.age) : undefined,
    };

    updateUser(updatedUserData);
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your information has been successfully saved.',
    });
  }

  if (!user) {
    return <div>Loading...</div>;
  }
  
  const nameInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
          Your Profile
        </h1>
        <p className="mt-2 text-muted-foreground">
          View and manage your personal information.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline">Personal Details</CardTitle>
            <CardDescription>
              {isEditing
                ? 'Edit your details below and click save.'
                : 'Your personal information.'}
            </CardDescription>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "secondary" : "default"}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={form.watch('avatar')} data-ai-hint="person portrait"/>
                  <AvatarFallback className="text-3xl">{nameInitial}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button type="button" variant="outline" onClick={handleAvatarUpload}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly={!isEditing} placeholder="e.g., +1 234 567 890" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} value={field.value ?? ''} readOnly={!isEditing} placeholder="e.g., 35" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                       <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value} disabled={!isEditing}>
                         <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                         </FormControl>
                         <SelectContent>
                           <SelectItem value="male">Male</SelectItem>
                           <SelectItem value="female">Female</SelectItem>
                           <SelectItem value="other">Other</SelectItem>
                           <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                         </SelectContent>
                       </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="sm:col-span-2">
                    <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Textarea {...field} readOnly={!isEditing} placeholder="123 Health St, Wellness City, 12345" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
              </div>
              {isEditing && (
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
