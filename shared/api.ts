/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  roomId: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unreadCount?: number;
  avatar?: string;
}

export interface GetMessagesResponse {
  messages: ChatMessage[];
}

export interface SendMessageRequest {
  content: string;
  sender: string;
  roomId: string;
}

export interface SendMessageResponse {
  message: ChatMessage;
}

export interface GetRoomsResponse {
  rooms: ChatRoom[];
}
