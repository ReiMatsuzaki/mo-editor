import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  model: 'knapsack' | 'assignment';
}

export default function FileUploader({ model }: Props) {
  const onDrop = useCallback((accepted: File[]) => {
    // TODO parse CSV and store in context
    console.log('files', accepted);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'text/csv': ['.csv'] } });

  return (
    <div {...getRootProps()} className={`p-4 border-2 border-dashed rounded-lg ${isDragActive ? 'bg-cyan-50' : ''}`}> 
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the CSV here...</p> : <p>Drag & drop CSV file here, or click to select</p>}
    </div>
  );
}
