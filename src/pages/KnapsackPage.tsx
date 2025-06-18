import { useMemo, useState } from 'react';
import FileUploader from '../components/FileUploader';
import ResultPanel from '../components/ResultPanel';
import EditableTable from '../components/EditableTable';
import { KnapsackData, solveKnapsack } from '../models/knapsack';

export default function KnapsackPage() {
  const [data, setData] = useState<KnapsackData | null>(null);
  const [solution, setSolution] = useState<ReturnType<typeof solveKnapsack> | null>(null);

  const handleData = (d: KnapsackData) => {
    setData(d);
    setSolution(solveKnapsack(d));
  };

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Weight', accessor: 'weight' },
      { Header: 'Value', accessor: 'value' }
    ],
    []
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-navy">Knapsack Problem</h2>
      <FileUploader model="knapsack" onData={handleData} />
      {data && <EditableTable data={data.items} columns={columns} />}
      <ResultPanel solution={solution} />
    </div>
  );
}
