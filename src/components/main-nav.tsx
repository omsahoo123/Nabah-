'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Stethoscope,
  Calendar,
  Video,
  HeartPulse,
  Pill,
  Users,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from './ui/skeleton';
import { useTranslation } from '@/hooks/use-translation';

export function MainNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { t } = useTranslation();

  const patientMenuItems = [
    {
      href: '/dashboard',
      label: t('dashboard'),
      icon: LayoutDashboard,
      key: 'dashboard',
    },
    {
      href: '/symptom-checker',
      label: t('symptom_checker'),
      icon: Stethoscope,
      key: 'symptom_checker',
    },
    {
      href: '/appointments',
      label: t('appointments'),
      icon: Calendar,
      key: 'appointments',
    },
    {
      href: '/consultations',
      label: t('consultations'),
      icon: Video,
      key: 'consultations',
    },
    {
      href: '/records',
      label: t('health_records'),
      icon: HeartPulse,
      key: 'health_records',
    },
    { href: '/pharmacy', label: t('pharmacy'), icon: Pill, key: 'pharmacy' },
  ];

  const doctorMenuItems = [
    {
      href: '/dashboard',
      label: t('dashboard'),
      icon: LayoutDashboard,
      key: 'dashboard',
    },
    {
      href: '/appointments',
      label: t('appointments'),
      icon: Calendar,
      key: 'appointments',
    },
    {
      href: '/consultations',
      label: t('consultations'),
      icon: Video,
      key: 'consultations',
    },
    { href: '/patients', label: t('patients'), icon: Users, key: 'patients' },
  ];

  if (!user) {
    return (
      <div className="space-y-2 px-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    );
  }

  const menuItems = user.role === 'doctor' ? doctorMenuItems : patientMenuItems;

  const isItemActive = (href: string) => {
    if (href === '/patients') {
      return pathname.startsWith('/patients');
    }
    return pathname === href;
  };

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={isItemActive(item.href)}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
