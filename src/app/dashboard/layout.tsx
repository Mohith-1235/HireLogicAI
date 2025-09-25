
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardList,
  LogOut,
  ChevronDown,
  User,
} from 'lucide-react';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/candidates', icon: Users, label: 'Candidates' },
  { href: '/dashboard/interviews', icon: Calendar, label: 'Interviews' },
  {
    href: '/dashboard/questionnaires',
    icon: ClipboardList,
    label: 'Questionnaires',
  },
];

function UserNav() {
  const { isMobile, state } = useSidebar();
  const avatarImage = PlaceHolderImages.find(img => img.id === 'candidate-4');
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/login');
  };

  if (isUserLoading) {
    return <Skeleton className="h-10 w-full" />;
  }

  if (isMobile || state === 'collapsed') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.photoURL || avatarImage?.imageUrl} alt={user?.displayName || "Recruiter"} data-ai-hint={avatarImage?.imageHint} />
              <AvatarFallback>{user?.displayName?.slice(0, 2) || 'JD'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.displayName || 'Jane Doe'}</p>
              <p className="text-xs leading-none text-muted-foreground dark:text-white">
                {user?.email || 'recruiter@hirelogic.ai'}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-left h-auto px-2"
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.photoURL || avatarImage?.imageUrl} alt={user?.displayName || 'Recruiter'} data-ai-hint={avatarImage?.imageHint}/>
              <AvatarFallback>{user?.displayName?.slice(0, 2) || 'JD'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium leading-tight truncate">{user?.displayName || 'Jane Doe'}</p>
              <p className="text-xs text-muted-foreground dark:text-white truncate">
                {user?.email || 'recruiter@hirelogic.ai'}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.displayName || 'Jane Doe'}</p>
            <p className="text-xs leading-none text-muted-foreground dark:text-white">
              {user?.email || 'recruiter@hirelogic.ai'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (isClient && !isUserLoading && !user) {
      router.push('/login');
    }
  }, [isClient, isUserLoading, user, router]);


  const getPageTitle = () => {
    if (pathname === '/dashboard/profile') {
      return 'Recruiter Profile';
    }
    const navItem = navItems.find((item) => pathname.startsWith(item.href));
    if (navItem) return navItem.label;
    if (pathname.startsWith('/dashboard/candidates/')) {
      return 'Candidate Details';
    }
    return 'Dashboard';
  }

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 w-full p-1">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="h-8 w-8 text-sidebar-primary" />
              <span className="font-bold text-lg text-sidebar-foreground font-headline text-white">
                HireLogic AI
              </span>
            </Link>
          </div>
        </SidebarHeader>
        {isClient ? (
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard">
                <SidebarMenuButton isActive={pathname === '/dashboard'} tooltip={{ children: 'Dashboard' }}>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/candidates">
                <SidebarMenuButton isActive={pathname.startsWith('/dashboard/candidates')} tooltip={{ children: 'Candidates' }}>
                  <Users />
                  <span>Candidates</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/interviews">
                <SidebarMenuButton isActive={pathname.startsWith('/dashboard/interviews')} tooltip={{ children: 'Interviews' }}>
                  <Calendar />
                  <span>Interviews</span>
                </SidebarMenuButton>
              </Link>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <Link href="/dashboard/interviews" passHref legacyBehavior>
                    <SidebarMenuSubButton isActive={pathname === '/dashboard/interviews'}>
                      Interviews to Attend
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/dashboard/questionnaires">
                <SidebarMenuButton isActive={pathname.startsWith('/dashboard/questionnaires')} tooltip={{ children: 'Questionnaires' }}>
                  <ClipboardList />
                  <span>Questionnaires</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        ) : (
          <div className="p-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 p-2">
                <div className="h-8 w-8 bg-gray-300 rounded-md animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-auto p-2 border-t border-sidebar-border">
          <UserNav />
        </div>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-black text-white px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold font-headline">
              {getPageTitle()}
            </h1>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
