import { useEffect, useState } from 'react';
import { SetDef } from './SetTab';
import { ParamDef } from './ParameterTab';
import { VarDef } from './VariableTab';

export type ExprNode =
  | { type: 'const'; value: string }
  | { type: 'var'; name: string; index: string }
  | { type: 'param'; name: string; index: string }
  | { type: 'binary'; op: '+' | '-' | '*' | '/'; left: ExprNode; right: ExprNode }
  | { type: 'sum'; indexVar: string; setName: string; body: ExprNode };

export function exprToString(e: ExprNode): string {
  switch (e.type) {
    case 'const':
      return e.value;
    case 'var':
      return e.name + (e.index ? `[${e.index}]` : '');
    case 'param':
      return e.name + (e.index ? `[${e.index}]` : '');
    case 'binary':
      return `${exprToString(e.left)} ${e.op} ${exprToString(e.right)}`;
    case 'sum':
      return `sum_{${e.indexVar} in ${e.setName}} ${exprToString(e.body)}`;
  }
}

interface NodeProps {
  expr: ExprNode;
  onChange: (e: ExprNode) => void;
  sets: SetDef[];
  params: ParamDef[];
  vars: VarDef[];
}

function NodeEditor({ expr, onChange, sets, params, vars }: NodeProps) {
  const changeType = (t: ExprNode['type']) => {
    switch (t) {
      case 'const':
        onChange({ type: 'const', value: '' });
        break;
      case 'var':
        onChange({ type: 'var', name: vars[0]?.name || '', index: '' });
        break;
      case 'param':
        onChange({ type: 'param', name: params[0]?.name || '', index: '' });
        break;
      case 'binary':
        onChange({ type: 'binary', op: '*', left: { type: 'const', value: '0' }, right: { type: 'const', value: '0' } });
        break;
      case 'sum':
        onChange({ type: 'sum', indexVar: '', setName: sets[0]?.name || '', body: { type: 'const', value: '0' } });
        break;
    }
  };

  return (
    <div className="border p-1 rounded space-y-1">
      <select value={expr.type} onChange={e => changeType(e.target.value as ExprNode['type'])} className="p-1 border rounded">
        <option value="const">Number</option>
        <option value="var">Variable</option>
        <option value="param">Parameter</option>
        <option value="binary">Operation</option>
        <option value="sum">Summation</option>
      </select>
      {expr.type === 'const' && (
        <input value={expr.value} onChange={e => onChange({ ...expr, value: e.target.value })} className="p-1 border rounded w-full" />
      )}
      {expr.type === 'var' && (
        <div className="space-x-1">
          <select value={expr.name} onChange={e => onChange({ ...expr, name: e.target.value })} className="p-1 border rounded">
            {vars.map(v => (
              <option key={v.name} value={v.name}>{v.name}</option>
            ))}
          </select>
          <input value={expr.index} onChange={e => onChange({ ...expr, index: e.target.value })} className="p-1 border rounded w-16" placeholder="idx" />
        </div>
      )}
      {expr.type === 'param' && (
        <div className="space-x-1">
          <select value={expr.name} onChange={e => onChange({ ...expr, name: e.target.value })} className="p-1 border rounded">
            {params.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
          <input value={expr.index} onChange={e => onChange({ ...expr, index: e.target.value })} className="p-1 border rounded w-16" placeholder="idx" />
        </div>
      )}
      {expr.type === 'binary' && (
        <div className="space-y-1">
          <select value={expr.op} onChange={e => onChange({ ...expr, op: e.target.value as any })} className="p-1 border rounded">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
          <NodeEditor expr={expr.left} onChange={left => onChange({ ...expr, left })} sets={sets} params={params} vars={vars} />
          <NodeEditor expr={expr.right} onChange={right => onChange({ ...expr, right })} sets={sets} params={params} vars={vars} />
        </div>
      )}
      {expr.type === 'sum' && (
        <div className="space-y-1">
          <div className="space-x-1">
            <input value={expr.indexVar} onChange={e => onChange({ ...expr, indexVar: e.target.value })} className="p-1 border rounded w-16" placeholder="i" />
            <select value={expr.setName} onChange={e => onChange({ ...expr, setName: e.target.value })} className="p-1 border rounded">
              {sets.map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>
          <NodeEditor expr={expr.body} onChange={body => onChange({ ...expr, body })} sets={sets} params={params} vars={vars} />
        </div>
      )}
    </div>
  );
}

interface Props {
  onChange: (expr: string) => void;
  sets: SetDef[];
  params: ParamDef[];
  vars: VarDef[];
}

export default function ExpressionBuilder({ onChange, sets, params, vars }: Props) {
  const [expr, setExpr] = useState<ExprNode>({ type: 'const', value: '' });

  useEffect(() => {
    onChange(exprToString(expr));
  }, [expr, onChange]);

  return <NodeEditor expr={expr} onChange={setExpr} sets={sets} params={params} vars={vars} />;
}
