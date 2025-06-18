import { useState } from 'react';
import { SetDef } from './SetTab';

export interface ParamDef {
  name: string;
  set: string | null; // null for scalar
  values: string[]; // raw CSV rows or single scalar
}

interface Props {
  params: ParamDef[];
  onChange: (p: ParamDef[]) => void;
  sets: SetDef[];
}

export default function ParameterTab({ params, onChange, sets }: Props) {
  const [name, setName] = useState('');
  const [setNameSel, setSetNameSel] = useState<string>('');
  const [val, setVal] = useState('');

  const addScalar = () => {
    if (!name) return;
    onChange([...params, { name, set: setNameSel || null, values: [val] }]);
    setName('');
    setVal('');
  };

  const handleFile = (files: FileList | null) => {
    if (!files || !files[0]) return;
    files[0].text().then(text => {
      const values = text.trim().split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      onChange([...params, { name, set: setNameSel, values }]);
      setName('');
      setVal('');
    });
  };

  return (
    <div className="p-4 bg-white/60 rounded-lg shadow space-y-2">
      <h3 className="font-semibold">Parameters</h3>
      <div className="flex items-end space-x-2 flex-wrap">
        <div>
          <label className="block text-sm">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="p-1 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Index Set</label>
          <select value={setNameSel} onChange={e => setSetNameSel(e.target.value)} className="p-1 border rounded">
            <option value="">(scalar)</option>
            {sets.map(s => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        {setNameSel ? (
          <div>
            <label className="block text-sm">Values CSV</label>
            <input type="file" accept=".csv" onChange={e => handleFile(e.target.files)} />
          </div>
        ) : (
          <div>
            <label className="block text-sm">Value</label>
            <input value={val} onChange={e => setVal(e.target.value)} className="p-1 border rounded" />
          </div>
        )}
        <button onClick={addScalar} className="px-2 py-1 rounded bg-teal text-white">Add</button>
      </div>
      <ul className="list-disc ml-4">
        {params.map((p, idx) => (
          <li key={idx}>{p.name}{p.set ? `[${p.set}]` : ''}: {p.values.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
}
