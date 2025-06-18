import { useState } from 'react';
import SetTab, { SetDef } from '../builder/SetTab';
import ParameterTab, { ParamDef } from '../builder/ParameterTab';
import VariableTab, { VarDef } from '../builder/VariableTab';
import ObjectiveTab from '../builder/ObjectiveTab';
import ConstraintTab, { ConstraintDef } from '../builder/ConstraintTab';
import Preview from '../builder/Preview';

export default function BuilderPage() {
  const [sets, setSets] = useState<SetDef[]>([]);
  const [params, setParams] = useState<ParamDef[]>([]);
  const [vars, setVars] = useState<VarDef[]>([]);
  const [objective, setObjective] = useState<{ sense: 'max' | 'min'; expr: string }>({ sense: 'max', expr: '' });
  const [constraints, setConstraints] = useState<ConstraintDef[]>([]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-navy">Model Builder</h2>
      <SetTab sets={sets} onChange={setSets} />
      <ParameterTab params={params} onChange={setParams} sets={sets} />
      <VariableTab vars={vars} onChange={setVars} sets={sets} />
      <ObjectiveTab objective={objective} onChange={setObjective} sets={sets} />
      <ConstraintTab constraints={constraints} onChange={setConstraints} sets={sets} />
      <Preview sets={sets} params={params} vars={vars} objective={objective} constraints={constraints} />
    </div>
  );
}
