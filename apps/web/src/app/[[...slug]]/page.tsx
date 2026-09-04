import { SIDEBAR, ROUTE_AREAS } from '@angelmind/shared';

function label(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, m => m.toUpperCase()); }

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const p = await params;
  const path = '/' + (p.slug ?? []).join('/');
  const isPublic = path === '/' || path.startsWith('/product') || path.startsWith('/features') || path.startsWith('/how-it-works') || path.startsWith('/pricing') || path.startsWith('/legal');
  const title = path === '/' ? 'Angelmind V4.0' : label((p.slug ?? ['dashboard']).at(-1) ?? 'dashboard');
  const subtitle = isPublic ? 'Unified Security Operations Platform' : 'Governed security workspace';

  return <div className="shell">
    {!isPublic && <aside className="sidebar"><div className="badge">24 MENU</div><nav className="nav">{SIDEBAR.map(x => <a key={x} href={'/' + x}>{label(x)}</a>)}</nav></aside>}
    <header className="topbar"><div className="logo">ANGELMIND</div><div className="search">Global Search · Ctrl/Cmd + K</div><span className="badge">{isPublic ? 'PUBLIC' : 'ONLINE'}</span></header>
    <main className="content">
      {isPublic ? <>
        <div className="badge">V4.0 BLUEPRINT</div><h1>{title}</h1><p className="muted">{subtitle}</p>
        <div className="grid"><section className="card"><h3>Unified Knowledge Graph</h3><p className="muted">Asset → Operation → Finding → Evidence → Report, with traceable relations.</p></section><section className="card"><h3>Governance First</h3><p className="muted">Scope validation, approvals, immutable audit and tenant isolation.</p></section><section className="card"><h3>Infrastructure</h3><p className="muted">Cloudflare edge, Supabase primary data, Railway compute, Firebase optional notifications.</p></section></div>
      </> : <>
        <div className="badge">{ROUTE_AREAS.includes(path as never) ? 'BLUEPRINT ROUTE' : 'DYNAMIC ROUTE'}</div><h1>{title}</h1><p className="muted">{subtitle}</p>
        <div className="grid"><section className="card"><h3>State</h3><p className="status">Ready for backend integration</p></section><section className="card"><h3>Path</h3><code>{path}</code></section><section className="card"><h3>Controls</h3><p className="muted">RBAC · scope · approval · audit · rate limits</p></section></div>
      </>}
    </main>
  </div>;
}
