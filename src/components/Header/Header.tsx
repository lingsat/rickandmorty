import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { IUser } from "../../types/user";
import Container from "../Container/Container";
import "./Header.scss";

interface HeaderProps {
  user: IUser | null;
  onLogOut: () => void;
}

const Header: FC<HeaderProps> = ({ user, onLogOut }) => {
  return (
    <header className="header">
      <Container>
        <nav>
          <ul>
            <li>
              <NavLink to="/" className="header__link">
                Home
              </NavLink>
            </li>
            {user ? (
              <>
                <li>{user.identifier}</li>
                <li>
                  <Link to="/" className="header__link" onClick={onLogOut}>
                    Log Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/sign-in" className="header__link">
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/sign-up" className="header__link">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
