import FileUploader from '../components/FileUploader';
import ResultPanel from '../components/ResultPanel';
import VariableTab from '../builder/VariableTab';
import ObjectiveTab from '../builder/ObjectiveTab';
import ConstraintTab from '../builder/ConstraintTab';

export default function KnapsackPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-navy">Knapsack Problem</h2>
      <FileUploader model="knapsack" />
      <VariableTab />
      <ObjectiveTab />
      <ConstraintTab />
      <ResultPanel />
    </div>
  );
}
