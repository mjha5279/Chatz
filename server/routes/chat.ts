import { RequestHandler } from "express";

export interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  roomId: string;
}

// In-memory storage for demo purposes
// In production, this would be a database
let messages: ChatMessage[] = [
  {
    id: "1",
    content: "Hey! How was your day?",
    sender: "Sarah Chen",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    roomId: "1",
  },
  {
    id: "2",
    content: "Pretty good! Just finished up a big project. How about you?",
    sender: "You",
    timestamp: new Date(Date.now() - 3300000).toISOString(),
    roomId: "1",
  },
];

export const getMessages: RequestHandler = (req, res) => {
  const { roomId } = req.params;

  if (!roomId) {
    return res.status(400).json({ error: "Room ID is required" });
  }

  const roomMessages = messages.filter((msg) => msg.roomId === roomId);
  res.json({ messages: roomMessages });
};

export const sendMessage: RequestHandler = (req, res) => {
  const { content, sender, roomId } = req.body;

  if (!content || !sender || !roomId) {
    return res.status(400).json({
      error: "Content, sender, and room ID are required",
    });
  }

  const newMessage: ChatMessage = {
    id: Date.now().toString(),
    content,
    sender,
    timestamp: new Date().toISOString(),
    roomId,
  };

  messages.push(newMessage);

  // In a real app, this would broadcast to all connected clients
  res.json({ message: newMessage });
};

export const getRooms: RequestHandler = (req, res) => {
  // Mock room data
  const rooms = [
    {
      id: "1",
      name: "Sarah Chen",
      lastMessage: "Hey! How was your day?",
      timestamp: new Date().toISOString(),
      isOnline: true,
      unreadCount: 2,
    },
    {
      id: "2",
      name: "Design Team",
      lastMessage: "The new mockups look great!",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isOnline: false,
      unreadCount: 5,
    },
  ];

  res.json({ rooms });
};
