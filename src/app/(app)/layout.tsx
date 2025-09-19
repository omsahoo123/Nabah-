import { Header } from '@/components/header';
import { Icons } from '@/components/icons';
import { MainNav } from '@/components/main-nav';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
} from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <Icons.logo className="h-8 w-8 shrink-0 text-primary" />
            <h1 className="font-headline text-2xl font-semibold group-data-[collapsible=icon]:hidden">
              Nabha
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <MainNav />
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-col md:ml-[var(--sidebar-width-icon)] group-data-[state=expanded]/sidebar-wrapper:md:ml-[var(--sidebar-width)] transition-[margin-left] duration-300 ease-in-out">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </div>
    </>
  );
}
