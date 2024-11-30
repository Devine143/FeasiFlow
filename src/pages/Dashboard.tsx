import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { Project } from "@/types/project";

export function Dashboard() {
  const navigate = useNavigate();
  const { projects, deleteProject } = useProjects();
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  console.log('Dashboard rendering with projects:', projects);

  useEffect(() => {
    console.log('Projects updated in Dashboard:', projects);
  }, [projects]);

  const handleEdit = (project: Project) => {
    navigate(`/edit-project/${project.id}`);
  };

  const handleDelete = (projectId: string) => {
    setProjectToDelete(projectId);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage your property development projects
          </p>
        </div>
        <Button onClick={() => navigate("/new-project")} className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}