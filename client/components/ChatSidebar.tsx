import { Search, Plus, Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StatusIndicator } from "@/components/StatusIndicator";
import { ChatRoom } from "./ChatInterface";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  rooms: ChatRoom[];
  selectedRoom: string;
  onRoomSelect: (roomId: string) => void;
  isMobile?: boolean;
}

export function ChatSidebar({
  rooms,
  selectedRoom,
  onRoomSelect,
  isMobile = false,
}: ChatSidebarProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) return "now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return `${Math.floor(diff / 86400000)}d`;
  };

  return (
    <div
      className={cn(
        "border-r border-border bg-sidebar flex flex-col",
        isMobile ? "w-full" : "w-80",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-sidebar-foreground">
            Messages
          </h1>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-sidebar-accent border-sidebar-border"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => onRoomSelect(room.id)}
            className={cn(
              "flex items-center p-4 cursor-pointer hover:bg-sidebar-accent transition-colors border-b border-sidebar-border/50",
              selectedRoom === room.id && "bg-sidebar-accent",
            )}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={room.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                  {room.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <StatusIndicator
                isOnline={room.isOnline}
                className="absolute bottom-0 right-0"
              />
            </div>

            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sidebar-foreground truncate">
                  {room.name}
                </h3>
                <span className="text-xs text-muted-foreground ml-2">
                  {formatTime(room.timestamp)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">
                  {room.lastMessage}
                </p>
                {room.unreadCount && (
                  <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs">
                    {room.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                You
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">
                Your Name
              </p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
