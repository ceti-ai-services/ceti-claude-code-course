// Extended pattern library — theme-aware.
// RB.lilac→primary · RB.mint→secondary · RB.coral→accent · RB.slate→support.
// In dark mode the color lives in the luminous border; in light it's the fill.

function _chipStyle(t, role) {
  return roleStyle(t, role);
}

// ─── P1 · Comparison grid (N parallel concepts) ─────────────────────
function PComparisonGrid() {
  const t = useTheme();
  const [hi, setHi] = React.useState(1);
  const cols = [
    { era: 'WEB 1.0',   tag: 'read',         role: 'support',   body: 'static pages. you consume.' },
    { era: 'WEB 2.0',   tag: 'read + write', role: 'secondary', body: 'you post. it stores.' },
    { era: 'AGENT ERA', tag: 'do',           role: 'accent',    body: 'it acts on your files.' },
  ];
  return (
    <PreviewShell title="Three eras of the browser" caption="Columns share anatomy — actor → verb → outcome">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', width: '100%', maxWidth: 520 }}>
        {cols.map((c, i) => {
          const rs = _chipStyle(t, c.role);
          return (
            <div key={i} onClick={() => setHi(i)} style={{
              padding: '16px 14px',
              borderLeft: i > 0 ? `1px dashed ${t.line}` : 'none',
              cursor: 'pointer', transition: 'transform .25s, opacity .25s',
              transform: hi === i ? 'translateY(-2px)' : 'none',
              opacity: hi === i ? 1 : 0.58,
            }}>
              <div style={{ fontSize: 9, letterSpacing: 1.5, fontWeight: 700, color: t.dim, marginBottom: 6 }}>{c.era}</div>
              <div style={{
                ...rs, borderRadius: 6, padding: '6px 10px',
                fontSize: 11, fontWeight: 600, display: 'inline-block', marginBottom: 8,
              }}>{c.tag}</div>
              <div style={{ fontSize: 11, color: t.ink, lineHeight: 1.4 }}>{c.body}</div>
            </div>
          );
        })}
      </div>
    </PreviewShell>
  );
}

// ─── P2 · Failure-mode table (wrong → trap → right) ──────────────────
function PFailureTable() {
  const t = useTheme();
  const [open, setOpen] = React.useState(0);
  const wrongStyle = _chipStyle(t, 'accent');
  const rightStyle = _chipStyle(t, 'secondary');
  const rows = [
    { wrong: 'accept-all approvals', trap: 'file lands in wrong folder', right: 'read each diff' },
    { wrong: 'vague first prompt',   trap: 'claude guesses scope',        right: 'read-only first' },
    { wrong: 'no CLAUDE.md',         trap: 'generic tone',                right: 'folder-local context' },
  ];
  return (
    <PreviewShell title="Three failure modes" caption="Click a row to see the correction">
      <div style={{ width: '100%', maxWidth: 500, fontSize: 11 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, fontSize: 9, letterSpacing: 1.5, fontWeight: 700, color: t.dim, marginBottom: 6 }}>
          <div>WRONG WAY</div><div>THE TRAP</div><div>RIGHT WAY</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} onClick={() => setOpen(i)} style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10,
            alignItems: 'center', padding: '10px 0',
            borderTop: `1px dashed ${t.line}`,
            cursor: 'pointer',
            background: open === i ? (t.isDark ? 'rgba(255,255,255,.04)' : 'rgba(196,174,226,.18)') : 'transparent',
            transition: 'background .2s',
          }}>
            <div style={{ ...wrongStyle, padding: '4px 8px', borderRadius: 4, fontWeight: 600, justifySelf: 'start' }}>{r.wrong}</div>
            <div style={{ color: t.dim, fontStyle: 'italic' }}>{r.trap}</div>
            <div style={{ ...rightStyle, padding: '4px 8px', borderRadius: 4, fontWeight: 600, justifySelf: 'start' }}>{r.right}</div>
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

