import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/personajes', label: 'Personajes' },
  { to: '/arcos', label: 'Arcos' },
  { to: '/nen', label: 'Sistema Nen' },
  { to: '/grupos', label: 'Grupos' },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">⬡</span>
          Hunterpedia
        </NavLink>
        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
