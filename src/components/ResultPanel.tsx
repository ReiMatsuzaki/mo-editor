export interface KnapsackSolution {
  value: number;
  selected: string[];
}

export interface AssignmentSolution {
  cost: number;
  assignment: number[];
}

export type Solution = KnapsackSolution | AssignmentSolution;

interface Props {
  solution: Solution | null;
}

export default function ResultPanel({ solution }: Props) {
  return (
    <div className="p-4 rounded-lg shadow bg-white/60 backdrop-blur">
      <h3 className="font-semibold">Results</h3>
      {solution ? (
        'value' in solution ? (
          <div>
            <p>Best value: {solution.value}</p>
            <p>Selected: {solution.selected.join(', ') || '-'}</p>
          </div>
        ) : (
          <div>
            <p>Best cost: {solution.cost}</p>
            <p>Assignment: {solution.assignment.join(', ')}</p>
          </div>
        )
      ) : (
        <p>No solution yet.</p>
      )}
    </div>
  );
}
