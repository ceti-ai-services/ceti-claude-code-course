// shadcn/ui-style primitives — cva-inspired variants, but no cva dependency.
// Every class uses tokens defined in the HTML: bg-primary, text-muted-foreground, etc.

function cx(...parts) { return parts.filter(Boolean).join(' '); }

// ── Button ─────────────────────────────────────────────────────────
function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
  const sizes = {
    sm: 'h-7 px-2.5 text-xs',
    md: 'h-9 px-3.5 text-sm',
    lg: 'h-11 px-5 text-base',
  };
  // In dark mode the fill is the shadow, so we lift contrast via the
  // luminous edge border + foreground text (the brand's "color lives at the edge" rule).
  const variants = {
    primary:   'bg-primary text-primary-foreground hover:brightness-105 dark:border dark:border-primary-edge/60 dark:shadow-[0_0_0_1px_hsl(var(--primary-edge)/.15)]',
    secondary: 'bg-secondary text-secondary-foreground hover:brightness-105 dark:border dark:border-secondary-edge/60',
    accent:    'bg-accent text-accent-foreground dark:bg-accent-edge dark:text-background hover:brightness-105',
    support:   'bg-support text-support-foreground hover:brightness-105 dark:border dark:border-support-edge/60',
    outline:   'bg-transparent text-foreground border border-border hover:bg-muted/10',
    ghost:     'bg-transparent text-foreground hover:bg-muted/10',
  };
  return <button className={cx(base, sizes[size], variants[variant], className)} {...rest}>{children}</button>;
}

// ── Card ───────────────────────────────────────────────────────────
function Card({ className = '', children, ...rest }) {
  return (
    <div className={cx(
      'bg-card text-card-foreground rounded-xl border border-border/60 shadow-sm',
      'dark:shadow-[0_0_0_1px_hsl(var(--border))]',
      className,
    )} {...rest}>{children}</div>
  );
}
function CardTitle({ className = '', children }) {
  return <div className={cx('font-serif text-lg font-semibold tracking-tight text-foreground', className)}>{children}</div>;
}
function CardCaption({ className = '', children }) {
  return <div className={cx('text-xs italic text-muted-foreground mt-1', className)}>{children}</div>;
}

// ── Badge ──────────────────────────────────────────────────────────
function Badge({ variant = 'primary', className = '', children }) {
  const base = 'inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-semibold tracking-wide';
  const variants = {
    primary:   'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground dark:border dark:border-primary-edge/60',
    secondary: 'bg-secondary text-secondary-foreground dark:border dark:border-secondary-edge/60',
    accent:    'bg-accent text-accent-foreground dark:border dark:border-accent-edge/60',
    support:   'bg-support text-support-foreground dark:border dark:border-support-edge/60',
    outline:   'bg-transparent text-foreground border border-border',
  };
  return <span className={cx(base, variants[variant], className)}>{children}</span>;
}

// ── Separator ──────────────────────────────────────────────────────
function Separator({ className = '' }) {
  return <div className={cx('h-px w-full bg-border', className)} />;
}

// ── Tabs (uncontrolled) ────────────────────────────────────────────
function Tabs({ tabs, value, onChange, className = '' }) {
  return (
    <div className={cx('inline-flex gap-0.5 p-0.5 rounded-lg bg-muted/15 border border-border/60', className)}>
      {tabs.map(tb => (
        <button key={tb.value} onClick={() => onChange(tb.value)}
                className={cx(
                  'px-3 py-1 rounded-md text-xs font-semibold transition-all',
                  value === tb.value
                    ? 'bg-card text-foreground shadow-sm dark:border dark:border-primary-edge/40'
                    : 'text-muted-foreground hover:text-foreground',
                )}>
          {tb.label}
        </button>
      ))}
    </div>
  );
}

// ── Input / Select ─────────────────────────────────────────────────
function Input({ className = '', ...rest }) {
  return <input className={cx(
    'h-8 px-2.5 text-xs rounded-md bg-background text-foreground',
    'border border-border focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring',
    className,
  )} {...rest} />;
}

function Select({ className = '', children, ...rest }) {
  return <select className={cx(
    'h-8 px-2 text-xs rounded-md bg-background text-foreground border border-border focus:border-ring focus:outline-none',
    className,
  )} {...rest}>{children}</select>;
}

// ── Checkbox ───────────────────────────────────────────────────────
function Checkbox({ checked, onChange, variant = 'primary', className = '' }) {
  const edge = {
    primary: 'dark:border-primary-edge dark:bg-primary-edge',
    secondary: 'dark:border-secondary-edge dark:bg-secondary-edge',
    accent: 'dark:border-accent-edge dark:bg-accent-edge',
    support: 'dark:border-support-edge dark:bg-support-edge',
  }[variant];
  const fill = {
    primary: 'bg-primary border-primary',
    secondary: 'bg-secondary border-secondary',
    accent: 'bg-accent border-accent',
    support: 'bg-support border-support',
  }[variant];
  return (
    <button onClick={onChange} className={cx(
      'w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-all shrink-0',
      checked ? cx(fill, edge) : 'bg-transparent border-muted/50',
      className,
    )}>
      {checked && <span className="text-[10px] font-bold text-background leading-none">✓</span>}
    </button>
  );
}

Object.assign(window, { cx, Button, Card, CardTitle, CardCaption, Badge, Separator, Tabs, Input, Select, Checkbox });
