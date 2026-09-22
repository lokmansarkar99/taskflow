import fetcher from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, MoreHorizontal, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 1. Define the shape of your data
type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

type TodoResponse = {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
};

export default async function TaskPage() {
  // 2. Fetch the data with the correct type
  const taskData = await fetcher<TodoResponse>("todos?limit=10");

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen bg-background">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage and track your ongoing tasks.
          </p>
        </div>
        <Button className="rounded-full shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {taskData.todos.map((task) => (
          <Card 
            key={task.id} 
            className={`transition-all hover:shadow-sm border-border/40 ${
              task.completed ? "bg-muted/30" : "bg-card"
            }`}
          >
            <CardContent className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4 flex-1">
                
                {/* Status Icon */}
                <button className="mt-0.5 sm:mt-0 flex-shrink-0 text-muted-foreground hover:text-primary transition-colors">
                  {task.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  ) : (
                    <Circle className="h-6 w-6" />
                  )}
                </button>

                {/* Task Content */}
                <div className="flex flex-col gap-1.5">
                  <span className={`text-base font-medium leading-snug ${
                    task.completed ? "line-through text-muted-foreground" : "text-foreground"
                  }`}>
                    {task.todo}
                  </span>
                  
                  {/* Meta info (Badges & User ID) */}
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge 
                      variant={task.completed ? "secondary" : "default"} 
                      className="text-[10px] uppercase font-bold tracking-wider"
                    >
                      {task.completed ? "Done" : "In Progress"}
                    </Badge>
                    <span className="text-xs font-medium text-muted-foreground">
                      User #{task.userId}
                    </span>
                    <span className="text-xs text-muted-foreground/50 hidden sm:inline-block">•</span>
                    <span className="text-xs text-muted-foreground hidden sm:inline-block">
                      Task ID: {task.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem>Edit task</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                    Delete task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
