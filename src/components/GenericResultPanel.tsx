import { GenericSolution } from '../models/randomSolve';

export default function GenericResultPanel({ solution }: { solution: GenericSolution | null }) {
  return (
    <div className="p-4 rounded-lg shadow bg-white/60 backdrop-blur">
      <h3 className="font-semibold">Results</h3>
      {solution ? (
        <ul className="list-disc ml-4">
          {Object.entries(solution.vars).map(([name, val]) =>
            typeof val === 'object' ? (
              <li key={name}>{name}: {Object.entries(val).map(([k, v]) => `${k}:${v}`).join(', ')}</li>
            ) : (
              <li key={name}>{name}: {val}</li>
            )
          )}
        </ul>
      ) : (
        <p>No solution yet.</p>
      )}
    </div>
  );
}

