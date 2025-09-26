import { submitStory } from '@/lib/actions';
import { getCategories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Feather } from 'lucide-react';

export default function SubmitPage() {
  const categories = getCategories();

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <Card className="w-full">
        <form action={submitStory}>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Feather className="w-8 h-8 text-primary-foreground bg-primary/80 rounded-full p-1.5" />
              <CardTitle className="text-3xl font-bold tracking-tight">
                Share Your Whisper
              </CardTitle>
            </div>
            <CardDescription>
              Your story will be shared anonymously. Be honest, be respectful.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title (Optional)</Label>
              <Input
                id="title"
                name="title"
                placeholder="Give your story a title..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Your Story</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Pour your heart out..."
                className="min-h-[200px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue={categories[0].id} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="capitalize"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit Anonymously
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}