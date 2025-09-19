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
  Store,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from './ui/skeleton';

export function MainNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const patientMenuItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      key: 'dashboard',
    },
    {
      href: '/symptom-checker',
      label: 'Symptom Checker',
      icon: Stethoscope,
      key: 'symptom_checker',
    },
    {
      href: '/appointments',
      label: 'Appointments',
      icon: Calendar,
      key: 'appointments',
    },
    {
      href: '/consultations',
      label: 'Consultations',
      icon: Video,
      key: 'consultations',
    },
    {
      href: '/records',
      label: 'Health Records',
      icon: HeartPulse,
      key: 'health_records',
    },
    { href: '/pharmacy', label: 'Pharmacy', icon: Pill, key: 'pharmacy' },
  ];

  const doctorMenuItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      key: 'dashboard',
    },
    {
      href: '/appointments',
      label: 'Appointments',
      icon: Calendar,
      key: 'appointments',
    },
    {
      href: '/consultations',
      label: 'Consultations',
      icon: Video,
      key: 'consultations',
    },
    { href: '/patients', label: 'Patients', icon: Users, key: 'patients' },
  ];
  
  const pharmacyMenuItems = [
     {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      key: 'dashboard',
    },
    {
      href: '/manage-pharmacy',
      label: 'Manage Pharmacy',
      icon: Store,
      key: 'manage_pharmacy',
    },
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

  const getMenuItems = () => {
    switch (user?.role) {
      case 'doctor':
        return doctorMenuItems;
      case 'pharmacy':
        return pharmacyMenuItems;
      default:
        return patientMenuItems;
    }
  }

  const menuItems = getMenuItems();

  const isItemActive = (href: string) => {
    // For nested routes, we want to match the base path.
    if (href.length > 1) {
      return pathname.startsWith(href);
    }
    // For the dashboard, we want an exact match.
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
