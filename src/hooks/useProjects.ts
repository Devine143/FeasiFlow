import { useState, useEffect } from "react";
import { Project } from "@/types/project";

const STORAGE_KEY = 'feasiflow_projects';

// Initial demo projects
const demoProjects: Project[] = [
  {
    id: "1",
    name: "Riverside Apartments",
    location: "123 River Road",
    erfNumber: "ERF123456",
    propertyExtent: 5000,
    zoning: "Residential 4",
    zoningFactor: 1.5,
    bulkArea: 7500,
    baseBuildCost: 0,
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-16T15:30:00Z",
  },
  {
    id: "2",
    name: "Downtown Office Complex",
    location: "456 Business District",
    erfNumber: "ERF789012",
    propertyExtent: 8000,
    zoning: "Business 1",
    zoningFactor: 2.0,
    bulkArea: 16000,
    baseBuildCost: 0,
    createdAt: "2024-03-14T09:00:00Z",
    updatedAt: "2024-03-15T11:20:00Z",
  },
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      console.log('Loading projects from localStorage:', stored);
      if (!stored) return demoProjects;
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error loading projects:', error);
      return demoProjects;
    }
  });

  useEffect(() => {
    try {
      console.log('Saving projects to localStorage:', projects);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  }, [projects]);

  const saveProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...projectData,
      id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: now,
      updatedAt: now,
    };
    console.log('Saving new project:', newProject);
    setProjects(prev => {
      const updated = [...prev, newProject];
      console.log('Updated projects list:', updated);
      return updated;
    });
    return newProject;
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === updatedProject.id
          ? { ...updatedProject, updatedAt: new Date().toISOString() }
          : p
      )
    );
  };

  return {
    projects,
    saveProject,
    deleteProject,
    updateProject,
  };
}