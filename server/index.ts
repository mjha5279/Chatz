import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getMessages, sendMessage, getRooms } from "./routes/chat";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Chat API routes
  app.get("/api/chat/rooms", getRooms);
  app.get("/api/chat/messages/:roomId", getMessages);
  app.post("/api/chat/messages", sendMessage);

  return app;
}
