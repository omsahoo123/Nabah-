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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
  Languages,
  Check,
  Sparkles,
  CameraOff,
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
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function ConsultationsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  const [isMicOn, setIsMicOn] = React.useState(true);
  const [isVidOn, setIsVidOn] = React.useState(true);
  const [language, setLanguage] = React.useState('en');
  const [hasCameraPermission, setHasCameraPermission] = React.useState<
    boolean | null
  >(null);

  React.useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        streamRef.current = stream;
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description:
            'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();

    return () => {
      // Cleanup: stop media tracks when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [toast]);

  const handleLeaveCall = () => {
    router.push('/dashboard');
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVidOn;
        setIsVidOn(!isVidOn);
      }
    }
  };
  
  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
        setIsMicOn(!isMicOn);
      }
    }
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
          Video Consultation
        </h1>
        <p className="mt-2 text-muted-foreground">
          Connect with your doctor face-to-face.
        </p>
      </div>

      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 aspect-video bg-gray-900 text-white flex items-center justify-center relative">
              <div className="absolute top-4 left-4 z-10">
                <Avatar className="h-32 w-32 border-4 border-white/20">
                  <AvatarImage
                    src="https://picsum.photos/seed/doctor-placeholder/200/200"
                    data-ai-hint="doctor portrait"
                  />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div className="mt-2 text-center text-white bg-black/50 rounded-lg px-2 py-1">
                  <p className="font-bold">Doctor's Video</p>
                  <p className="text-sm">Specialty</p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 z-10 h-24 w-40 sm:h-32 sm:w-56 overflow-hidden rounded-lg border-2 border-white/50 bg-black">
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted />
                 {!isVidOn && hasCameraPermission && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white">
                        <VideoOff className="h-8 w-8" />
                        <p className="text-sm mt-2">Camera is Off</p>
                    </div>
                )}
              </div>
              <Video className="h-24 w-24 text-gray-600" />
            </div>
            <div className="p-6 bg-card">
              <h2 className="font-headline text-2xl">
                Consultation Details
              </h2>
              <p className="text-muted-foreground mt-1">
                Upcoming appointment
              </p>

              <div className="mt-6 space-y-4">
                 {hasCameraPermission === false && (
                    <Alert variant="destructive">
                        <CameraOff className="h-4 w-4" />
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera access to use this feature. You may need to refresh the page and grant permission.
                        </AlertDescription>
                    </Alert>
                )}
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Languages className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Language Selection</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Select your preferred language for the call.
                    </p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          {language === 'en'
                            ? 'English'
                            : language === 'hi'
                            ? 'Hindi (हिन्दी)'
                            : 'Punjabi (ਪੰਜਾਬੀ)'}
                          <Languages className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuItem onClick={() => setLanguage('en')}>
                          English{' '}
                          {language === 'en' && <Check className="ml-auto h-4 w-4" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage('hi')}>
                          Hindi (हिन्दी)
                          {language === 'hi' && <Check className="ml-auto h-4 w-4" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage('pa')}>
                          Punjabi (ਪੰਜਾਬੀ)
                          {language === 'pa' && <Check className="ml-auto h-4 w-4" />}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Live Translation</h3>
                    <p className="text-sm text-muted-foreground">
                      The consultation will be translated in real-time.
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>Note:</strong> Ensure you have a stable internet
                    connection for the best experience. The call quality will
                    adjust based on your bandwidth.
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
            onClick={toggleMic}
            disabled={!hasCameraPermission}
          >
            {isMicOn ? (
              <Mic className="h-6 w-6" />
            ) : (
              <MicOff className="h-6 w-6" />
            )}
            <span className="sr-only">
              {isMicOn ? 'Mute microphone' : 'Unmute microphone'}
            </span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={toggleVideo}
            disabled={!hasCameraPermission}
          >
            {isVidOn ? (
              <Video className="h-6 w-6" />
            ) : (
              <VideoOff className="h-6 w-6" />
            )}
            <span className="sr-only">
              {isVidOn ? 'Turn off video' : 'Turn on video'}
            </span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" className="h-14 w-14 rounded-full">
                <PhoneOff className="h-7 w-7" />
                <span className="sr-only">Leave call</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to leave?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will end the video consultation. You will be returned to
                  your dashboard.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Stay in Call</AlertDialogCancel>
                <AlertDialogAction onClick={handleLeaveCall}>
                  Leave Call
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
    </div>
  );
}
