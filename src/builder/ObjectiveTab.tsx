interface Objective {
  sense: 'max' | 'min';
  expr: string;
}

export default function ObjectiveTab({ objective, onChange }: { objective: Objective; onChange: (o: Objective) => void }) {
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
    </div>
  );
}
