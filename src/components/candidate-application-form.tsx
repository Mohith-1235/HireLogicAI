'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader, Send } from 'lucide-react';
import { useState, useEffect } from 'react';

const applicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  role: z.string().min(3, 'Role must be at least 3 characters.'),
  highestEducation: z.string().min(2, 'Highest education must be at least 2 characters.'),
  skills: z.string().min(2, 'Skills must be at least 2 characters.'),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export function CandidateApplicationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      highestEducation: '',
      skills: '',
    },
  });

  const onSubmit: SubmitHandler<ApplicationFormValues> = (data) => {
    setIsSubmitting(true);
    console.log(data);

    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        toast({
            title: 'Application Submitted!',
            description: "We've received your information and will be in touch.",
        });
        form.reset();
    }, 1500);
  };

  if (!isClient) {
    return null; // or a loading skeleton
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="e.g. jane.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desired Role</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Senior Frontend Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="highestEducation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Highest Education</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Bachelor's in Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Input placeholder="e.g. React, TypeScript, Node.js" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
                <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                </>
            ) : (
                <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Application
                </>
            )}
        </Button>
      </form>
    </Form>
  );
}
