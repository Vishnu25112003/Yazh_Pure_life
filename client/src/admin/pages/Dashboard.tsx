import { Link } from "react-router-dom";
import { api } from "../api";
import { SECTION_LABEL, SECTION_PATH } from "../sections";
import type { Dashboard as DashboardData } from "../types";
import { Icons, PageHead, Spinner, timeAgo, useLoad } from "../ui";

const STATS: { key: keyof DashboardData["sections"]; label: string }[] = [
  { key: "domestic", label: "Domestic" },
  { key: "commercial", label: "Commercial" },
  { key: "dispenser", label: "Dispensers" },
  { key: "gallery", label: "Gallery photos" },
  { key: "branches", label: "Branches" },
];

const QUICK = [
  { to: "/domestic/new", label: "Add purifier" },
  { to: "/commercial/new", label: "Add commercial plant" },
  { to: "/dispenser/new", label: "Add dispenser" },
  { to: "/gallery", label: "Upload photos" },
  { to: "/footer", label: "Edit contact & branches" },
];

export function Dashboard() {
  const { data, error } = useLoad(() => api.get<DashboardData>("/dashboard"));

  if (error) return <div className="adm-alert">{error}</div>;
  if (!data) return <Spinner />;

  return (
    <>
      <PageHead title="Dashboard" sub="Overview of everything shown on your website." />

      <div className="adm-stats">
        {STATS.map(({ key, label }) => {
          const s = data.sections[key];
          return (
            <Link key={key} to={SECTION_PATH[key]} className="adm-stat">
              <b>{s.total}</b>
              <span>{label}</span>
              <small>{s.active === s.total ? "all live" : `${s.active} live · ${s.total - s.active} hidden`}</small>
            </Link>
          );
        })}
      </div>

      <div className="adm-dash">
        <div className="adm-stack">
        <section className="adm-card">
          <h2>Quick actions</h2>
          <div className="adm-quick">
            {QUICK.map((q) => (
              <Link key={q.to} to={q.to} className="adm-btn adm-btn-sm">
                <Icons.plus /> {q.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="adm-card">
          <h2>Needs attention</h2>
          {data.attention.length === 0 ? (
            <p style={{ margin: 0, opacity: 0.7 }}>Nothing to fix — everything looks good.</p>
          ) : (
            <ul className="adm-plain">
              {data.attention.map((a, i) => (
                <li key={i} className="adm-attn">
                  <Link to={SECTION_PATH[a.section]} style={{ color: "inherit" }}>
                    {SECTION_LABEL[a.section]}: {a.message}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
        </div>

        <section className="adm-card">
          <h2>Recent changes</h2>
          <ul className="adm-plain">
            {data.recent.map((r) => (
              <li key={`${r.type}-${r.id}`}>
                <Link to={SECTION_PATH[r.section] ?? "/"}>
                  {SECTION_LABEL[r.section]}: {r.title}
                </Link>
                <time dateTime={r.updatedAt}>{timeAgo(r.updatedAt)}</time>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
