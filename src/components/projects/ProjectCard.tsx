import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(project)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(project.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Location:</span> {project.location}
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">ERF Number:</span> {project.erfNumber}
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Property Extent:</span>{" "}
            {project.propertyExtent} m²
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Zoning:</span> {project.zoning}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex flex-col items-start gap-1">
        <span>Updated {formatDistanceToNow(new Date(project.updatedAt))} ago</span>
        <span>Created {formatDistanceToNow(new Date(project.createdAt))} ago</span>
      </CardFooter>
    </Card>
  );
}