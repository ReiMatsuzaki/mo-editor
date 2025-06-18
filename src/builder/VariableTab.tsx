import { useState } from 'react';
import { SetDef } from './SetTab';

export interface VarDef {
  name: string;
  index: string | null;
  type: 'continuous' | 'integer' | 'binary';
  lb: string;
  ub: string;
}

interface Props {
  vars: VarDef[];
  onChange: (v: VarDef[]) => void;
  sets: SetDef[];
}

export default function VariableTab({ vars, onChange, sets }: Props) {
  const [form, setForm] = useState<VarDef>({ name: '', index: null, type: 'continuous', lb: '', ub: '' });

  const addVar = () => {
    if (!form.name) return;
    onChange([...vars, form]);
    setForm({ name: '', index: null, type: 'continuous', lb: '', ub: '' });
  };

  return (
    <div className="p-4 bg-white/60 rounded-lg shadow space-y-2">
      <h3 className="font-semibold">Variables</h3>
      <div className="flex items-end space-x-2 flex-wrap">
        <div>
          <label className="block text-sm">Name</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="p-1 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Index Set</label>
          <select value={form.index || ''} onChange={e => setForm({ ...form, index: e.target.value || null })} className="p-1 border rounded">
            <option value="">(scalar)</option>
            {sets.map(s => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm">Type</label>
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as VarDef['type'] })} className="p-1 border rounded">
            <option value="continuous">Continuous</option>
            <option value="integer">Integer</option>
            <option value="binary">Binary</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">LB</label>
          <input value={form.lb} onChange={e => setForm({ ...form, lb: e.target.value })} className="p-1 border rounded w-20" />
        </div>
        <div>
          <label className="block text-sm">UB</label>
          <input value={form.ub} onChange={e => setForm({ ...form, ub: e.target.value })} className="p-1 border rounded w-20" />
        </div>
        <button onClick={addVar} className="px-2 py-1 rounded bg-teal text-white">Add</button>
      </div>
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Index</th>
            <th className="p-2">Type</th>
            <th className="p-2">LB</th>
            <th className="p-2">UB</th>
          </tr>
        </thead>
        <tbody>
          {vars.map((v, idx) => (
            <tr key={idx} className="border-b last:border-b-0">
              <td className="p-2">{v.name}</td>
              <td className="p-2">{v.index || '-'}</td>
              <td className="p-2">{v.type}</td>
              <td className="p-2">{v.lb}</td>
              <td className="p-2">{v.ub}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
