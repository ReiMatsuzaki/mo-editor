import { useState } from 'react';

export interface SetDef {
  name: string;
  members: string[];
}

export default function SetTab({ sets, onChange }: { sets: SetDef[]; onChange: (s: SetDef[]) => void }) {
  const [name, setName] = useState('');
  const [membersText, setMembersText] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);

  const addSet = (members: string[]) => {
    if (!name || members.length === 0) return;
    onChange([...sets, { name, members }]);
    setName('');
    setMembersText('');
  };

  const parseMembers = (text: string): string[] => {
    const trimmed = text.trim();
    if (!trimmed) return [];
    const rangeMatch = trimmed.match(/^(-?\d+)\s*-\s*(-?\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      const step = start <= end ? 1 : -1;
      const res: string[] = [];
      for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
        res.push(i.toString());
      }
      return res;
    }
    return trimmed.split(/[,\s]+/).map(s => s.trim()).filter(Boolean);
  };

  const handleFile = (files: FileList | null) => {
    if (!files || !files[0]) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const members = text.trim().split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      addSet(members);
    };
    reader.onerror = () => {
      setFileError('Failed to read file');
    };
    reader.readAsText(files[0]);
  };

  return (
    <div className="p-4 bg-white/60 rounded-lg shadow space-y-2">
      <h3 className="font-semibold">Sets</h3>
      <div className="flex items-end space-x-2 flex-wrap">
        <div>
          <label className="block text-sm">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="p-1 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Members</label>
          <input value={membersText} onChange={e => setMembersText(e.target.value)} placeholder="e.g. 1-10 or a,b,c" className="p-1 border rounded" />
        </div>
        <button onClick={() => addSet(parseMembers(membersText))} className="px-2 py-1 rounded bg-teal text-white">Add</button>
        <div>
          <label className="block text-sm">or CSV</label>
          <input type="file" accept=".csv" onChange={e => handleFile(e.target.files)} />
        </div>
      </div>
      {fileError && <p className="text-red-600 text-sm">{fileError}</p>}
      <ul className="list-disc ml-4">
        {sets.map((s, idx) => (
          <li key={idx}>{s.name}: {s.members.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
}
