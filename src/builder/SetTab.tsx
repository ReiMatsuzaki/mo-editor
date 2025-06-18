import { useState } from 'react';

export interface SetDef {
  name: string;
  members: string[];
}

export default function SetTab({ sets, onChange }: { sets: SetDef[]; onChange: (s: SetDef[]) => void }) {
  const [name, setName] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);

  const addSet = (members: string[]) => {
    onChange([...sets, { name, members }]);
    setName('');
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
      <div className="flex items-end space-x-2">
        <div>
          <label className="block text-sm">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="p-1 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Members CSV</label>
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
