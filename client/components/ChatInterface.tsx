import { useState, useRef, useEffect } from "react";
import {
  Send,
  Smile,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatSidebar } from "./ChatSidebar";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  avatar?: string;
  isOnline: boolean;
  unreadCount?: number;
}

export function ChatInterface() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("1");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (mobile) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sampleRooms: ChatRoom[] = [
    {
      id: "1",
      name: "Sarah Chen",
      lastMessage: "Hey! How was your day?",
      timestamp: new Date(),
      isOnline: true,
      unreadCount: 2,
    },
    {
      id: "2",
      name: "Design Team",
      lastMessage: "The new mockups look great!",
      timestamp: new Date(Date.now() - 3600000),
      isOnline: false,
      unreadCount: 5,
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      lastMessage: "Thanks for the feedback",
      timestamp: new Date(Date.now() - 7200000),
      isOnline: true,
    },
    {
      id: "4",
      name: "Marketing Team",
      lastMessage: "Campaign launches tomorrow",
      timestamp: new Date(Date.now() - 86400000),
      isOnline: false,
      unreadCount: 1,
    },
  ];

  const [messages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey! How was your day?",
      sender: "Sarah Chen",
      timestamp: new Date(Date.now() - 3600000),
      isCurrentUser: false,
    },
    {
      id: "2",
      content: "Pretty good! Just finished up a big project. How about you?",
      sender: "You",
      timestamp: new Date(Date.now() - 3300000),
      isCurrentUser: true,
    },
    {
      id: "3",
      content: "That's awesome! I'm excited to hear about it",
      sender: "Sarah Chen",
      timestamp: new Date(Date.now() - 3000000),
      isCurrentUser: false,
    },
    {
      id: "4",
      content:
        "Working on some new designs for the chat app. Want to see a preview?",
      sender: "You",
      timestamp: new Date(Date.now() - 2700000),
      isCurrentUser: true,
    },
    {
      id: "5",
      content: "Absolutely! I love seeing your work",
      sender: "Sarah Chen",
      timestamp: new Date(Date.now() - 1800000),
      isCurrentUser: false,
    },
  ]);

  const selectedRoomData = sampleRooms.find((room) => room.id === selectedRoom);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (currentMessage.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [currentMessage]);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", currentMessage);
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
    if (isMobileView) {
      setShowSidebar(false);
    }
  };

  const handleBackToSidebar = () => {
    if (isMobileView) {
      setShowSidebar(true);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      {(!isMobileView || showSidebar) && (
        <ChatSidebar
          rooms={sampleRooms}
          selectedRoom={selectedRoom}
          onRoomSelect={handleRoomSelect}
          isMobile={isMobileView}
        />
      )}

      {/* Main Chat Area */}
      {(!isMobileView || !showSidebar) && (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="border-b border-border p-4 bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isMobileView && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBackToSidebar}
                    className="h-8 w-8"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedRoomData?.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedRoomData?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-foreground">
                    {selectedRoomData?.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedRoomData?.isOnline
                      ? "Online"
                      : "Last seen 2 hours ago"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <TypingIndicator
              isTyping={Math.random() > 0.7}
              username={selectedRoomData?.name}
            />
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-border p-4 bg-card">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a message..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-12 bg-chat-input text-chat-input-foreground border-border"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
