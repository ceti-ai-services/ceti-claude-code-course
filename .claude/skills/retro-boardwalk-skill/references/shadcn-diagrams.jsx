// shadcn/ui-flavored diagrams — built from tokens + Tailwind utility classes.
// Zero inline color values. Palette & mode swap via body class only.

// Shared shell: a faint "preview" chrome inside each card.
function ShadShell({ title, caption, children }) {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div>
        <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Live diagram</div>
        <div className="font-serif text-base font-semibold text-foreground mt-0.5">{title}</div>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-[180px]">{children}</div>
      {caption && <div className="text-[11px] italic text-muted-foreground">{caption}</div>}
    </div>
  );
}

// ── Chip: the canonical colored node ───────────────────────────────
// In light: bg + text from role tokens.
// In dark:  bg = role (shadow tone), border + text = role-edge.
function Chip({ role = 'primary', active = false, dim = false, children, className = '', ...rest }) {
  const base = 'rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all';
  const byRole = {
    primary:   'bg-primary text-primary-foreground dark:border dark:border-primary-edge/70',
    secondary: 'bg-secondary text-secondary-foreground dark:border dark:border-secondary-edge/70',
    accent:    'bg-accent text-accent-foreground dark:border dark:border-accent-edge/70',
    support:   'bg-support text-support-foreground dark:border dark:border-support-edge/70',
  }[role];
  return (
    <div className={cx(
      base, byRole,
      active && 'scale-[1.04] -translate-y-0.5 shadow-lg dark:shadow-[0_0_0_2px_hsl(var(--primary-edge)/.25),0_6px_16px_rgba(0,0,0,.4)]',
      dim && 'opacity-40',
      className,
    )} {...rest}>{children}</div>
  );
}

// ─── 1. Sequential pulse ───────────────────────────────────────────
function ShadSequentialPulse() {
  const [a, setA] = React.useState(0);
  React.useEffect(() => { const z = setInterval(() => setA(x => (x+1) % 4), 1100); return () => clearInterval(z); }, []);
  const steps = [
    { t: 'Perceive', s: 'read context',  role: 'primary' },
    { t: 'Reason',   s: 'plan + decide', role: 'secondary' },
    { t: 'Act',      s: 'tool calls',    role: 'accent' },
    { t: 'Observe',  s: 'tests pass?',   role: 'support' },
  ];
  return (
    <ShadShell title="PRAO loop" caption="Four phases — one session">
      <div className="flex items-center gap-1.5 w-full justify-between">
        {steps.map((step, i) => (
          <React.Fragment key={step.t}>
            <Chip role={step.role} active={a === i} className="flex-1 text-center min-w-0">
              <div className="text-[12px] font-bold">{step.t}</div>
              <div className="text-[10px] opacity-75 font-normal">{step.s}</div>
            </Chip>
            {i < 3 && (
              <div className="w-4 h-0.5 bg-muted/40 shrink-0"/>
            )}
          </React.Fragment>
        ))}
      </div>
    </ShadShell>
  );
}

