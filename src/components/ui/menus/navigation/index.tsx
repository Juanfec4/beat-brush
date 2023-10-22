import { FC } from "react";
import "./styles.scss";
import { NavLink } from "react-router-dom";

type link = {
  text: string;
  link: string;
};

interface NavMenuProps {
  links: link[];
}

const NavMenu: FC<NavMenuProps> = ({ links }) => {
  return (
    <ul className="nav-menu__list">
      {links.map((link) => {
        return (
          <NavLink
            to={link.link}
            key={link.link}
            className={"nav-menu__link-item"}
          >
            {link.text}
          </NavLink>
        );
      })}
    </ul>
  );
};

export default NavMenu;
