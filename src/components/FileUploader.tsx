import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { parseKnapsackCSV } from '../models/knapsack';
import { parseAssignmentCSV } from '../models/assignment';

interface Props {
  model: 'knapsack' | 'assignment';
  onData: (data: any) => void;
}

export default function FileUploader({ model, onData }: Props) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      const file = accepted[0];
      if (!file) return;
      file.text().then(text => {
        const data =
          model === 'knapsack'
            ? parseKnapsackCSV(text)
            : parseAssignmentCSV(text);
        onData(data);
      });
    },
    [model, onData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'text/csv': ['.csv'] } });

  return (
    <div {...getRootProps()} className={`p-4 border-2 border-dashed rounded-lg ${isDragActive ? 'bg-cyan-50' : ''}`}> 
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the CSV here...</p> : <p>Drag & drop CSV file here, or click to select</p>}
    </div>
  );
}
