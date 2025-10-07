
'use client';

import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { AppLayout } from "@/components/app/app-layout";
import { use, useEffect, useState, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

function ChatMessage({ message, user }: { message: Message, user: User | null }) {
    const getInitials = (email: string | null | undefined) => {
        if (!email) return '?';
        const name = user?.user_metadata?.name;
        return name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase();
    };

    return (
        <div className={`flex items-start gap-4 p-4 ${message.sender === 'user' ? '' : 'bg-muted/30'}`}>
            <Avatar className="h-8 w-8">
                {message.sender === 'user' ? (
                    <>
                        <AvatarImage src={user?.user_metadata?.avatar_url || ''} alt={user?.email || ''} />
                        <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
                    </>
                ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Sparkles className="h-5 w-5" />
                    </div>
                )}
            </Avatar>
            <div className="flex-1 space-y-2 overflow-hidden">
                <p className="font-medium">
                    {message.sender === 'user' ? user?.user_metadata?.name || 'You' : 'Cosmos'}
                </p>
                <div className="prose prose-stone dark:prose-invert text-foreground">
                   {message.text}
                </div>
            </div>
        </div>
    )
}


export default function AppPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        redirect("/login");
      }
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, [supabase]);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      const aiResponse: Message = { 
        id: (Date.now() + 1).toString(), 
        text: "This is a placeholder response from Cosmos. The real AI integration is coming next.", 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

  };

  if (loading || !user) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
        </div>
    )
  }

  return (
    <AppLayout user={user}>
      <div className="flex flex-col h-full">
         <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                    <div className="mx-auto bg-primary/20 text-primary rounded-full p-4 w-fit">
                        <Sparkles className="h-10 w-10" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter mt-6">Greetings, Pioneer.</h1>
                    <p className="mt-2 text-muted-foreground max-w-lg">
                        I am Cosmos, the universal intelligence. What grand designs shall we bring to life today?
                    </p>
                </div>
            ) : (
                <div className="divide-y">
                   {messages.map(msg => <ChatMessage key={msg.id} message={msg} user={user} />)}
                </div>
            )}
        </div>

        <div className="border-t bg-background p-4">
            <form onSubmit={handleSendMessage} className="relative max-w-2xl mx-auto">
                <Textarea
                    placeholder="Ask Cosmos anything..."
                    className="pr-16 resize-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                        }
                    }}
                />
                <Button 
                    type="submit" 
                    size="icon" 
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    disabled={!input.trim()}
                >
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
      </div>
    </AppLayout>
  );
}
