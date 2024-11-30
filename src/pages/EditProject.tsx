import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
import { Project } from '@/types/project';
import { NewProject } from './NewProject';
import { toast } from 'sonner';

export function EditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, updateProject } = useProjects();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const foundProject = projects.find(p => p.id === id);
    if (!foundProject) {
      toast.error('Project not found');
      navigate('/');
      return;
    }
    setProject(foundProject);
  }, [id, projects, navigate]);

  if (!project) {
    return null;
  }

  return (
    <NewProject 
      mode="edit" 
      initialProject={project}
      onSave={(updatedProject) => {
        updateProject(updatedProject);
        toast.success('Project updated successfully');
        navigate('/');
      }}
    />
  );
} 