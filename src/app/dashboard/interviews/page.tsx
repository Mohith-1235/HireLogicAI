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

const interviewStatusIcon: { [key: string]: React.ReactNode } = {
    Completed: <CheckCircle className="h-4 w-4 text-green-500" />,
    Scheduled: <Clock className="h-4 w-4 text-blue-500" />,
    Canceled: <XCircle className="h-4 w-4 text-red-500" />,
  };

export default function InterviewsPage() {
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
              selected={new Date()}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className='font-headline'>Today's Schedule</CardTitle>
            <CardDescription>
              Interviews scheduled for {new Date().toLocaleDateString()}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allInterviews
                .filter(
                  (i) => i.date === '2024-08-10' || i.date === '2024-08-12' // Mocking for demo
                )
                .map((interview) => {
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
                        <p className="text-sm font-medium">{interview.time}</p>
                        <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                            {interviewStatusIcon[interview.status]}
                            {interview.status}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
