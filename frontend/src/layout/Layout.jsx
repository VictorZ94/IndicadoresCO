import { Outlet } from "react-router-dom";
import { DarkThemeToggle } from "flowbite-react";
import SideNavbar from "../components/SideNavbar";
import BottomNavigation from "../components/BottomNavigation";

const Layout = () => {
  return (
    <div className="flex">
      <BottomNavigation />
      <SideNavbar />
      <div className="px-8 w-full md:ml-64">
        <div className="text-right py-4">
          <DarkThemeToggle />
        </div>
        <div className="px-4 sm:px-10 xl:px-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
