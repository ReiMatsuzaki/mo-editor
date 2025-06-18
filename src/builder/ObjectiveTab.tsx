import SummationWidget from './SummationWidget';
import { SetDef } from './SetTab';

interface Objective {
  sense: 'max' | 'min';
  expr: string;
}

interface Props {
  objective: Objective;
  onChange: (o: Objective) => void;
  sets: SetDef[];
}

export default function ObjectiveTab({ objective, onChange, sets }: Props) {
  return (
    <div className="p-4 bg-white/60 rounded-lg shadow space-y-2">
      <h3 className="font-semibold">Objective</h3>
      <div className="flex items-center space-x-2">
        <select value={objective.sense} onChange={e => onChange({ ...objective, sense: e.target.value as Objective['sense'] })} className="p-1 border rounded">
          <option value="max">Maximize</option>
          <option value="min">Minimize</option>
        </select>
        <input value={objective.expr} onChange={e => onChange({ ...objective, expr: e.target.value })} className="flex-grow p-1 border rounded" placeholder="e.g. sum_i c[i] x[i]" />
      </div>
      <SummationWidget sets={sets} onInsert={expr => onChange({ ...objective, expr: (objective.expr ? objective.expr + ' ' : '') + expr })} />
    </div>
  );
}
