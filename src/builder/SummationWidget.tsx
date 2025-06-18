import { useState } from 'react';
import { SetDef } from './SetTab';

interface Props {
  sets: SetDef[];
  onInsert: (expr: string) => void;
}

export default function SummationWidget({ sets, onInsert }: Props) {
  const [indexVar, setIndexVar] = useState('');
  const [setName, setSetName] = useState('');
  const [body, setBody] = useState('');

  const add = () => {
    if (!indexVar || !setName || !body) return;
    onInsert(`sum_{${indexVar} in ${setName}} ${body}`);
    setIndexVar('');
    setSetName('');
    setBody('');
  };

  return (
    <div className="flex items-end space-x-2 flex-wrap">
      <div>
        <label className="block text-sm">Index</label>
        <input value={indexVar} onChange={e => setIndexVar(e.target.value)} className="p-1 border rounded w-16" />
      </div>
      <div>
        <label className="block text-sm">Set</label>
        <select value={setName} onChange={e => setSetName(e.target.value)} className="p-1 border rounded">
          <option value="">Select</option>
          {sets.map(s => (
            <option key={s.name} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>
      <div className="flex-grow">
        <label className="block text-sm">Expression</label>
        <input value={body} onChange={e => setBody(e.target.value)} className="p-1 border rounded w-full" />
      </div>
      <button onClick={add} className="px-2 py-1 rounded bg-teal text-white">Insert</button>
    </div>
  );
}
