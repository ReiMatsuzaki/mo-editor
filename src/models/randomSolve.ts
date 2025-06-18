import { VarDef } from '../builder/VariableTab';
import { SetDef } from '../builder/SetTab';

export interface GenericSolution {
  vars: Record<string, number | Record<string, number>>;
}

function randBetween(lb: number, ub: number, isInt: boolean): number {
  const r = lb + Math.random() * (ub - lb);
  return isInt ? Math.round(r) : parseFloat(r.toFixed(2));
}

export function randomSolve(vars: VarDef[], sets: SetDef[]): GenericSolution {
  const result: Record<string, any> = {};
  for (const v of vars) {
    const lb = parseFloat(v.lb);
    const ub = parseFloat(v.ub);
    const hasLb = !isNaN(lb);
    const hasUb = !isNaN(ub);
    const lower = hasLb ? lb : 0;
    const upper = hasUb ? ub : v.type === 'binary' ? 1 : 10;
    const genValue = () => {
      if (v.type === 'binary') return Math.random() < 0.5 ? 0 : 1;
      return randBetween(lower, upper, v.type === 'integer');
    };

    if (v.index) {
      const members = sets.find(s => s.name === v.index)?.members || [];
      const indexed: Record<string, number> = {};
      for (const m of members) indexed[m] = genValue();
      result[v.name] = indexed;
    } else {
      result[v.name] = genValue();
    }
  }
  return { vars: result };
}

