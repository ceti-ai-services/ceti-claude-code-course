// Retro Boardwalk diagram components — theme-aware (4 palettes × 2 modes).
// Every diagram reads colors via useTheme() — no raw hex in component code.

// ─── Shared shell ──────────────────────────────────────────────────────
function PreviewShell({ title, caption, children }) {
  const t = useTheme();
  return (
    <div style={{
      background: t.isDark ? '#0D0B12' : '#121212',
      padding: '22px 26px 24px',
      borderRadius: 6,
      fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}>
      <div style={{
        fontSize: 10, letterSpacing: 2, fontWeight: 600,
        color: 'rgba(255,255,255,.45)',
      }}>LIVE DIAGRAM PREVIEW</div>
      <div style={{
        background: t.bg,
        borderRadius: 14,
        padding: 28,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: t.isDark
          ? 'inset 0 0 0 1px rgba(255,255,255,.04)'
          : 'inset 0 0 0 1px rgba(0,0,0,.04)',
      }}>
        {title && (
          <div style={{ fontSize: 16, fontWeight: 700, color: t.ink, letterSpacing: -0.2, fontFamily: '"Fraunces", Georgia, serif' }}>
            {title}
          </div>
        )}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
          {children}
        </div>
        {caption && (
          <div style={{ fontSize: 12, fontStyle: 'italic', color: t.dim }}>
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}

// keyframes (once)
if (!document.getElementById('rb-anim')) {
  const s = document.createElement('style');
  s.id = 'rb-anim';
  s.textContent = `
    @keyframes rb-travel {
      0%   { transform: translateX(0);   opacity: 0; }
      15%  { opacity: 1; } 85%  { opacity: 1; }
      100% { transform: translateX(var(--rb-dx, 100%)); opacity: 0; }
    }
    @keyframes rb-fade { 0%,100% { opacity: .35 } 50% { opacity: 1 } }
    @keyframes rb-blink { 0%, 60% { opacity: 1 } 70%, 100% { opacity: 0 } }
    @keyframes rb-slide-in { from { transform: translateY(6px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
    @keyframes rb-dash { to { stroke-dashoffset: -20; } }
    @keyframes rb-rise { 0% { transform: translateY(12px); opacity: 0 } 100% { transform: translateY(0); opacity: 1 } }
    @keyframes rb-pulse {
      0%, 100% { transform: translateY(0) scale(1); }
      50%      { transform: translateY(-3px) scale(1.03); }
    }
    .rb-step-card { border-radius: 10px; padding: 14px 16px; min-width: 132px; text-align: center; transition: all .3s; }
  `;
  document.head.appendChild(s);
}

// Build one "role chip" — the canonical colored-node treatment.
function Chip({ role, children, active, style, onClick }) {
  const t = useTheme();
  const rs = roleStyle(t, role);
  return (
    <div onClick={onClick} style={{
      ...rs,
      borderRadius: 10, padding: '10px 14px',
      cursor: onClick ? 'pointer' : 'default',
      boxShadow: active
        ? (t.isDark
            ? `0 0 0 2px ${rs.edgeColor}44, 0 8px 20px rgba(0,0,0,.35)`
            : '0 10px 24px rgba(42,36,30,.14), 0 0 0 2px rgba(42,36,30,.10)')
        : (t.isDark ? '0 1px 0 rgba(0,0,0,.4)' : '0 1px 0 rgba(0,0,0,.06)'),
      transform: active ? 'translateY(-3px) scale(1.03)' : 'none',
      opacity: active === false ? 0.65 : 1,
      transition: 'all .3s',
      ...style,
    }}>{children}</div>
  );
}

// ─── V1 Sequential pulse ──────────────────────────────────────────────
function V1SequentialPulse() {
  const t = useTheme();
  const [active, setActive] = React.useState(0);
  React.useEffect(() => { const z = setInterval(() => setActive(a => (a+1) % 4), 1100); return () => clearInterval(z); }, []);
  const steps = [
    { title: 'Perceive', sub: 'read context',  role: 'primary' },
    { title: 'Reason',   sub: 'plan + decide', role: 'secondary' },
    { title: 'Act',      sub: 'tool calls',    role: 'accent' },
    { title: 'Observe',  sub: 'tests pass?',   role: 'support' },
  ];
  return (
    <PreviewShell title="PRAO loop" caption="Four phases — one complete session">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'space-between' }}>
        {steps.map((s, i) => (
          <React.Fragment key={s.title}>
            <Chip role={s.role} active={active === i}>
              <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 2 }}>{s.title}</div>
              <div style={{ fontSize: 11, opacity: .75 }}>{s.sub}</div>
            </Chip>
            {i < 3 && (
              <div style={{ position: 'relative', flex: '0 0 22px', height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 22, height: 2, background: active === i ? t.ink : (t.isDark ? 'rgba(255,255,255,.2)' : 'rgba(42,36,30,.25)'), transition: 'background .3s' }}/>
                {active === i && <div style={{ position: 'absolute', left: 0, top: 4, width: 6, height: 6, borderRadius: 3, background: t.ink, animation: 'rb-travel 1s linear', ['--rb-dx']: '22px' }}/>}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </PreviewShell>
  );
}

// ─── V2 Orbital ring ───────────────────────────────────────────────────
function V2OrbitalRing() {
  const t = useTheme();
  const [active, setActive] = React.useState(0);
  React.useEffect(() => { const z = setInterval(() => setActive(a => (a+1) % 4), 1400); return () => clearInterval(z); }, []);
  const R = 82, cx = 140, cy = 110;
  const pts = [0,1,2,3].map(i => { const a = (-Math.PI/2) + i * (Math.PI/2); return { x: cx + Math.cos(a)*R, y: cy + Math.sin(a)*R }; });
  const nodes = [
    { title: 'Perceive', role: 'primary' },
    { title: 'Reason',   role: 'secondary' },
    { title: 'Act',      role: 'accent' },
    { title: 'Observe',  role: 'support' },
  ];
  const dotColor = roleStyle(t, 'accent').edgeColor;
  return (
    <PreviewShell title="PRAO as a cycle" caption="Closed loop — the dot never stops">
      <div style={{ position: 'relative', width: 280, height: 220 }}>
        <svg width="280" height="220" style={{ position: 'absolute', inset: 0 }}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke={t.ink} strokeOpacity={t.isDark ? .3 : .18} strokeWidth="1.5" strokeDasharray="4 4"/>
          <circle r="6" fill={dotColor} stroke={t.isDark ? t.bg : t.ink} strokeWidth="1.5">
            <animateMotion dur="5.6s" repeatCount="indefinite"
              path={`M ${cx} ${cy-R} A ${R} ${R} 0 0 1 ${cx+R} ${cy} A ${R} ${R} 0 0 1 ${cx} ${cy+R} A ${R} ${R} 0 0 1 ${cx-R} ${cy} A ${R} ${R} 0 0 1 ${cx} ${cy-R}`}/>
          </circle>
        </svg>
        {pts.map((p, i) => (
          <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%,-50%)' }}>
            <Chip role={nodes[i].role} active={active === i} style={{ minWidth: 72, textAlign: 'center', padding: '6px 10px' }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{nodes[i].title}</div>
            </Chip>
          </div>
        ))}
        <div style={{ position: 'absolute', left: cx, top: cy, transform: 'translate(-50%,-50%)', textAlign: 'center', width: 90, pointerEvents: 'none' }}>
          <div style={{ fontSize: 9, letterSpacing: 1.5, color: t.dim, fontWeight: 600 }}>NOW</div>
          <div key={active} style={{ fontSize: 14, fontWeight: 700, color: t.ink, animation: 'rb-slide-in .35s ease-out' }}>{nodes[active].title}</div>
        </div>
      </div>
    </PreviewShell>
  );
}

// ─── V3 Session boundary ───────────────────────────────────────────────
function V3SessionBoundary() {
  const t = useTheme();
  const prim = roleStyle(t, 'primary').edgeColor;
  return (
    <PreviewShell title="What persists vs. what doesn't" caption="Session is ephemeral — your folder is forever">
      <div style={{ width: '100%', maxWidth: 420, position: 'relative', padding: '8px 0' }}>
        <div style={{ background: t.surface, border: `1.5px solid ${t.ink}`, borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 14, height: 10, borderRadius: 2, background: prim, border: `1px solid ${t.ink}` }}/>
          <div style={{ fontSize: 12, fontWeight: 600, color: t.ink, fontFamily: 'ui-monospace, monospace' }}>~/Clients/Meridian/</div>
          <div style={{ marginLeft: 'auto', fontSize: 10, color: t.dim, fontStyle: 'italic' }}>persists</div>
        </div>
        <div style={{ marginTop: 14, border: `1.5px dashed ${t.ink}`, borderRadius: 10, padding: '18px 14px 14px', position: 'relative', background: t.isDark ? 'rgba(255,255,255,.03)' : 'rgba(154,208,186,.18)' }}>
          <div style={{ position: 'absolute', top: -10, left: 14, background: t.bg, padding: '0 8px', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: t.ink }}>SESSION</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {['read','plan','write','done'].map((label, i) => {
              const role = ['primary','secondary','accent','support'][i];
              return <Chip key={label} role={role} style={{ fontSize: 11, fontWeight: 600, padding: '5px 10px', borderRadius: 5 }}>{label}</Chip>;
            })}
            <div style={{ marginLeft: 'auto', fontSize: 10, color: t.dim, fontStyle: 'italic', animation: 'rb-blink 3s infinite' }}>evaporates</div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

// ─── V4 Tradeoff matrix ────────────────────────────────────────────────
function V4TradeoffMatrix() {
  const t = useTheme();
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => { const z = setInterval(() => setTick(x => x+1), 2600); return () => clearInterval(z); }, []);
  const rows = [
    ['INPUT',   'you transcribe',         'it reads files'],
    ['OUTPUT',  'one answer, copy-paste', 'files changed in place'],
    ['MEMORY',  'none',                   'CLAUDE.md, folder'],
    ['CONTROL', 'no approvals',           'you approve each step'],
  ];
  return (
    <PreviewShell title="Vending machine vs. colleague" caption="Same model — different shape of use">
      <div style={{ width: '100%', maxWidth: 460 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 1fr', alignItems: 'end', marginBottom: 10 }}>
          <Chip role="support" active={tick % 2 === 0} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Vending machine</div>
            <div style={{ fontSize: 10, opacity: .75 }}>chatbot in browser</div>
          </Chip>
          <div/>
          <Chip role="secondary" active={tick % 2 === 1} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Colleague</div>
            <div style={{ fontSize: 10, opacity: .75 }}>Claude Code in your folder</div>
          </Chip>
        </div>
        {rows.map(([label, l, r]) => (
          <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr 110px 1fr', alignItems: 'center', padding: '8px 0', borderTop: `1px dashed ${t.line}` }}>
            <div style={{ fontSize: 11, textAlign: 'right', color: t.ink, paddingRight: 10 }}>{l}</div>
            <div style={{ fontSize: 10, letterSpacing: 1.5, fontWeight: 700, color: t.dim, textAlign: 'center' }}>{label}</div>
            <div style={{ fontSize: 11, color: t.ink, paddingLeft: 10 }}>{r}</div>
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

// ─── V5 Scatter flow ───────────────────────────────────────────────────
function V5ScatterFlow() {
  const t = useTheme();
  const pts = [
    { x: 50,  y: 150, label: 'one-off FAQ',      role: 'support',   ok: false },
    { x: 120, y: 90,  label: 'caption batch',    role: 'primary',   ok: true },
    { x: 195, y: 60,  label: 'client followups', role: 'secondary', ok: true },
    { x: 270, y: 35,  label: 'weekly recon',     role: 'accent',    ok: true },
    { x: 230, y: 130, label: 'comp analysis',    role: 'primary',   ok: true },
    { x: 70,  y: 180, label: 'one-shot Q',       role: 'support',   ok: false },
  ];
  const path = pts.filter(p => p.ok);
  const dotColor = roleStyle(t, 'accent').edgeColor;
  return (
    <PreviewShell title="Which tasks fit the colleague shape?" caption="Top-right = high leverage, repeats weekly, spans many files">
      <div style={{ position: 'relative', width: 340, height: 230 }}>
        <svg width="340" height="230" style={{ position: 'absolute', inset: 0 }}>
          <line x1="20" y1="210" x2="330" y2="210" stroke={t.ink} strokeOpacity={t.isDark ? .4 : .5} strokeWidth="1.2"/>
          <line x1="20" y1="210" x2="20"  y2="20"  stroke={t.ink} strokeOpacity={t.isDark ? .4 : .5} strokeWidth="1.2"/>
          <text x="330" y="224" fontSize="9" fill={t.dim} textAnchor="end" fontFamily="ui-monospace, monospace">repeats weekly →</text>
          <text x="14"  y="20"  fontSize="9" fill={t.dim} textAnchor="end" transform="rotate(-90 14 20)" fontFamily="ui-monospace, monospace">← spans many files</text>
          <path d={path.map((p,i) => `${i===0?'M':'L'} ${p.x} ${p.y}`).join(' ')} fill="none" stroke={t.ink} strokeWidth="1.6" strokeOpacity={t.isDark ? .55 : .45} strokeDasharray="6 4" style={{ animation: 'rb-dash 1.4s linear infinite' }}/>
          <circle r="4" fill={dotColor} stroke={t.isDark ? t.bg : t.ink} strokeWidth="1.2">
            <animateMotion dur="4s" repeatCount="indefinite" path={path.map((p,i) => `${i===0?'M':'L'} ${p.x} ${p.y}`).join(' ')}/>
          </circle>
        </svg>
        {pts.map((p, i) => {
          const rs = roleStyle(t, p.role);
          return (
            <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: p.ok ? 14 : 10, height: p.ok ? 14 : 10, borderRadius: '50%', background: rs.background, border: t.isDark ? `1.5px solid ${rs.edgeColor}` : `1.5px solid ${p.ok ? t.ink : 'rgba(42,36,30,.35)'}`, opacity: p.ok ? 1 : 0.55 }}/>
              <div style={{ fontSize: 10.5, color: p.ok ? t.ink : t.dim, fontWeight: p.ok ? 600 : 500, opacity: p.ok ? 1 : 0.7, whiteSpace: 'nowrap', fontFamily: 'ui-monospace, "SF Mono", monospace' }}>{p.label}</div>
            </div>
          );
        })}
      </div>
    </PreviewShell>
  );
}

// ─── V6 Three moves terminal ───────────────────────────────────────────
function V6ThreeMoves() {
  const t = useTheme();
  const [step, setStep] = React.useState(0);
  React.useEffect(() => { const z = setInterval(() => setStep(x => (x+1) % 3), 2400); return () => clearInterval(z); }, []);
  const moves = [
    { stamp: '1. READ',    role: 'primary',   cmd: 'read every file in this folder',          reply: '✓ 10 clips — ADHD tips, studio tour, cold brew…' },
    { stamp: '2. PLAN',    role: 'secondary', cmd: 'draft 10 captions, show 3 first',         reply: '→ drafting 3 captions to check tone…' },
    { stamp: '3. EXECUTE', role: 'accent',    cmd: 'write these into captions-wk-16.md',      reply: '✓ wrote captions-wk-16.md (approved)' },
  ];
  return (
    <PreviewShell title="The three-move session" caption="Read → plan → execute. Every real task.">
      <div style={{
        width: '100%', maxWidth: 460,
        background: t.isDark ? t.surface : '#fffdf6',
        borderRadius: 10, padding: 14,
        boxShadow: t.isDark ? `inset 0 0 0 1px ${t.line}` : 'inset 0 0 0 1px rgba(42,36,30,.12)',
        fontFamily: 'ui-monospace, "SF Mono", monospace', fontSize: 12, color: t.ink,
      }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {moves.map((m, i) => {
            const rs = roleStyle(t, m.role);
            return (
              <div key={m.stamp} style={{
                ...rs, fontSize: 9, letterSpacing: 1.2, fontWeight: 700,
                padding: '4px 8px', borderRadius: 4,
                opacity: step >= i ? 1 : 0.35, transition: 'opacity .3s',
              }}>{m.stamp}</div>
            );
          })}
        </div>
        {moves.map((m, i) => {
          const rs = roleStyle(t, m.role);
          return (
            <div key={i} style={{ opacity: step >= i ? 1 : 0.25, transition: 'opacity .4s', marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 6, lineHeight: 1.4 }}>
                <span style={{ color: rs.edgeColor, fontWeight: 700 }}>›</span>
                <span style={{ flex: 1 }}>{m.cmd}</span>
              </div>
              <div style={{ color: t.dim, paddingLeft: 14, fontSize: 11, lineHeight: 1.4 }}>
                {m.reply}
                {step === i && <span style={{ animation: 'rb-fade 1s infinite', marginLeft: 2 }}>▌</span>}
              </div>
            </div>
          );
        })}
      </div>
    </PreviewShell>
  );
}

// ─── V7 Storyboard ────────────────────────────────────────────────────
function V7Storyboard() {
  const t = useTheme();
  const steps = [
    { title: 'Perceive', sub: 'read context',  role: 'primary',   note: 'Claude opens every .md in the folder. No edits yet.' },
    { title: 'Reason',   sub: 'plan + decide', role: 'secondary', note: 'Drafts a plan in chat. You correct scope before any write.' },
    { title: 'Act',      sub: 'tool calls',    role: 'accent',    note: 'Proposes each file write. You approve, one at a time.' },
    { title: 'Observe',  sub: 'tests pass?',   role: 'support',   note: 'Summarizes what changed. Catches the one it forgot.' },
  ];
  const [active, setActive] = React.useState(0);
  React.useEffect(() => { const z = setInterval(() => setActive(x => (x+1) % 4), 2000); return () => clearInterval(z); }, []);
  return (
    <PreviewShell title="PRAO — narrated" caption="Click through each phase; commentary updates in place">
      <div style={{ display: 'flex', gap: 18, width: '100%', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: '0 0 148px' }}>
          {steps.map((s, i) => {
            const rs = roleStyle(t, s.role);
            return (
              <button key={s.title} onClick={() => setActive(i)} style={{
                all: 'unset', cursor: 'pointer', padding: '10px 12px', borderRadius: 8,
                ...rs, display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: active === i
                  ? (t.isDark ? `0 0 0 2px ${rs.edgeColor}44, 0 6px 16px rgba(0,0,0,.35)` : '0 6px 16px rgba(42,36,30,.16), 0 0 0 2px rgba(42,36,30,.15)')
                  : 'none',
                transform: active === i ? 'translateX(4px)' : 'translateX(0)',
                opacity: active === i ? 1 : 0.72,
                transition: 'all .3s',
              }}>
                <div style={{ width: 18, height: 18, borderRadius: 9, background: t.ink, color: rs.edgeColor, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i+1}</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700 }}>{s.title}</div>
                  <div style={{ fontSize: 10, opacity: .75 }}>{s.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
        <div key={active} style={{
          flex: 1, background: t.surface, borderRadius: 10, padding: 16, color: t.ink,
          boxShadow: `inset 0 0 0 1px ${t.line}`,
          animation: 'rb-slide-in .4s ease',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: t.dim }}>STEP {active+1} OF 4</div>
          <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, fontFamily: '"Fraunces", Georgia, serif' }}>{steps[active].title}</div>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: t.ink }}>{steps[active].note}</div>
          <div style={{ marginTop: 'auto', display: 'flex', gap: 4 }}>
            {steps.map((s, i) => {
              const rs = roleStyle(t, s.role);
              return <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= active ? rs.edgeColor : (t.isDark ? 'rgba(255,255,255,.1)' : 'rgba(42,36,30,.12)'), transition: 'background .3s' }}/>;
            })}
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

// ─── V8 Decision tree ──────────────────────────────────────────────────
function V8DecisionTree() {
  const t = useTheme();
  const [on, setOn] = React.useState(0);
  React.useEffect(() => { const z = setInterval(() => setOn(x => (x+1) % 2), 1600); return () => clearInterval(z); }, []);
  const chip = (text, role, dim, key) => {
    const rs = roleStyle(t, role);
    return <div key={key} style={{ ...rs, padding: '8px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, opacity: dim ? 0.35 : 1, transition: 'opacity .35s', whiteSpace: 'nowrap' }}>{text}</div>;
  };
  return (
    <PreviewShell title="Fit check — is this a colleague task?" caption="Decision tree that lights up the right path">
      <div style={{ width: '100%', maxWidth: 460, position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <div style={{ background: t.surface, border: `1px solid ${t.line}`, color: t.ink, padding: '8px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600 }}>The task you dread</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10, fontSize: 10, color: t.dim, fontWeight: 600, letterSpacing: 1 }}>
          <div style={{ textAlign: 'center' }}>MANY FILES?</div>
          <div style={{ textAlign: 'center' }}>ONE-OFF?</div>
        </div>
        <svg width="100%" height="40" viewBox="0 0 460 40" style={{ marginTop: -40, marginBottom: 2 }} preserveAspectRatio="none">
          <path d="M 230 0 L 115 38" stroke={on === 0 ? t.ink : (t.isDark ? 'rgba(255,255,255,.2)' : 'rgba(42,36,30,.2)')} strokeWidth={on === 0 ? 2 : 1.4} fill="none" strokeLinecap="round"/>
          <path d="M 230 0 L 345 38" stroke={on === 1 ? t.ink : (t.isDark ? 'rgba(255,255,255,.2)' : 'rgba(42,36,30,.2)')} strokeWidth={on === 1 ? 2 : 1.4} fill="none" strokeLinecap="round"/>
        </svg>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            {chip('Yes — reads + writes', 'secondary', on !== 0, 'a')}
            {chip('Colleague ✓',          'accent',    on !== 0, 'b')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            {chip('No — single Q&A', 'support', on !== 1, 'c')}
            {chip('Use chat',        'primary', on !== 1, 'd')}
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

Object.assign(window, {
  PreviewShell, Chip,
  V1SequentialPulse, V2OrbitalRing, V3SessionBoundary, V4TradeoffMatrix,
  V5ScatterFlow, V6ThreeMoves, V7Storyboard, V8DecisionTree,
});
