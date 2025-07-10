import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-muted rounded-full">
            <MessageSquare className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-4">
          Chat Not Found
        </h1>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          The chat room you're looking for doesn't exist or has been moved.
          Let's get you back to your conversations.
        </p>

        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Chat
          </Link>
        </Button>
      </div>
    </div>
  );
}
