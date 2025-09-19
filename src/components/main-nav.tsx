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
} from 'lucide-react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/symptom-checker', label: 'Symptom Checker', icon: Stethoscope },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/consultations', label: 'Consultations', icon: Video },
  { href: '/records', label: 'Health Records', icon: HeartPulse },
  { href: '/pharmacy', label: 'Pharmacy', icon: Pill },
];

export function MainNav() {
  const pathname = usePathname();

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
