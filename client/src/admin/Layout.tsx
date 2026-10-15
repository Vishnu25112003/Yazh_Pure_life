import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./auth";
import { Icons } from "./ui";

const NAV = [
  { to: "/", label: "Dashboard", icon: Icons.dashboard, end: true },
  { to: "/domestic", label: "Domestic", icon: Icons.home },
  { to: "/commercial", label: "Commercial", icon: Icons.building },
  { to: "/dispenser", label: "Dispenser", icon: Icons.drop },
  { to: "/gallery", label: "Gallery", icon: Icons.image },
  { to: "/footer", label: "Footer", icon: Icons.pin },
];

// Desktop: left sidebar. Mobile: sticky top bar + bottom tab bar (thumb reachable).
export function Layout() {
  const { email, logout } = useAuth();
  return (
    <>
      <header className="adm-topbar">
        <a className="adm-brand" href="/admin">
          <img src="/assets/logo.png" alt="" />
          <span>Admin</span>
        </a>
        <div className="adm-top-actions">
          <span className="adm-user">{email}</span>
          <a className="adm-btn adm-btn-sm" href="/" target="_blank" rel="noopener">
            <Icons.external /> <span className="adm-hide-sm">View site</span>
          </a>
          <button className="adm-btn adm-btn-sm" onClick={logout} aria-label="Sign out">
            <Icons.logout /> <span className="adm-hide-sm">Sign out</span>
          </button>
        </div>
      </header>
      <nav className="adm-nav" aria-label="Admin sections">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end}>
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <main className="adm-main">
        <div className="adm-container">
          <Outlet />
        </div>
      </main>
    </>
  );
}
