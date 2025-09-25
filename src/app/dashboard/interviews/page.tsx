
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { allInterviews, candidates } from '@/lib/data';
import { PlusCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useMemo, useState } from 'react';

const interviewStatusIcon: { [key: string]: React.ReactNode } = {
  Completed: <CheckCircle className="h-4 w-4 text-green-500" />,
  Scheduled: <Clock className="h-4 w-4 text-blue-500" />,
  Canceled: <XCircle className="h-4 w-4 text-red-500" />,
};

export default function InterviewsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const upcomingInterviews = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight to compare dates correctly

    return allInterviews
      .filter(
        (interview) =>
          interview.status === 'Scheduled' && new Date(interview.date) >= today
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className='font-headline'>Interview Schedule</CardTitle>
              <CardDescription>
                View and manage all scheduled interviews.
              </CardDescription>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className='font-headline'>Interviews to Attend</CardTitle>
            <CardDescription>
              All your upcoming scheduled interviews.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.length > 0 ? (
                upcomingInterviews.map((interview) => {
                  const candidate = candidates.find(
                    (c) => c.id === interview.candidateId
                  );
                  if (!candidate) return null;
                  const avatarImage = PlaceHolderImages.find(p => p.id === candidate.avatar);
                  return (
                    <div
                      key={interview.id}
                      className="flex items-center gap-4"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={avatarImage?.imageUrl} alt={candidate.name} data-ai-hint={avatarImage?.imageHint} />
                        <AvatarFallback>{candidate.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">{interview.type}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-medium">{new Date(interview.date).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">{interview.time}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No upcoming interviews.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
