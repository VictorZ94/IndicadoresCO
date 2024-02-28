import { NavLink } from "react-router-dom";

const SidebarItem = ({ children, href, icon }) => {
  return (
    <li>
      <NavLink
        to={href}
        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      >
        {icon}
        <span className="px-3 flex-1 whitespace-nowrap">{children}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
