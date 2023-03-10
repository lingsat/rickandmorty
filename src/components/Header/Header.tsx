import { FC } from "react";
import { NavLink } from "react-router-dom";
import Container from "../Container/Container";
import "./Header.scss";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
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
            <li>
              <NavLink to="/sing-in" className="header__link">
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink to="/sing-up" className="header__link">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
