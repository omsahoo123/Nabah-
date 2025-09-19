'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  aiSymptomChecker,
  AISymptomCheckerOutput,
} from '@/ai/flows/ai-symptom-checker';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle, Bot, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  symptoms: z.string().min(10, {
    message: 'Please describe your symptoms in at least 10 characters.',
  }),
});

export default function SymptomCheckerPage() {
  const [result, setResult] = useState<AISymptomCheckerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await aiSymptomChecker(values);
      setResult(response);
    } catch (e) {
      setError('An error occurred while checking symptoms. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
          AI Symptom Checker
        </h1>
        <p className="mt-2 text-muted-foreground">
          Describe your symptoms to get preliminary, AI-powered suggestions.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Your Symptoms</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe your symptoms</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I have a persistent cough, a slight fever, and feel very tired."
                        className="resize-none"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      For best results, use full sentences and include all
                      symptoms.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Check Symptoms'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && <LoadingResult />}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {result && <ResultDisplay result={result} />}
    </div>
  );
}

function LoadingResult() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Bot className="h-6 w-6" />
          AI Analysis
        </CardTitle>
        <CardDescription>
          Our AI is analyzing your symptoms. This may take a moment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <br />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
}

function ResultDisplay({ result }: { result: AISymptomCheckerOutput }) {
  const formattedResult = result.potentialCauses
    .split('\n')
    .filter((line) => line.trim() !== '');

  return (
    <Card className="border-primary/50 bg-secondary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Bot className="h-6 w-6" />
          Potential Causes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-foreground/90">
          {formattedResult.map((line, index) => {
            const isListItem =
              line.trim().startsWith('*') || line.trim().startsWith('-');
            const content = isListItem
              ? line.substring(line.indexOf(' ') + 1)
              : line;
            if (isListItem) {
              return (
                <div key={index} className="flex items-start">
                  <span className="mr-2 mt-1 text-primary">&#8226;</span>
                  <span>{content}</span>
                </div>
              );
            }
            return <p key={index}>{content}</p>;
          })}
        </div>
        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bold">Important Disclaimer</AlertTitle>
          <AlertDescription>
            This is not a medical diagnosis. The information provided is for
            informational purposes only and is not a substitute for
            professional medical advice, diagnosis, or treatment. Always seek
            the advice of your physician or other qualified health provider
            with any questions you may have regarding a medical condition.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
