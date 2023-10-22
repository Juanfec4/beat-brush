import { FC } from "react";
import NavMenu from "../../ui/menus/navigation";

const Navbar: FC = () => {
  return (
    <nav>
      <NavMenu
        links={[
          { link: "/", text: "About" },
          { link: "/overview", text: "Overview" },
          { link: "/receipts", text: "Receipts" },
        ]}
      />
    </nav>
  );
};

export default Navbar;
