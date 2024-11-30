import { BuildingSection, BuildingSummary } from '@/types/building';

export function calculateBuildingSummary(sections: BuildingSection[]): BuildingSummary {
  const calculatedSummary = sections.reduce(
    (acc, section) => {
      const sectionSummary = section.components.reduce(
        (compAcc, component) => ({
          totalArea: compAcc.totalArea + component.totalArea,
          totalBuildCost: compAcc.totalBuildCost + component.buildCost,
        }),
        { totalArea: 0, totalBuildCost: 0 }
      );
      return {
        totalArea: acc.totalArea + sectionSummary.totalArea,
        totalBuildCost: acc.totalBuildCost + sectionSummary.totalBuildCost,
      };
    },
    { totalArea: 0, totalBuildCost: 0 }
  );

  const totalArea = calculatedSummary.totalArea;
  const totalBuildCost = calculatedSummary.totalBuildCost;
  const averageBuildCostRate = totalArea > 0 ? totalBuildCost / totalArea : 0;

  return {
    totalArea,
    averageBuildCostRate,
    totalBuildCost,
  };
}