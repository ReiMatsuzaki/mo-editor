import ExpressionBuilder from './ExpressionBuilder';
import { SetDef } from './SetTab';
import { ParamDef } from './ParameterTab';
import { VarDef } from './VariableTab';

interface Objective {
  sense: 'max' | 'min';
  expr: string;
}

interface Props {
  objective: Objective;
  onChange: (o: Objective) => void;
  sets: SetDef[];
  params: ParamDef[];
  vars: VarDef[];
}

export default function ObjectiveTab({ objective, onChange, sets, params, vars }: Props) {
  return (
    <div className="p-4 bg-white/60 rounded-lg shadow space-y-2">
      <h3 className="font-semibold">Objective</h3>
      <div className="flex items-center space-x-2">
        <select
          value={objective.sense}
          onChange={e => onChange({ ...objective, sense: e.target.value as Objective['sense'] })}
          className="p-1 border rounded"
        >
          <option value="max">Maximize</option>
          <option value="min">Minimize</option>
        </select>
      </div>
      <ExpressionBuilder
        sets={sets}
        params={params}
        vars={vars}
        onChange={expr => onChange({ ...objective, expr })}
      />
    </div>
  );
}
