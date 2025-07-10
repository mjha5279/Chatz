import { MessageSquare, Users, Shield, Zap } from "lucide-react";

export function ChatWelcome() {
  const features = [
    {
      icon: MessageSquare,
      title: "Real-time messaging",
      description: "Send and receive messages instantly",
    },
    {
      icon: Users,
      title: "Team collaboration",
      description: "Chat with your team and stay connected",
    },
    {
      icon: Shield,
      title: "Secure & private",
      description: "Your conversations are encrypted and safe",
    },
    {
      icon: Zap,
      title: "Fast & reliable",
      description: "Built for speed and reliability",
    },
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-muted/20">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Welcome to Chat
          </h1>
          <p className="text-lg text-muted-foreground">
            Start a conversation by selecting a chat from the sidebar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start space-x-3 text-left"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