// ─── 2. Orbital ring ───────────────────────────────────────────────
function ShadOrbitalRing() {
  const [a, setA] = React.useState(0);
  React.useEffect(() => { const z = setInterval(() => setA(x => (x+1) % 4), 1400); return () => clearInterval(z); }, []);
  const R = 70, cx = 120, cy = 100;
  const pts = [0,1,2,3].map(i => { const t = -Math.PI/2 + i * (Math.PI/2); return { x: cx + Math.cos(t)*R, y: cy + Math.sin(t)*R }; });
  const nodes = [
    { t: 'Perceive', role: 'primary' }, { t: 'Reason', role: 'secondary' },
    { t: 'Act',      role: 'accent'  }, { t: 'Observe', role: 'support'  },
  ];
  return (
    <ShadShell title="PRAO as a cycle" caption="The dot never stops">
      <div className="relative w-[240px] h-[200px]">
        <svg width="240" height="200" className="absolute inset-0">
          <circle cx={cx} cy={cy} r={R} fill="none" strokeDasharray="3 4" strokeWidth="1.2"
                  stroke="hsl(var(--muted))" strokeOpacity="0.5"/>
          <circle r="5" fill="hsl(var(--accent-edge))" stroke="hsl(var(--background))" strokeWidth="1.5">
            <animateMotion dur="5.6s" repeatCount="indefinite"
              path={`M ${cx} ${cy-R} A ${R} ${R} 0 0 1 ${cx+R} ${cy} A ${R} ${R} 0 0 1 ${cx} ${cy+R} A ${R} ${R} 0 0 1 ${cx-R} ${cy} A ${R} ${R} 0 0 1 ${cx} ${cy-R}`}/>
          </circle>
        </svg>
        {pts.map((p, i) => (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: p.x, top: p.y }}>
            <Chip role={nodes[i].role} active={a === i} className="!px-2 !py-1 !text-[11px] whitespace-nowrap">
              {nodes[i].t}
            </Chip>
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-[9px] tracking-widest font-semibold text-muted-foreground">NOW</div>
          <div key={a} className="font-serif text-sm font-bold text-foreground animate-slide-in">{nodes[a].t}</div>
        </div>
      </div>
    </ShadShell>
  );
}

// ─── 3. Storyboard ─────────────────────────────────────────────────
function ShadStoryboard() {
  const [a, setA] = React.useState(0);
  React.useEffect(() => { const z = setInterval(() => setA(x => (x+1) % 4), 2200); return () => clearInterval(z); }, []);
  const steps = [
    { t: 'Perceive', role: 'primary',   note: 'Opens every .md. No edits yet.' },
    { t: 'Reason',   role: 'secondary', note: 'Drafts a plan. You correct scope first.' },
    { t: 'Act',      role: 'accent',    note: 'Proposes each write. You approve, one at a time.' },
    { t: 'Observe',  role: 'support',   note: 'Summarizes changes. Catches the one it forgot.' },
  ];
  return (
    <ShadShell title="PRAO — narrated" caption="Step updates commentary in place">
      <div className="flex gap-4 w-full">
        <div className="flex flex-col gap-1.5 flex-none">
          {steps.map((s, i) => (
            <button key={s.t} onClick={() => setA(i)} className={cx(
              'flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-all min-w-[128px]',
              a === i
                ? cx('translate-x-1', {
                    primary: 'bg-primary text-primary-foreground dark:border dark:border-primary-edge/70',
                    secondary: 'bg-secondary text-secondary-foreground dark:border dark:border-secondary-edge/70',
                    accent: 'bg-accent text-accent-foreground dark:border dark:border-accent-edge/70',
                    support: 'bg-support text-support-foreground dark:border dark:border-support-edge/70',
                  }[s.role])
                : 'text-muted-foreground hover:text-foreground',
            )}>
              <div className="w-5 h-5 rounded-full bg-background/90 text-foreground text-[10px] font-bold flex items-center justify-center shrink-0">{i+1}</div>
              <div className="text-[12px] font-bold leading-tight">{s.t}</div>
            </button>
          ))}
        </div>
        <div key={a} className="flex-1 bg-muted/10 border border-border/60 rounded-lg p-4 animate-slide-in flex flex-col gap-2">
          <div className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Step {a+1} of 4</div>
          <div className="font-serif text-lg font-bold text-foreground">{steps[a].t}</div>
          <div className="text-xs text-foreground leading-relaxed">{steps[a].note}</div>
          <div className="mt-auto flex gap-1">
            {steps.map((s, i) => (
              <div key={i} className={cx(
                'flex-1 h-0.5 rounded-full transition-colors',
                i <= a ? {
                  primary: 'bg-primary-edge',
                  secondary: 'bg-secondary-edge',
                  accent: 'bg-accent-edge',
                  support: 'bg-support-edge',
                }[s.role] : 'bg-muted/20',
              )}/>
            ))}
          </div>
        </div>
      </div>
    </ShadShell>
  );
}

// ─── 4. Session boundary ───────────────────────────────────────────
function ShadSessionBoundary() {
  return (
    <ShadShell title="What persists vs. what doesn't" caption="Session is ephemeral — your folder is forever">
      <div className="w-full max-w-md">
        <Card className="flex items-center gap-2.5 px-3.5 py-2.5">
          <div className="w-3.5 h-2.5 rounded-sm bg-primary dark:bg-transparent dark:border dark:border-primary-edge"/>
          <div className="font-mono text-xs font-semibold text-foreground">~/Clients/Meridian/</div>
          <div className="ml-auto text-[10px] italic text-muted-foreground">persists</div>
        </Card>
        <div className="mt-3 border-2 border-dashed border-foreground/40 dark:border-primary-edge/50 rounded-lg px-3.5 pt-5 pb-3 relative bg-secondary/10">
          <div className="absolute -top-2 left-4 bg-card px-2 text-[10px] font-bold tracking-widest text-foreground">SESSION</div>
          <div className="flex gap-1.5 items-center flex-wrap">
            {['read','plan','write','done'].map((l, i) => (
              <Chip key={l} role={['primary','secondary','accent','support'][i]} className="!px-2 !py-0.5 !text-[10px]">{l}</Chip>
            ))}
            <div className="ml-auto text-[10px] italic text-muted-foreground animate-fade-blink">evaporates</div>
          </div>
        </div>
      </div>
    </ShadShell>
  );
}

// ─── 5. Fit-check decision tree ────────────────────────────────────
function ShadFitTree() {
  const [on, setOn] = React.useState(0);
  React.useEffect(() => { const z = setInterval(() => setOn(x => (x+1) % 2), 1600); return () => clearInterval(z); }, []);
  return (
    <ShadShell title="Fit check" caption="Is it a colleague task?">
      <div className="w-full max-w-xs">
        <div className="flex justify-center mb-3">
          <Card className="px-3 py-1.5"><span className="text-[11px] font-semibold text-foreground">The task you dread</span></Card>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground font-bold tracking-wider text-center mb-1">
          <div>MANY FILES?</div><div>ONE-OFF?</div>
        </div>
        <svg viewBox="0 0 200 30" className="w-full h-6 -mt-1 mb-1" preserveAspectRatio="none">
          <path d="M 100 0 L 50 28" strokeWidth={on === 0 ? 2 : 1} stroke={on === 0 ? 'hsl(var(--foreground))' : 'hsl(var(--muted))'} fill="none"/>
          <path d="M 100 0 L 150 28" strokeWidth={on === 1 ? 2 : 1} stroke={on === 1 ? 'hsl(var(--foreground))' : 'hsl(var(--muted))'} fill="none"/>
        </svg>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5 items-center">
            <Chip role="secondary" dim={on !== 0}>Yes — reads + writes</Chip>
            <Chip role="accent"    dim={on !== 0}>Colleague ✓</Chip>
          </div>
          <div className="flex flex-col gap-1.5 items-center">
            <Chip role="support" dim={on !== 1}>Single Q&amp;A</Chip>
            <Chip role="primary" dim={on !== 1}>Use chat</Chip>
          </div>
        </div>
      </div>
    </ShadShell>
  );
}

// ─── 6. Tradeoff matrix ────────────────────────────────────────────
function ShadTradeoffMatrix() {
  const rows = [
    ['INPUT',   'you transcribe',         'it reads files'],
    ['OUTPUT',  'one answer, copy-paste', 'files changed in place'],
    ['MEMORY',  'none',                   'CLAUDE.md, folder'],
    ['CONTROL', 'no approvals',           'you approve each step'],
  ];
  return (
    <ShadShell title="Vending machine vs. colleague" caption="Same model — different shape of use">
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-[1fr_110px_1fr] items-end mb-2">
          <Chip role="support" className="text-center">
            <div className="text-[12px] font-bold">Vending machine</div>
            <div className="text-[10px] opacity-75 font-normal">chatbot in browser</div>
          </Chip>
          <div/>
          <Chip role="secondary" className="text-center">
            <div className="text-[12px] font-bold">Colleague</div>
            <div className="text-[10px] opacity-75 font-normal">Claude Code in your folder</div>
          </Chip>
        </div>
        {rows.map(([lab, l, r]) => (
          <div key={lab} className="grid grid-cols-[1fr_110px_1fr] items-center py-2 border-t border-dashed border-border">
            <div className="text-[11px] text-right pr-3 text-foreground">{l}</div>
            <div className="text-[9.5px] tracking-[0.18em] font-bold text-muted-foreground text-center">{lab}</div>
            <div className="text-[11px] pl-3 text-foreground">{r}</div>
          </div>
        ))}
      </div>
    </ShadShell>
  );
}

// ─── 7. Comparison grid ────────────────────────────────────────────
function ShadComparison() {
  const [hi, setHi] = React.useState(1);
  const cols = [
    { era: 'WEB 1.0',   tag: 'read',         role: 'support',   body: 'static pages. you consume.' },
    { era: 'WEB 2.0',   tag: 'read + write', role: 'secondary', body: 'you post. it stores.' },
    { era: 'AGENT ERA', tag: 'do',           role: 'accent',    body: 'it acts on your files.' },
  ];
  return (
    <ShadShell title="Three eras of the browser" caption="Click a column to focus">
      <div className="grid grid-cols-3 w-full max-w-md">
        {cols.map((c, i) => (
          <div key={i} onClick={() => setHi(i)} className={cx(
            'p-3 cursor-pointer transition-all',
            i > 0 && 'border-l border-dashed border-border',
            hi === i ? '-translate-y-0.5 opacity-100' : 'opacity-55',
          )}>
            <div className="text-[9px] tracking-widest font-bold text-muted-foreground mb-1.5">{c.era}</div>
            <Chip role={c.role} className="!px-2 !py-0.5 !text-[10px] inline-block mb-2">{c.tag}</Chip>
            <div className="text-[11px] text-foreground leading-snug">{c.body}</div>
          </div>
        ))}
      </div>
    </ShadShell>
  );
}

// ─── 8. Failure table ──────────────────────────────────────────────
function ShadFailureTable() {
  const [open, setOpen] = React.useState(0);
  const rows = [
    { w: 'accept-all',    trap: 'bad file lands',    r: 'read each diff' },
    { w: 'vague prompt',  trap: 'guessed scope',     r: 'read-only first' },
    { w: 'no CLAUDE.md',  trap: 'generic tone',      r: 'folder context' },
  ];
  return (
    <ShadShell title="Failure modes" caption="Wrong → trap → right">
      <div className="w-full text-[11px]">
        <div className="grid grid-cols-3 gap-2 text-[9px] tracking-widest font-bold text-muted-foreground mb-1">
          <div>WRONG</div><div>TRAP</div><div>RIGHT</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} onClick={() => setOpen(i)} className={cx(
            'grid grid-cols-3 gap-2 items-center py-2 border-t border-dashed border-border cursor-pointer transition-colors',
            open === i && 'bg-primary/10 dark:bg-primary-edge/10',
          )}>
            <Chip role="accent" className="!px-1.5 !py-0.5 !text-[10px] inline-block w-fit">{r.w}</Chip>
            <div className="text-muted-foreground italic text-[10.5px]">{r.trap}</div>
            <Chip role="secondary" className="!px-1.5 !py-0.5 !text-[10px] inline-block w-fit">{r.r}</Chip>
          </div>
        ))}
      </div>
    </ShadShell>
  );
}

