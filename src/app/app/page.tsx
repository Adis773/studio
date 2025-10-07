
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppLayout } from "@/components/app/app-layout";

export default async function AppPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <AppLayout user={user}>
      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold tracking-tighter">Welcome to Cosmos</h1>
        <p className="mt-4 text-muted-foreground max-w-lg">
          This is your new canvas. From here, we will build the most powerful AI in the universe. What should we create first?
        </p>
      </div>
    </AppLayout>
  );
}
