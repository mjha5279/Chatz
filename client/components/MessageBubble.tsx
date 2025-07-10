import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "./ChatInterface";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className={cn(
        "flex items-end space-x-2 max-w-[70%]",
        message.isCurrentUser ? "ml-auto flex-row-reverse space-x-reverse" : "",
      )}
    >
      {!message.isCurrentUser && (
        <Avatar className="h-8 w-8 mb-1">
          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
            {message.sender
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "rounded-2xl px-4 py-2 max-w-full break-words",
          message.isCurrentUser
            ? "bg-chat-bubble-user text-chat-bubble-user-foreground rounded-br-md"
            : "bg-chat-bubble-other text-chat-bubble-other-foreground border border-border rounded-bl-md",
        )}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p
          className={cn(
            "text-xs mt-1 opacity-70",
            message.isCurrentUser
              ? "text-chat-bubble-user-foreground"
              : "text-muted-foreground",
          )}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
