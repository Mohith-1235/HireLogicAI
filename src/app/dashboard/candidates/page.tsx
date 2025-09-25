import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { candidates } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

const stageVariant: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
  Screening: 'outline',
  Interview: 'default',
  Offer: 'default',
  Hired: 'secondary',
  Rejected: 'destructive',
};

export default function CandidatesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-headline'>Candidates</CardTitle>
        <CardDescription>
          Manage and track all candidates in your hiring pipeline.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => {
              const avatarImage = PlaceHolderImages.find(p => p.id === candidate.avatar);
              return (
              <TableRow key={candidate.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={avatarImage?.imageUrl} alt={candidate.name} data-ai-hint={avatarImage?.imageHint} />
                      <AvatarFallback>{candidate.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">
                      <p>{candidate.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{candidate.role}</TableCell>
                <TableCell>
                  <Badge variant={stageVariant[candidate.stage] || 'default'}>
                    {candidate.stage}
                  </Badge>
                </TableCell>
                <TableCell>{candidate.lastActivity}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/candidates/${candidate.id}`}>
                          View Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Start Interview</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
