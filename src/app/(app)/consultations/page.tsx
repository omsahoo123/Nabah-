import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, MicOff, PhoneOff, Video, VideoOff, Languages } from "lucide-react";

export default function ConsultationsPage() {
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
                                    <AvatarImage src="https://picsum.photos/seed/doctor-1/200/200" data-ai-hint="doctor portrait" />
                                    <AvatarFallback>DR</AvatarFallback>
                                </Avatar>
                                <div className="mt-2 text-center text-white bg-black/50 rounded-lg px-2 py-1">
                                    <p className="font-bold">Dr. Emily Carter</p>
                                    <p className="text-sm">Cardiologist</p>
                                </div>
                            </div>

                             <div className="absolute bottom-4 right-4 z-10 h-24 w-40 sm:h-32 sm:w-56 overflow-hidden rounded-lg border-2 border-white/50">
                                 <div className="bg-gray-800 h-full w-full flex items-center justify-center text-xs">
                                     Your Video
                                 </div>
                             </div>
                            
                            <Video className="h-24 w-24 text-gray-600" />
                        </div>
                        <div className="p-6 bg-card">
                            <h2 className="font-headline text-2xl">Consultation Details</h2>
                            <p className="text-muted-foreground mt-1">Upcoming appointment</p>

                            <div className="mt-6 space-y-4">
                               <div className="flex items-start gap-4">
                                   <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Languages className="h-5 w-5"/>
                                   </div>
                                    <div>
                                        <h3 className="font-semibold">Language Selection</h3>
                                        <p className="text-sm text-muted-foreground mb-2">Select your preferred language for the call.</p>
                                        <Select defaultValue="en">
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="hi">Hindi (हिन्दी)</SelectItem>
                                                <SelectItem value="bn">Bengali (বাংলা)</SelectItem>
                                                <SelectItem value="te">Telugu (తెలుగు)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                               </div>

                                <div className="mt-8 space-y-2 text-sm text-muted-foreground">
                                    <p><strong>Note:</strong> Ensure you have a stable internet connection for the best experience. The call quality will adjust based on your bandwidth.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <div className="flex items-center justify-center gap-4 border-t bg-card/50 p-4">
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                        <Mic className="h-6 w-6" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                        <Video className="h-6 w-6" />
                    </Button>
                    <Button variant="destructive" size="icon" className="h-14 w-14 rounded-full">
                        <PhoneOff className="h-7 w-7" />
                    </Button>
                </div>
            </Card>
        </div>
    )
}
