import { useEffect } from 'react';
import { SetDef } from './SetTab';
import { ParamDef } from './ParameterTab';
import { VarDef } from './VariableTab';
import { ConstraintDef } from './ConstraintTab';

interface Props {
  sets: SetDef[];
  params: ParamDef[];
  vars: VarDef[];
  objective: { sense: 'max' | 'min'; expr: string };
  constraints: ConstraintDef[];
}

export default function Preview({ sets, params, vars, objective, constraints }: Props) {
  const latex = `\\begin{align}\n` +
    sets.map(s => `${s.name} &= \{${s.members.join(', ')}\}`).join('\\\\\n') +
    (sets.length ? '\n' : '') +
    params.map(p => `${p.name}${p.set ? `_{${p.set}}` : ''} &= ${p.values.join(', ')}`).join('\\\\\n') +
    (params.length ? '\n' : '') +
    `${objective.sense === 'max' ? 'max' : 'min'} && ${objective.expr} \\` +
    vars.map(v => `${v.name}${v.index ? `_{${v.index}}` : ''} ${v.lb || v.ub ? `\\in [${v.lb || '-\\infty'}, ${v.ub || '+\\infty'}]` : ''}`).join('\\\\\n') +
    (vars.length ? '\n' : '') +
    constraints.map(c => `${c.lhs} ${c.comp} ${c.rhs}`).join('\\\\\n') +
    '\\end{align}';

  useEffect(() => {
    if ((window as any).MathJax) (window as any).MathJax.typeset();
  }, [latex]);

  return (
    <div className="p-4 bg-white/60 rounded-lg shadow">
      <h3 className="font-semibold mb-2">Preview</h3>
      <div className="overflow-x-auto">{latex ? <div dangerouslySetInnerHTML={{ __html: `$$${latex}$$` }} /> : <p>No model yet.</p>}</div>
    </div>
  );
}
