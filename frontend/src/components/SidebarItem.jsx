import { NavLink } from "react-router-dom";
import React from "react";

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
