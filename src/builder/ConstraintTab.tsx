import { useState } from 'react';
import ExpressionBuilder from './ExpressionBuilder';
import { SetDef } from './SetTab';
import { ParamDef } from './ParameterTab';
import { VarDef } from './VariableTab';

export interface ConstraintDef {
  lhs: string;
  comp: '<=' | '=' | '>=';
  rhs: string;
}

interface Props {
  constraints: ConstraintDef[];
  onChange: (c: ConstraintDef[]) => void;
  sets: SetDef[];
  params: ParamDef[];
  vars: VarDef[];
}

export default function ConstraintTab({ constraints, onChange, sets, params, vars }: Props) {
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
        <select value={form.comp} onChange={e => setForm({ ...form, comp: e.target.value as ConstraintDef['comp'] })} className="p-1 border rounded">
          <option value="<=">&le;</option>
          <option value="=">=</option>
          <option value=">=">&ge;</option>
        </select>
        <button onClick={addConst} className="px-2 py-1 rounded bg-teal text-white">Add</button>
      </div>
      <div className="flex space-x-2">
        <div className="flex-grow">
          <ExpressionBuilder sets={sets} params={params} vars={vars} onChange={expr => setForm(f => ({ ...f, lhs: expr }))} />
        </div>
        <div className="flex-grow">
          <ExpressionBuilder sets={sets} params={params} vars={vars} onChange={expr => setForm(f => ({ ...f, rhs: expr }))} />
        </div>
      </div>
      <ul className="list-disc ml-4">
        {constraints.map((c, idx) => (
          <li key={idx}>{c.lhs} {c.comp} {c.rhs}</li>
        ))}
      </ul>
    </div>
  );
}
