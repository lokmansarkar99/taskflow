import { Skeleton } from "@/components/ui/skeleton";

const taskRows = ["w-3/4", "w-5/6", "w-2/3", "w-4/5"];

export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading TaskFlow"
      className="min-h-screen bg-background px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-9 w-48 sm:h-10 sm:w-64" />
            <Skeleton className="h-4 w-64 sm:w-80" />
          </div>
          <Skeleton className="h-10 w-full rounded-full sm:w-32" />
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["first", "second", "third", "fourth"].map((item) => (
            <div key={item} className="rounded-xl border border-border/60 bg-card p-4">
              <Skeleton className="mb-3 h-3 w-16" />
              <Skeleton className="h-7 w-12" />
            </div>
          ))}
        </div>

        <div className="space-y-3" role="status">
          {taskRows.map((width) => (
            <div
              key={width}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 sm:gap-4 sm:p-5"
            >
              <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className={`h-4 max-w-full ${width}`} />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            </div>
          ))}
          <span className="sr-only">Loading your tasks...</span>
        </div>
      </div>
    </main>
  );
}