// ─── 9. Terminal replay ───────────────────────────────────────────
function ShadTerminal() {
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const delays = [1200, 1800, 2400];
    const t = setTimeout(() => setPhase(p => (p+1) % 3), delays[phase]);
    return () => clearTimeout(t);
  }, [phase]);
  return (
    <ShadShell title="A real approval moment" caption="Type → pause → approve">
      <div className="w-full max-w-md rounded-lg overflow-hidden border border-border bg-[#1a1714] shadow-xl font-mono text-[11px]">
        <div className="bg-[#2a241e] px-2.5 py-1.5 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-accent-edge"/>
          <div className="w-2 h-2 rounded-full bg-primary-edge"/>
          <div className="w-2 h-2 rounded-full bg-secondary-edge"/>
          <div className="flex-1 text-center text-[10px] text-white/50">~/Clients/Meridian · claude</div>
        </div>
        <div className="p-3 text-[#eae1cb] min-h-[120px]">
          <div><span className="text-secondary-edge">›</span> write follow-up-1.md</div>
          {phase >= 1 && (
            <div className="mt-2 animate-slide-in">
              <span className="text-primary-edge">claude</span> wants to create{' '}
              <span className="text-accent-edge">drafts/follow-up-1.md</span>
              <div className="text-white/60 text-[10px] mt-1">+ 34 lines · tone: direct nudge · amount: $4,200</div>
            </div>
          )}
          {phase === 1 && (
            <div className="flex gap-1.5 mt-2.5">
              <span className="bg-secondary-edge text-[#1a1714] px-2 py-0.5 rounded text-[10px] font-bold">[y] approve</span>
              <span className="bg-accent-edge text-[#1a1714] px-2 py-0.5 rounded text-[10px] font-bold">[n] deny</span>
              <span className="text-white/50 self-center animate-fade-blink">▌</span>
            </div>
          )}
          {phase === 2 && (
            <div className="mt-2.5 text-secondary-edge animate-slide-in">✓ wrote drafts/follow-up-1.md</div>
          )}
        </div>
      </div>
    </ShadShell>
  );
}

