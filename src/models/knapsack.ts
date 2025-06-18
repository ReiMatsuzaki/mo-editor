export interface Item { name: string; weight: number; value: number; }
export interface KnapsackData { items: Item[]; maxWeight: number; }

export function parseKnapsackCSV(text: string): KnapsackData {
  const lines = text.trim().split(/\r?\n/);
  const items: Item[] = [];
  let maxWeight = 0;
  for (const line of lines) {
    const [name, weight, value] = line.split(',');
    if (name === '_max_weight') {
      maxWeight = Number(weight);
    } else {
      items.push({ name, weight: Number(weight), value: Number(value) });
    }
  }
  return { items, maxWeight };
}

export function solveKnapsack(data: KnapsackData) {
  const n = data.items.length;
  let bestValue = 0;
  let bestSet: number[] = [];
  for (let mask = 0; mask < 1 << n; mask++) {
    let w = 0;
    let v = 0;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        w += data.items[i].weight;
        v += data.items[i].value;
      }
    }
    if (w <= data.maxWeight && v > bestValue) {
      bestValue = v;
      bestSet = [];
      for (let i = 0; i < n; i++) if (mask & (1 << i)) bestSet.push(i);
    }
  }
  return { value: bestValue, selected: bestSet.map(i => data.items[i].name) };
}
