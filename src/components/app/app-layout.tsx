
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { Settings, LogOut, MessageSquare, Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from "@/lib/supabase/client";


function UserMenu({ user }: { user: User }) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const getInitials = (email: string | null | undefined) => {
    if (!email) return '?';
    const name = user?.user_metadata?.name;
    if (name) {
        const parts = name.split(' ');
        if (parts.length > 1) {
            return parts[0][0] + parts[parts.length - 1][0];
        }
        return name.charAt(0).toUpperCase();
    }
    return email.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.user_metadata?.avatar_url || ''} alt={user.email || ''} />
            <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.user_metadata?.name || 'User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


function MainSidebar({user}: {user: User}) {
  return (
     <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton isActive>
                    <Bot />
                    New Chat
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton>
                    <MessageSquare />
                    History
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <UserMenu user={user}/>
        </SidebarFooter>
      </Sidebar>
  )
}

function Header({user}: {user: User}) {
    const { isMobile } = useSidebar();
    return (
        <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center max-w-full px-4">
                 {isMobile && <SidebarTrigger className="mr-4" />}
                <div className="flex-1">
                    <p className="font-semibold">Forest AI</p>
                </div>
                 {isMobile ? <UserMenu user={user} /> : null}
            </div>
        </header>
    )
}

export function AppLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  return (
    <SidebarProvider>
        <MainSidebar user={user}/>
        <SidebarInset>
            <div className="flex flex-col h-screen">
              <Header user={user}/>
              <main className="flex-1 flex flex-col overflow-hidden">
                {children}
              </main>
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
