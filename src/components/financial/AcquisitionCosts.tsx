import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AcquisitionTable } from './AcquisitionTable';
import { AcquisitionCost } from '@/types/financial';

const initialCosts: AcquisitionCost[] = [
  { id: 1, description: 'Deposit', month: '', percentage: 0, amount: 0 },
  { id: 2, description: 'Balance Payment', month: '', percentage: 0, amount: 0 },
  { id: 3, description: 'Land Broker Fees', month: '', percentage: 0, amount: 0 },
  { id: 4, description: 'Pre Acquisition & DD related Costs', month: '', percentage: 0, amount: 0 },
  { id: 5, description: 'Company set/structure costs', month: '', percentage: 0, amount: 0 },
];

export function AcquisitionCosts() {
  const [costs, setCosts] = useState<AcquisitionCost[]>(initialCosts);
  const [purchaseCost, setPurchaseCost] = useState<number>(0);

  const calculateAmount = (percentage: number): number => {
    return (percentage / 100) * purchaseCost;
  };

  const handlePurchaseCostChange = (value: string) => {
    const newPurchaseCost = parseFloat(value) || 0;
    setPurchaseCost(newPurchaseCost);
    
    // Recalculate all amounts based on new purchase cost
    setCosts(costs.map(cost => ({
      ...cost,
      amount: (cost.percentage / 100) * newPurchaseCost
    })));
  };

  const handleMonthChange = (id: number, value: string) => {
    setCosts(costs.map(cost => 
      cost.id === id ? { ...cost, month: value } : cost
    ));
  };

  const handlePercentageChange = (id: number, value: string) => {
    const percentage = parseFloat(value) || 0;
    setCosts(costs.map(cost => {
      if (cost.id === id) {
        const amount = calculateAmount(percentage);
        return { ...cost, percentage, amount };
      }
      return cost;
    }));
  };

  const getTotalAmount = () => costs.reduce((sum, cost) => sum + cost.amount, 0);
  const getTotalPercentage = () => costs.reduce((sum, cost) => sum + cost.percentage, 0);

  return (
    <Card className="bg-background">
      <CardHeader>
        <div className="space-y-1.5">
          <CardTitle className="text-2xl font-bold">Acquisition Calculator</CardTitle>
          <CardDescription>Calculate total acquisition cost based on purchase price and additional costs</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <AcquisitionTable
          costs={costs}
          onMonthChange={handleMonthChange}
          onPercentageChange={handlePercentageChange}
          totalAmount={getTotalAmount()}
          totalPercentage={getTotalPercentage()}
          purchaseCost={purchaseCost}
          onPurchaseCostChange={handlePurchaseCostChange}
        />
      </CardContent>
    </Card>
  );
}