import { useState } from 'react';

export interface ConstraintDef {
  lhs: string;
  comp: '<=' | '=' | '>=';
  rhs: string;
}

interface Props {
  constraints: ConstraintDef[];
  onChange: (c: ConstraintDef[]) => void;
}

export default function ConstraintTab({ constraints, onChange }: Props) {
  const [form, setForm] = useState<ConstraintDef>({ lhs: '', comp: '<=', rhs: '' });

  const addConst = () => {
    if (!form.lhs || !form.rhs) return;
    onChange([...constraints, form]);
    setForm({ lhs: '', comp: '<=', rhs: '' });
  };

  return (
    <div className="p-4 bg-white/60 rounded-lg shadow space-y-2">
      <h3 className="font-semibold">Constraints</h3>
      <div className="flex items-end space-x-2 flex-wrap">
        <input value={form.lhs} onChange={e => setForm({ ...form, lhs: e.target.value })} className="flex-grow p-1 border rounded" placeholder="Left-hand expression" />
        <select value={form.comp} onChange={e => setForm({ ...form, comp: e.target.value as ConstraintDef['comp'] })} className="p-1 border rounded">
          <option value="<=">&le;</option>
          <option value="=">=</option>
          <option value=">=">&ge;</option>
        </select>
        <input value={form.rhs} onChange={e => setForm({ ...form, rhs: e.target.value })} className="flex-grow p-1 border rounded" placeholder="Right-hand expression" />
        <button onClick={addConst} className="px-2 py-1 rounded bg-teal text-white">Add</button>
      </div>
      <ul className="list-disc ml-4">
        {constraints.map((c, idx) => (
          <li key={idx}>{c.lhs} {c.comp} {c.rhs}</li>
        ))}
      </ul>
    </div>
  );
}
