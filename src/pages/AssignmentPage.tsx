import { useState } from 'react';
import FileUploader from '../components/FileUploader';
import ResultPanel from '../components/ResultPanel';
import VariableTab from '../builder/VariableTab';
import ObjectiveTab from '../builder/ObjectiveTab';
import ConstraintTab from '../builder/ConstraintTab';
import { Matrix, solveAssignment } from '../models/assignment';

export default function AssignmentPage() {
  const [solution, setSolution] = useState<ReturnType<typeof solveAssignment> | null>(null);

  const handleData = (mat: Matrix) => {
    setSolution(solveAssignment(mat));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-navy">Assignment Problem</h2>
      <FileUploader model="assignment" onData={handleData} />
      <VariableTab />
      <ObjectiveTab />
      <ConstraintTab />
      <ResultPanel solution={solution} />
    </div>
  );
}
