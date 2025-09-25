'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { candidates, type Document, type Candidate } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  Mail,
  Briefcase,
  User,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { DigiLockerDialog } from '@/components/digilocker-dialog';

const stageVariant: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
  Screening: 'default',
  Interview: 'default',
  Offer: 'default',
  Hired: 'secondary',
  Rejected: 'destructive',
};

const documentStatusIcon: { [key: string]: React.ReactNode } = {
  Verified: <ShieldCheck className="h-5 w-5 text-green-500" />,
  Pending: <ShieldAlert className="h-5 w-5 text-yellow-500" />,
  'Not Submitted': <ShieldOff className="h-5 w-5 text-red-500" />,
};

const interviewStatusIcon: { [key: string]: React.ReactNode } = {
  Completed: <CheckCircle className="h-4 w-4 text-green-500" />,
  Scheduled: <Clock className="h-4 w-4 text-blue-500" />,
  Canceled: <XCircle className="h-4 w-4 text-red-500" />,
};

export default function CandidateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const initialCandidate = candidates.find((c) => c.id === params.id);
  const [candidate, setCandidate] = useState<Candidate | undefined>(initialCandidate);
  const [isLockerOpen, setIsLockerOpen] = useState(false);
  const [docToVerify, setDocToVerify] = useState<Document['name'] | null>(null);


  if (!candidate) {
    notFound();
  }

  const handleVerificationRequest = (docName: Document['name']) => {
    setDocToVerify(docName);
    setIsLockerOpen(true);
  };
  
  const handleVerificationComplete = () => {
    if (docToVerify) {
        setCandidate(prev => {
            if (!prev) return;
            const newDocs = prev.documents.map(d => d.name === docToVerify ? {...d, status: 'Pending' as const} : d);
            const docExists = prev.documents.some(d => d.name === docToVerify);
            if (!docExists) {
                newDocs.push({name: docToVerify, status: 'Pending'});
            }
            return {...prev, documents: newDocs};
        });
    }
    setDocToVerify(null);
  };

  const avatarImage = PlaceHolderImages.find(p => p.id === candidate.avatar);

  return (
    <div className="grid gap-6">
      <DigiLockerDialog
        isOpen={isLockerOpen}
        onOpenChange={setIsLockerOpen}
        onVerificationComplete={handleVerificationComplete}
        documentName={docToVerify}
        candidateName={candidate.name}
      />
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-24 w-24 border">
              <AvatarImage src={avatarImage?.imageUrl} alt={candidate.name} data-ai-hint={avatarImage?.imageHint} />
              <AvatarFallback className="text-3xl">
                {candidate.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className='font-headline text-3xl'>{candidate.name}</CardTitle>
              <CardDescription className="mt-1 flex items-center gap-4 text-base">
                <span className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> {candidate.role}
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> {candidate.email}
                </span>
              </CardDescription>
              <div className="mt-4 flex items-center gap-4">
                <Badge variant={stageVariant[candidate.stage] || 'default'} className="text-sm">
                  {candidate.stage}
                </Badge>
                <Button>
                  Start AI Interview <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className='font-headline'>Candidate Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Additional profile information, resume, and skills would be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className='font-headline'>DigiLocker Verification</CardTitle>
              <CardDescription>
                Status of document verification via DigiLocker.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {(['Aadhaar Card', 'PAN Card', 'Driving Licence'] as const).map(docName => {
                const doc = candidate.documents.find(d => d.name === docName) || { name: docName, status: 'Not Submitted' };
                return (
                  <Card key={doc.name}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-base font-medium">
                        {doc.name}
                      </CardTitle>
                      {documentStatusIcon[doc.status]}
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">{doc.status}</div>
                      {doc.status !== 'Verified' && (
                        <Button variant="link" className="p-0 h-auto mt-1" onClick={() => handleVerificationRequest(doc.name)}>
                          Request Verification
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="interviews" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className='font-headline'>Interview History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidate.interviews.map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell className='font-medium'>{interview.type}</TableCell>
                      <TableCell>{interview.date}</TableCell>
                      <TableCell>{interview.time}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {interviewStatusIcon[interview.status]}
                          {interview.status}
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
