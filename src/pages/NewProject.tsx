import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormField } from "@/components/shared/FormField";
import { AreaInput } from "@/components/shared/AreaInput";
import { ZoningSelect } from "@/components/shared/ZoningSelect";
import { AcquisitionCosts } from "@/components/financial/AcquisitionCosts";
import { BaseBuildCost } from '@/components/building/BaseBuildCost';
import { FixedCosts } from '@/components/fixed-costs/FixedCosts';
import { ProfessionalCosts } from '@/components/professional/ProfessionalCosts';
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { toast } from 'sonner';

export function NewProject() {
  const navigate = useNavigate();
  const { saveProject } = useProjects();
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    location: "",
    erfNumber: "",
    propertyExtent: 0,
    zoning: "",
    zoningFactor: 0,
    bulkArea: 0,
    baseBuildCost: 0
  });

  const [isEditingName, setIsEditingName] = useState(true);

  const handleChange = (field: keyof typeof projectDetails) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectDetails((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleNumberChange = (field: keyof typeof projectDetails) => (
    value: number
  ) => {
    setProjectDetails((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectDetails.name.trim()) {
      setIsEditingName(false);
    }
  };

  const handleBaseBuildCostUpdate = (cost: number) => {
    setProjectDetails(prev => ({
      ...prev,
      baseBuildCost: cost
    }));
  };

  const handleSave = () => {
    if (!projectDetails.name.trim()) {
      toast.error('Please enter a project name');
      return;
    }

    try {
      const validatedProject = {
        ...projectDetails,
        propertyExtent: Number(projectDetails.propertyExtent) || 0,
        zoningFactor: Number(projectDetails.zoningFactor) || 0,
        bulkArea: Number(projectDetails.bulkArea) || 0,
        baseBuildCost: Number(projectDetails.baseBuildCost) || 0,
      };

      saveProject(validatedProject);
      toast.success('Project saved successfully');
      navigate('/');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save project');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          {isEditingName ? (
            <form onSubmit={handleNameSubmit} className="space-y-2">
              <Input
                type="text"
                value={projectDetails.name}
                onChange={handleChange("name")}
                placeholder="Enter project name"
                className="text-3xl font-bold tracking-tight h-12"
                autoFocus
              />
              <p className="text-muted-foreground">
                Enter a name for your property development feasibility study
              </p>
            </form>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold tracking-tight">{projectDetails.name}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditingName(true)}
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <Button onClick={handleSave} className="bg-success hover:bg-success/90">
          Save Project
        </Button>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Project Details</TabsTrigger>
          <TabsTrigger value="acquisition">Acquisition Cost</TabsTrigger>
          <TabsTrigger value="base-build">Base Build Cost</TabsTrigger>
          <TabsTrigger value="fixed-costs">Fixed Costs</TabsTrigger>
          <TabsTrigger value="professional">Professional Costs</TabsTrigger>
          <TabsTrigger value="yearly-income">Yearly Income & Expenses</TabsTrigger>
          <TabsTrigger value="noi">NOI Projections</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>
                Enter the basic details about your property development project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  id="location"
                  label="Location"
                  placeholder="Enter property location"
                  value={projectDetails.location}
                  onChange={handleChange("location")}
                />
                <FormField
                  id="erf-number"
                  label="Erf Number"
                  placeholder="Enter ERF number"
                  value={projectDetails.erfNumber}
                  onChange={handleChange("erfNumber")}
                />
                <AreaInput
                  id="property-extent"
                  label="Property Extent"
                  value={projectDetails.propertyExtent}
                  onChange={handleNumberChange("propertyExtent")}
                />
                <ZoningSelect
                  id="zoning"
                  value={projectDetails.zoning}
                  onChange={(value) =>
                    setProjectDetails((prev) => ({ ...prev, zoning: value }))
                  }
                />
                <FormField
                  id="zoning-factor"
                  label="Zoning Factor"
                  type="number"
                  step="0.01"
                  placeholder="Enter zoning factor"
                  value={projectDetails.zoningFactor}
                  onChange={handleChange("zoningFactor")}
                />
                <AreaInput
                  id="bulk-area"
                  label="Bulk Area"
                  value={projectDetails.bulkArea}
                  onChange={handleNumberChange("bulkArea")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="acquisition">
          <AcquisitionCosts />
        </TabsContent>

        <TabsContent value="base-build">
          <BaseBuildCost onCostUpdate={handleBaseBuildCostUpdate} />
        </TabsContent>

        <TabsContent value="fixed-costs">
          <FixedCosts baseBuildCost={projectDetails.baseBuildCost} />
        </TabsContent>

        <TabsContent value="professional">
          <ProfessionalCosts />
        </TabsContent>

        <TabsContent value="yearly-income">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Income & Expenses</CardTitle>
              <CardDescription>Project annual financial performance</CardDescription>
            </CardHeader>
            <CardContent>Coming soon...</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="noi">
          <Card>
            <CardHeader>
              <CardTitle>NOI Projections</CardTitle>
              <CardDescription>Calculate Net Operating Income projections</CardDescription>
            </CardHeader>
            <CardContent>Coming soon...</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}