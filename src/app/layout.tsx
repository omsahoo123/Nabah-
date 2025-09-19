import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AuthProvider } from '@/hooks/use-auth';
import { TranslationProvider } from '@/hooks/use-translation';

export const metadata: Metadata = {
  title: 'Nabha Telehealth Access',
  description: 'Your partner in accessible healthcare.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <TranslationProvider>
            <SidebarProvider>
              {children}
              <Toaster />
            </SidebarProvider>
          </TranslationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
