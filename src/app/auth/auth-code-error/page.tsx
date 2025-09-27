
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
            <div className="mx-auto bg-destructive/20 text-destructive rounded-full p-3 w-fit">
                <AlertCircle className="h-8 w-8" />
            </div>
          <CardTitle className="text-2xl mt-4">Authentication Error</CardTitle>
          <CardDescription>
            There was a problem authenticating your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The authentication link may have expired or is invalid. Please try signing in or signing up again.
          </p>
          <Button asChild>
            <Link href="/login">Return to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
