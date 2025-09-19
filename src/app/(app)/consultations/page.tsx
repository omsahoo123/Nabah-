'use client';
import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
  Languages,
  Sparkles,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/use-translation';

export default function ConsultationsPage() {
  const router = useRouter();
  const [isMicOn, setIsMicOn] = React.useState(true);
  const [isVidOn, setIsVidOn] = React.useState(true);
  const { t } = useTranslation();

  const handleLeaveCall = () => {
    router.push('/dashboard');
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
          {t('consultation.pageTitle')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t('consultation.pageDescription')}
        </p>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 aspect-video bg-gray-900 text-white flex items-center justify-center relative">
              <div className="absolute top-4 left-4 z-10">
                <Avatar className="h-32 w-32 border-4 border-white/20">
                  <AvatarImage
                    src="https://picsum.photos/seed/doctor-1/200/200"
                    data-ai-hint="doctor portrait"
                  />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div className="mt-2 text-center text-white bg-black/50 rounded-lg px-2 py-1">
                  <p className="font-bold">Dr. Emily Carter</p>
                  <p className="text-sm">Cardiologist</p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 z-10 h-24 w-40 sm:h-32 sm:w-56 overflow-hidden rounded-lg border-2 border-white/50">
                <div className="bg-gray-800 h-full w-full flex items-center justify-center text-xs">
                  {isVidOn
                    ? t('consultation.yourVideo')
                    : t('consultation.videoOff')}
                </div>
              </div>

              <Video className="h-24 w-24 text-gray-600" />
            </div>
            <div className="p-6 bg-card">
              <h2 className="font-headline text-2xl">
                {t('consultation.consultationDetailsTitle')}
              </h2>
              <p className="text-muted-foreground mt-1">
                {t('consultation.consultationDetailsDescription')}
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Languages className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {t('consultation.languageSelectionTitle')}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t('consultation.languageSelectionDescription')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('consultation.languageChangeHint')}
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>{t('consultation.noteTitle')}</strong>{' '}
                    {t('consultation.noteDescription')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="flex items-center justify-center gap-4 border-t bg-card/50 p-4">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => setIsMicOn(!isMicOn)}
          >
            {isMicOn ? (
              <Mic className="h-6 w-6" />
            ) : (
              <MicOff className="h-6 w-6" />
            )}
            <span className="sr-only">
              {isMicOn
                ? t('consultation.muteMic')
                : t('consultation.unmuteMic')}
            </span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={() => setIsVidOn(!isVidOn)}
          >
            {isVidOn ? (
              <Video className="h-6 w-6" />
            ) : (
              <VideoOff className="h-6 w-6" />
            )}
            <span className="sr-only">
              {isVidOn
                ? t('consultation.turnOffVideo')
                : t('consultation.turnOnVideo')}
            </span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" className="h-14 w-14 rounded-full">
                <PhoneOff className="h-7 w-7" />
                <span className="sr-only">{t('consultation.leaveCall')}</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t('consultation.leaveCallTitle')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t('consultation.leaveCallDescription')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {t('consultation.leaveCallStay')}
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleLeaveCall}>
                  {t('consultation.leaveCallLeave')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
    </div>
  );
}