// ─── P3 · Phase tabs + reveal panel ─────────────────────────────────
function PPhaseTabs() {
  const t = useTheme();
  const [tab, setTab] = React.useState(0);
  const tabs = [
    { name: 'Perceive', role: 'primary',   label: 'input',    fail: 'skipping this step',    detail: 'Read every file first. No writes. No plan yet.' },
    { name: 'Reason',   role: 'secondary', label: 'planning', fail: 'accepting first plan',  detail: 'Ask what claude would do. Correct scope now.' },
    { name: 'Act',      role: 'accent',    label: 'output',   fail: 'accept-all approvals',  detail: 'Each write is a checkpoint. Read the diff.' },
    { name: 'Observe',  role: 'support',   label: 'review',   fail: 'skipping the summary',  detail: 'Summarize what changed. Catch the missed file.' },
  ];
  const active = tabs[tab];
  const failColor = _chipStyle(t, 'accent').edgeColor;
  return (
    <PreviewShell title="Phases — pick one" caption="One tab, three facets: role · failure · detail">
      <div style={{ width: '100%', maxWidth: 500 }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
          {tabs.map((x, i) => {
            const rs = _chipStyle(t, x.role);
            return (
              <button key={x.name} onClick={() => setTab(i)} style={{
                all: 'unset', flex: 1, cursor: 'pointer',
                padding: '7px 6px', borderRadius: 6, textAlign: 'center',
                ...(tab === i ? rs : { background: 'transparent', color: t.ink, border: 'none' }),
                fontSize: 11, fontWeight: 600,
                opacity: tab === i ? 1 : 0.55,
                boxShadow: tab === i ? (t.isDark ? `0 0 0 1px ${rs.edgeColor}44` : '0 4px 10px rgba(42,36,30,.12)') : 'none',
                transition: 'all .2s',
              }}>{x.name}</button>
            );
          })}
        </div>
        <div key={tab} style={{
          background: t.surface, borderRadius: 8, padding: 14,
          color: t.ink,
          animation: 'rb-slide-in .3s ease',
          boxShadow: `inset 0 0 0 1px ${t.line}`,
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 14px',
          fontSize: 11,
        }}>
          <div style={{ color: t.dim, fontWeight: 600 }}>Role</div>
          <div>{active.label}</div>
          <div style={{ color: t.dim, fontWeight: 600 }}>Fail mode</div>
          <div style={{ color: failColor, fontStyle: 'italic' }}>{active.fail}</div>
          <div style={{ color: t.dim, fontWeight: 600 }}>Detail</div>
          <div>{active.detail}</div>
        </div>
      </div>
    </PreviewShell>
  );
}

// ─── P4 · Traced example (ordered, click-to-reveal) ──────────────────
function PTracedExample() {
  const t = useTheme();
  const [open, setOpen] = React.useState(1);
  const steps = [
    { phase: 'read',  role: 'primary',   desc: 'list captions in folder',          artifact: 'ls *.md  →  20 files' },
    { phase: 'read',  role: 'primary',   desc: 'summarize each clip',              artifact: '1. adhd tip · 2. studio tour · 3. cold brew…' },
    { phase: 'plan',  role: 'secondary', desc: 'show me 3 captions first',         artifact: 'draft → check tone → then the other 7' },
    { phase: 'act',   role: 'accent',    desc: 'write captions-wk-16.md',          artifact: '✓ wrote 10 captions (approved)' },
    { phase: 'obs.',  role: 'support',   desc: 'summarize & flag skimmed files',   artifact: '⚠ skimmed clip 7 — please verify' },
  ];
  return (
    <PreviewShell title="Traced example" caption="Numbered steps with click-to-reveal artifacts">
      <div style={{ width: '100%', maxWidth: 480 }}>
        {steps.map((s, i) => {
          const rs = _chipStyle(t, s.role);
          return (
            <div key={i} onClick={() => setOpen(open === i ? -1 : i)} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '8px 10px', cursor: 'pointer', borderRadius: 6,
              background: open === i ? (t.isDark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.55)') : 'transparent',
              transition: 'background .2s',
            }}>
              <div style={{
                ...rs, fontSize: 9, fontWeight: 700, letterSpacing: 1,
                padding: '3px 6px', borderRadius: 3, flexShrink: 0, marginTop: 1,
                minWidth: 40, textAlign: 'center',
              }}>{s.phase.toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11.5, color: t.ink, fontWeight: 500 }}>
                  {i + 1}. {s.desc}
                </div>
                {open === i && (
                  <div style={{
                    fontFamily: 'ui-monospace, monospace', fontSize: 10.5,
                    color: t.dim, marginTop: 4, paddingLeft: 2,
                    animation: 'rb-slide-in .2s ease',
                  }}>{s.artifact}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PreviewShell>
  );
}

// ─── P5 · Fillable builder (live preview) ───────────────────────────
function PFillableBuilder() {
  const t = useTheme();
  const [name, setName] = React.useState('Meridian');
  const [voice, setVoice] = React.useState('deadpan');
  const [tools, setTools] = React.useState(true);
  const pE = _chipStyle(t, 'primary').edgeColor;
  const sE = _chipStyle(t, 'secondary').edgeColor;
  return (
    <PreviewShell title="Build your CLAUDE.md" caption="Type on the left — preview updates on the right">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, width: '100%', maxWidth: 520, fontSize: 11 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label style={{ color: t.dim, fontWeight: 600, fontSize: 10, letterSpacing: 1 }}>CLIENT NAME</label>
          <input value={name} onChange={e => setName(e.target.value)} style={{
            background: t.surface, border: `1px solid ${t.line}`, borderRadius: 4,
            padding: '6px 8px', fontSize: 11, color: t.ink, outline: 'none',
          }}/>
          <label style={{ color: t.dim, fontWeight: 600, fontSize: 10, letterSpacing: 1 }}>VOICE</label>
          <select value={voice} onChange={e => setVoice(e.target.value)} style={{
            background: t.surface, border: `1px solid ${t.line}`, borderRadius: 4,
            padding: '6px 8px', fontSize: 11, color: t.ink, outline: 'none',
          }}>
            <option>deadpan</option><option>warm</option><option>formal</option>
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: t.ink, fontSize: 11, marginTop: 2 }}>
            <input type="checkbox" checked={tools} onChange={e => setTools(e.target.checked)} />
            Auto-approve read-only tools
          </label>
        </div>
        <div style={{
          background: '#1a1714', color: '#eae1cb', borderRadius: 6,
          padding: 10, fontFamily: 'ui-monospace, monospace', fontSize: 10.5,
          lineHeight: 1.5, whiteSpace: 'pre-wrap',
        }}>
          <span style={{ color: pE }}># CLAUDE.md</span>{'\n'}
          <span style={{ color: sE }}>client</span>: {name}{'\n'}
          <span style={{ color: sE }}>voice</span>: {voice}{'\n'}
          <span style={{ color: sE }}>approve</span>: {tools ? 'read-only' : 'always ask'}
        </div>
      </div>
    </PreviewShell>
  );
}

// ─── P6 · Decision fork ─────────────────────────────────────────────
function PDecisionFork() {
  const t = useTheme();
  const [pick, setPick] = React.useState(null);
  const opts = [
    { label: 'Accept all',     role: 'accent',    result: 'fast, but one bad write ruins the run.' },
    { label: 'Read each diff', role: 'secondary', result: 'slower early, zero surprises by step 10.' },
  ];
  return (
    <PreviewShell title="How will you handle approvals?" caption="Pick one — consequence appears">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', width: '100%' }}>
        <div style={{ fontSize: 12, color: t.ink, fontWeight: 600 }}>Claude is about to write 10 files. You…</div>
        <div style={{ display: 'flex', gap: 12 }}>
          {opts.map((o, i) => {
            const rs = _chipStyle(t, o.role);
            return (
              <button key={i} onClick={() => setPick(i)} style={{
                all: 'unset', cursor: pick === null || pick === i ? 'pointer' : 'default',
                ...rs, fontSize: 12, fontWeight: 600,
                padding: '10px 16px', borderRadius: 8,
                opacity: pick === null ? 1 : pick === i ? 1 : 0.35,
                transform: pick === i ? 'translateY(-3px)' : 'none',
                boxShadow: pick === i
                  ? (t.isDark ? `0 0 0 2px ${rs.edgeColor}44, 0 8px 18px rgba(0,0,0,.4)` : '0 8px 18px rgba(42,36,30,.15)')
                  : (t.isDark ? '0 1px 0 rgba(0,0,0,.3)' : '0 1px 0 rgba(0,0,0,.06)'),
                transition: 'all .25s',
              }}>{o.label}</button>
            );
          })}
        </div>
        {pick !== null && (
          <div style={{
            fontSize: 11, fontStyle: 'italic', color: t.ink,
            background: t.surface, borderRadius: 8, padding: '10px 14px',
            maxWidth: 360, textAlign: 'center',
            animation: 'rb-slide-in .3s ease',
            boxShadow: `inset 0 0 0 1px ${t.line}`,
          }}>
            → {opts[pick].result}
            <button onClick={() => setPick(null)} style={{
              all: 'unset', marginLeft: 10, color: t.dim, cursor: 'pointer',
              fontSize: 10, textDecoration: 'underline',
            }}>reset</button>
          </div>
        )}
      </div>
    </PreviewShell>
  );
}

// ─── P7 · File tree ─────────────────────────────────────────────────
function PFileTree() {
  const t = useTheme();
  const [hover, setHover] = React.useState(null);
  const items = [
    { depth: 0, name: '~/Clients/Meridian/', hint: 'scoped working folder',      icon: '📁', role: 'primary' },
    { depth: 1, name: 'CLAUDE.md',            hint: 'context Claude reads first', icon: '▤',  role: 'secondary' },
    { depth: 1, name: 'proposal.pdf',         hint: 'read as text',                icon: '▤',  role: null },
    { depth: 1, name: 'threads/',             hint: '.eml files — past email',     icon: '📁', role: null },
    { depth: 2, name: 'thread-241.eml',       hint: 'Gmail → Download message',    icon: '▤',  role: null },
    { depth: 1, name: 'drafts/',              hint: 'where Claude writes',         icon: '📁', role: 'accent' },
    { depth: 2, name: 'follow-up-1.md',       hint: 'newest artifact',             icon: '▤',  role: 'accent' },
  ];
  return (
    <PreviewShell title="Anatomy of a working folder" caption="Hover any row for what it's for">
      <div style={{
        width: '100%', maxWidth: 460,
        fontFamily: 'ui-monospace, "SF Mono", monospace',
        fontSize: 11.5, color: t.ink, lineHeight: 1.7,
      }}>
        {items.map((it, i) => {
          const rs = it.role ? _chipStyle(t, it.role) : null;
          const hoverBg = _chipStyle(t, 'secondary').edgeColor;
          return (
            <div key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: `3px 0 3px ${it.depth * 20}px`,
              background: hover === i ? (t.isDark ? `${hoverBg}18` : 'rgba(154,208,186,.22)') : 'transparent',
              transition: 'background .15s', borderRadius: 3,
            }}>
              <span style={{ width: 14 }}>{it.icon}</span>
              <span style={rs ? {
                background: rs.background, color: rs.color, border: rs.border,
                padding: '1px 6px', borderRadius: 3, fontWeight: 600,
              } : { fontWeight: 400, color: t.ink }}>{it.name}</span>
              {hover === i && (
                <span style={{ color: t.dim, fontStyle: 'italic', fontSize: 10.5, marginLeft: 6 }}>
                  — {it.hint}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </PreviewShell>
  );
}

// ─── P8 · Terminal replay ───────────────────────────────────────────
function PTerminalReplay() {
  const t = useTheme();
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const seq = [1200, 1800, 2400];
    const z = setTimeout(() => setPhase(p => (p + 1) % 3), seq[phase]);
    return () => clearTimeout(z);
  }, [phase]);
  const primE = _chipStyle(t, 'primary').edgeColor;
  const secE  = _chipStyle(t, 'secondary').edgeColor;
  const accE  = _chipStyle(t, 'accent').edgeColor;
  const creamish = t.isDark ? '#eae1cb' : '#eae1cb';
  return (
    <PreviewShell title="A real approval moment" caption="Type → pause → approve">
      <div style={{
        width: '100%', maxWidth: 480,
        background: '#1a1714', borderRadius: 8, overflow: 'hidden',
        boxShadow: '0 6px 20px rgba(0,0,0,.25)',
        fontFamily: 'ui-monospace, monospace',
      }}>
        <div style={{ background: '#2a241e', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 9, height: 9, borderRadius: 5, background: accE }}/>
          <div style={{ width: 9, height: 9, borderRadius: 5, background: primE }}/>
          <div style={{ width: 9, height: 9, borderRadius: 5, background: secE }}/>
          <div style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,.55)' }}>
            ~/Clients/Meridian · claude
          </div>
        </div>
        <div style={{ padding: 12, fontSize: 11, color: creamish, minHeight: 140 }}>
          <div><span style={{ color: secE }}>›</span> write follow-up-1.md</div>
          {phase >= 1 && (
            <div key="ask" style={{ animation: 'rb-slide-in .3s ease', marginTop: 8 }}>
              <span style={{ color: primE }}>claude</span> wants to create{' '}
              <span style={{ color: accE }}>drafts/follow-up-1.md</span>
              <div style={{ color: 'rgba(234,225,203,.7)', fontSize: 10.5, marginTop: 4 }}>
                + 34 lines · tone: direct nudge · amount: $4,200
              </div>
            </div>
          )}
          {phase === 1 && (
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              <span style={{ background: secE, color: '#1a1714', padding: '3px 10px', borderRadius: 4, fontSize: 10.5, fontWeight: 700 }}>[y] approve</span>
              <span style={{ background: accE, color: '#1a1714', padding: '3px 10px', borderRadius: 4, fontSize: 10.5, fontWeight: 700 }}>[n] deny</span>
              <span style={{ marginLeft: 4, color: 'rgba(234,225,203,.5)', fontSize: 10.5, alignSelf: 'center', animation: 'rb-fade 1s infinite' }}>▌</span>
            </div>
          )}
          {phase === 2 && (
            <div key="ok" style={{ animation: 'rb-slide-in .3s ease', marginTop: 10, color: secE }}>
              ✓ wrote drafts/follow-up-1.md
            </div>
          )}
        </div>
      </div>
    </PreviewShell>
  );
}

// ─── P9 · Timeline ──────────────────────────────────────────────────
function PTimeline() {
  const t = useTheme();
  const [i, setI] = React.useState(0);
  React.useEffect(() => { const z = setInterval(() => setI(x => (x+1) % 5), 1200); return () => clearInterval(z); }, []);
  const steps = [
    { name: 'ls',      role: 'primary',   sub: 'folder audit'  },
    { name: 'read',    role: 'primary',   sub: 'read-only scan'},
    { name: 'plan',    role: 'secondary', sub: 'dry run'       },
    { name: 'approve', role: 'accent',    sub: 'per-file y/n'  },
    { name: 'summary', role: 'support',   sub: 'what skipped?' },
  ];
  return (
    <PreviewShell title="A real session, five beats" caption="Auto-cycles; hover to pin">
      <div style={{ width: '100%', maxWidth: 560, display: 'flex', alignItems: 'center', gap: 4 }}>
        {steps.map((s, idx) => {
          const rs = _chipStyle(t, s.role);
          const isOn = i === idx;
          return (
            <React.Fragment key={s.name}>
              <div onMouseEnter={() => setI(idx)} style={{
                flex: 1, textAlign: 'center', cursor: 'pointer',
                padding: '10px 6px', borderRadius: 8,
                ...(isOn ? rs : { background: 'transparent', color: t.ink, border: 'none' }),
                boxShadow: isOn ? (t.isDark ? `0 0 0 1px ${rs.edgeColor}44` : '0 6px 14px rgba(42,36,30,.12)') : 'none',
                transition: 'all .25s',
                opacity: isOn ? 1 : 0.6,
              }}>
                <div style={{
                  width: 20, height: 20, margin: '0 auto 5px', borderRadius: 10,
                  background: isOn ? t.ink : (t.isDark ? 'rgba(255,255,255,.1)' : 'rgba(42,36,30,.2)'),
                  color: rs.edgeColor, fontSize: 10.5, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{idx + 1}</div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: isOn ? rs.color : t.ink }}>{s.name}</div>
                <div style={{ fontSize: 9.5, color: isOn ? rs.color : t.dim, marginTop: 1, opacity: .85 }}>{s.sub}</div>
              </div>
              {idx < steps.length - 1 && (
                <div style={{ color: t.isDark ? 'rgba(255,255,255,.25)' : 'rgba(42,36,30,.35)', fontSize: 12 }}>→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </PreviewShell>
  );
}

// ─── P10 · Checkable stack ──────────────────────────────────────────
function PCheckableStack() {
  const t = useTheme();
  const [checked, setChecked] = React.useState({});
  const [open, setOpen] = React.useState(0);
  const items = [
    { n: 1, title: 'Work in a scoped folder',   body: 'Never point Claude at ~/. Always at the project folder.',  role: 'primary' },
    { n: 2, title: 'Read-only first',            body: 'The first prompt is always understanding, never writing.', role: 'secondary' },
    { n: 3, title: 'Correct aggressively',       body: '"That\'s not what I asked." is a complete sentence.',      role: 'accent' },
    { n: 4, title: 'Ask for structure',          body: '"As a table." "Two paragraphs, no more." Specify shape.',   role: 'support' },
  ];
  return (
    <PreviewShell title="Four habits to commit to" caption="Check what you'll do this week">
      <div style={{ width: '100%', maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((it, i) => {
          const rs = _chipStyle(t, it.role);
          return (
            <div key={i} style={{
              background: t.surface, borderRadius: 8,
              boxShadow: `inset 0 0 0 1px ${t.line}`, overflow: 'hidden',
            }}>
              <div onClick={() => setOpen(open === i ? -1 : i)} style={{
                padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
              }}>
                <div onClick={(e) => { e.stopPropagation(); setChecked(c => ({ ...c, [i]: !c[i] })); }}
                     style={{
                       width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                       background: checked[i] ? rs.edgeColor : 'transparent',
                       border: `1.5px solid ${checked[i] ? rs.edgeColor : (t.isDark ? 'rgba(255,255,255,.3)' : 'rgba(42,36,30,.3)')}`,
                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                       fontSize: 11, color: t.isDark ? t.bg : t.ink, fontWeight: 700,
                     }}>{checked[i] ? '✓' : ''}</div>
                <div style={{ fontSize: 9, color: t.dim, letterSpacing: 1, fontWeight: 700 }}>0{it.n}</div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: t.ink, flex: 1 }}>{it.title}</div>
                <div style={{ color: t.dim, fontSize: 12, transform: open === i ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }}>›</div>
              </div>
              {open === i && (
                <div style={{
                  padding: '0 12px 10px 40px', fontSize: 11, color: t.ink, lineHeight: 1.5,
                  animation: 'rb-slide-in .2s ease',
                }}>{it.body}</div>
              )}
            </div>
          );
        })}
      </div>
    </PreviewShell>
  );
}

Object.assign(window, {
  PComparisonGrid, PFailureTable, PPhaseTabs, PTracedExample,
  PFillableBuilder, PDecisionFork, PFileTree, PTerminalReplay,
  PTimeline, PCheckableStack,
});
