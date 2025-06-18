import FileUploader from '../components/FileUploader';
import ResultPanel from '../components/ResultPanel';
import VariableTab from '../builder/VariableTab';
import ObjectiveTab from '../builder/ObjectiveTab';
import ConstraintTab from '../builder/ConstraintTab';

export default function AssignmentPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-navy">Assignment Problem</h2>
      <FileUploader model="assignment" />
      <VariableTab />
      <ObjectiveTab />
      <ConstraintTab />
      <ResultPanel />
    </div>
  );
}
