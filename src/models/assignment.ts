export type Matrix = number[][];

export function parseAssignmentCSV(text: string): Matrix {
  return text.trim().split(/\r?\n/).map(line => line.split(',').map(Number));
}

function permute(arr: number[]): number[][] {
  if (arr.length === 1) return [arr];
  const res: number[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    for (const p of permute(rest)) res.push([arr[i], ...p]);
  }
  return res;
}

export function solveAssignment(mat: Matrix) {
  const n = mat.length;
  const cols = Array.from({ length: n }, (_, i) => i);
  let best = Infinity;
  let bestAssign: number[] = [];
  for (const p of permute(cols)) {
    let cost = 0;
    for (let i = 0; i < n; i++) cost += mat[i][p[i]];
    if (cost < best) {
      best = cost;
      bestAssign = p;
    }
  }
  return { cost: best, assignment: bestAssign };
}
