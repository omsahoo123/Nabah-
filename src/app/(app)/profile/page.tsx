'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
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
import { useTranslation } from '@/hooks/use-translation';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email(),
  phone: z.string().optional(),
  age: z.coerce.number().int().positive().optional().or(z.literal('')),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  address: z.string().optional(),
  avatar: z.string().optional(),
});

export default function ProfilePage() {
  const { user, updateUser, isLoading } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = React.useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: user || {},
  });

  React.useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        age: user.age || '',
        gender: user.gender || undefined,
        address: user.address || '',
        avatar: user.avatar || '',
      });
    }
  }, [user, form, isEditing]);

  const handleAvatarUpload = () => {
    // In a real app, this would open a file picker and handle the upload.
    // For this demo, we'll just cycle through a few placeholder images.
    const newAvatar = `https://picsum.photos/seed/user-avatar-${Math.floor(
      Math.random() * 10
    )}/100/100`;
    form.setValue('avatar', newAvatar, { shouldDirty: true });
    toast({
      title: t('profile.toast.avatarChanged.title'),
      description: t('profile.toast.avatarChanged.description'),
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
      title: t('profile.toast.profileUpdated.title'),
      description: t('profile.toast.profileUpdated.description'),
    });
  }

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  if (isLoading || !user) {
    return <div>{t('loading')}...</div>;
  }

  const nameInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
          {t('profile.title')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t('profile.description')}
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between sm:items-center">
          <div>
            <CardTitle className="font-headline">
              {t('profile.card.title')}
            </CardTitle>
            <CardDescription>
              {isEditing
                ? t('profile.card.descriptionEditing')
                : t('profile.card.descriptionViewing')}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {isEditing && (
              <Button onClick={handleCancel} variant="secondary">
                {t('cancel')}
              </Button>
            )}
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? 'default' : 'outline'}
            >
              {isEditing ? t('profile.saveChanges') : t('profile.editProfile')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={form.watch('avatar')}
                    data-ai-hint="person portrait"
                  />
                  <AvatarFallback className="text-3xl">
                    {nameInitial}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAvatarUpload}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {t('profile.uploadPhoto')}
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('profile.form.name')}</FormLabel>
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
                      <FormLabel>{t('profile.form.email')}</FormLabel>
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
                      <FormLabel>{t('profile.form.phone')}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          readOnly={!isEditing}
                          placeholder={t('profile.form.phonePlaceholder')}
                        />
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
                      <FormLabel>{t('profile.form.age')}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value ?? ''}
                          readOnly={!isEditing}
                          placeholder={t('profile.form.agePlaceholder')}
                        />
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
                      <FormLabel>{t('profile.form.gender')}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        disabled={!isEditing}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t('profile.form.genderPlaceholder')}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">{t('gender.male')}</SelectItem>
                          <SelectItem value="female">{t('gender.female')}</SelectItem>
                          <SelectItem value="other">{t('gender.other')}</SelectItem>
                          <SelectItem value="prefer_not_to_say">
                            {t('gender.prefer_not_to_say')}
                          </SelectItem>
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
                        <FormLabel>{t('profile.form.address')}</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value ?? ''}
                            readOnly={!isEditing}
                            placeholder={t('profile.form.addressPlaceholder')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {isEditing && (
                <div className="flex justify-end">
                  <Button type="submit">{t('profile.saveChanges')}</Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
