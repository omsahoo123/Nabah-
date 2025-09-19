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

const patientMenuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/symptom-checker', label: 'Symptom Checker', icon: Stethoscope },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/consultations', label: 'Consultations', icon: Video },
  { href: '/records', label: 'Health Records', icon: HeartPulse },
  { href: '/pharmacy', label: 'Pharmacy', icon: Pill },
];

const doctorMenuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/appointments', label: 'Appointments', icon: Calendar },
    { href: '/consultations', label: 'Consultations', icon: Video },
    { href: '/patients', label: 'Patients', icon: Users },
]

export function MainNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  if (!user) {
    return (
        <div className="space-y-2 px-2">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
        </div>
    )
  }

  const menuItems = user.role === 'doctor' ? doctorMenuItems : patientMenuItems;

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href)}
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
