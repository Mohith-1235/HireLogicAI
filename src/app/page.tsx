'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bot,
  FileCheck,
  User,
  Calendar,
  BarChart,
  ClipboardList,
  ArrowRight,
} from 'lucide-react';
import { Icons } from '@/components/icons';
import { CandidateApplicationForm } from '@/components/candidate-application-form';

const features: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}[] = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI Interviewer',
    description:
      'Conduct structured screening interviews using AI, asking predefined questions and evaluating candidate responses.',
  },
  {
    icon: <FileCheck className="h-8 w-8 text-primary" />,
    title: 'DigiLocker Integration',
    description:
      'Verify candidate certificates and documents securely through DigiLocker with official consent flows.',
    href: 'https://www.digilocker.gov.in/web/data-exchange',
  },
  {
    icon: <User className="h-8 w-8 text-primary" />,
    title: 'Candidate Profile Management',
    description:
      'Store and manage candidate profiles, interview history, and verified documents in one place.',
  },
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: 'Interview Scheduling',
    description:
      'Allow recruiters to schedule interviews and send automated invitations to candidates.',
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Interview Analysis',
    description:
      'Gain insights with analytics on interview performance, candidate rankings, and hiring trends.',
  },
  {
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
    title: 'Custom Questionnaires',
    description:
      'Enable recruiters to create custom interview questionnaires with the help of AI.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight font-headline">
              HireLogic AI
            </span>
          </Link>
          <Button asChild>
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 font-headline">
              The Future of Recruitment is Here
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              HireLogic AI streamlines your hiring process with an AI-powered
              interviewer, seamless document verification, and insightful
              analytics.
            </p>
            <Button size="lg" asChild>
              <Link href="#apply-now">
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="apply-now" className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Apply to Join Our Talent Pool
              </h2>
              <p className="max-w-xl mx-auto text-muted-foreground mt-2">
                Interested in future opportunities? Submit your details below and we'll reach out when a matching role opens up.
              </p>
            </div>
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <CandidateApplicationForm />
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="features" className="py-20 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Powerful Features for Modern Recruiters
              </h2>
              <p className="max-w-xl mx-auto text-muted-foreground mt-2">
                Everything you need to find, screen, and hire the best talent,
                faster.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => {
                const card = (
                  <Card
                    key={feature.title}
                    className="bg-card hover:shadow-lg transition-shadow h-full"
                  >
                    <CardHeader className="flex flex-row items-center gap-4 pb-4">
                      {feature.icon}
                      <CardTitle className="font-headline">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );

                if (feature.href) {
                  return (
                    <Link href={feature.href} target="_blank" rel="noopener noreferrer" key={feature.title}>
                      {card}
                    </Link>
                  );
                }

                return card;
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HireLogic AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