// ─── 10. Checklist ─────────────────────────────────────────────────
function ShadCheckList() {
  const [checked, setChecked] = React.useState({});
  const items = [
    { n: 1, t: 'Scoped folder',    role: 'primary' },
    { n: 2, t: 'Read-only first',  role: 'secondary' },
    { n: 3, t: 'Correct actively', role: 'accent' },
    { n: 4, t: 'Ask for structure', role: 'support' },
  ];
  return (
    <ShadShell title="Four habits" caption="Commit with a check">
      <div className="w-full flex flex-col gap-1.5">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-2.5 px-2.5 py-2 rounded-md bg-muted/10 border border-border/60">
            <Checkbox variant={it.role} checked={!!checked[i]} onChange={() => setChecked(c => ({ ...c, [i]: !c[i] }))} />
            <div className="text-[9px] font-bold text-muted-foreground tracking-widest">0{it.n}</div>
            <div className="text-[11.5px] font-semibold text-foreground">{it.t}</div>
          </div>
        ))}
      </div>
    </ShadShell>
  );
}

Object.assign(window, {
  ShadShell, Chip,
  ShadSequentialPulse, ShadOrbitalRing, ShadStoryboard, ShadSessionBoundary,
  ShadFitTree, ShadTradeoffMatrix, ShadComparison, ShadFailureTable,
  ShadTerminal, ShadCheckList,
});
