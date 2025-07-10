import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  isTyping: boolean;
  username?: string;
}

export function TypingIndicator({
  isTyping,
  username = "Someone",
}: TypingIndicatorProps) {
  if (!isTyping) return null;

  return (
    <div className="flex items-center space-x-2 px-4 py-2 text-sm text-muted-foreground">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
      </div>
      <span>{username} is typing...</span>
    </div>
  );
}
