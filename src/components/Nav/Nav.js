import { Link } from 'react-router-dom';

export default function Nav() {

  return (
    <nav className="nav">
      <ul className="nav__menu">
        <li className="nav__list">
          <Link className="nav__link" to="/">
            About project
          </Link>
        </li>
        <li className="nav__list">
          <Link className="nav__link" to="/dashboard">
            Dashboard
          </Link>
        </li>

      </ul>
    </nav>
  )
}
