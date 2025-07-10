import { Skeleton } from "@/components/ui/skeleton";

export function ChatLoading() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Loading */}
      <div className="w-80 border-r border-border bg-sidebar p-4">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Loading */}
      <div className="flex-1 flex flex-col">
        {/* Header Loading */}
        <div className="border-b border-border p-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>

        {/* Messages Loading */}
        <div className="flex-1 p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`flex ${
                i % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <Skeleton className="h-12 w-64 rounded-2xl" />
            </div>
          ))}
        </div>

        {/* Input Loading */}
        <div className="border-t border-border p-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
