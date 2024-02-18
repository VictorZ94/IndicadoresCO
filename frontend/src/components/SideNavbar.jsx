import { Badge, DarkThemeToggle, Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Outlet } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { MdSpaceDashboard } from "react-icons/md";

const SideNavbar = () => {
  const date = new Date();

  return (
    <div className="flex">
      <Sidebar className="h-screen">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <SidebarItem
              href={`dashboard/${date.getFullYear()}`}
              icon={<MdSpaceDashboard className="nav-icon" />}
            >
              Dashboard
            </SidebarItem>
            <SidebarItem href="salario" icon={<HiTable className="nav-icon" />}>
              Salario Minimo
            </SidebarItem>
            <SidebarItem
              href="auxilio-transporte"
              icon={<HiViewBoards className="nav-icon" />}
            >
              Auxilio de transporte
            </SidebarItem>
            <SidebarItem href="uvt" icon={<HiInbox className="nav-icon" />}>
              UVT
            </SidebarItem>
            <SidebarItem href="trm" icon={<HiChartPie className="nav-icon" />}>
              TRM
            </SidebarItem>
            <SidebarItem
              href="login"
              icon={<HiArrowSmRight className="nav-icon" />}
            >
              Sign In
            </SidebarItem>
            <SidebarItem href="logout" icon={<HiUser className="nav-icon" />}>
              Sign Up
            </SidebarItem>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.CTA>
          <div className="mb-3 flex items-center">
            <Badge color="warning">Beta</Badge>
            <button
              aria-label="Close"
              className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-gray-100 p-1 text-cyan-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
              type="button"
            >
              <svg
                aria-hidden
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="mb-3 text-sm text-cyan-900 dark:text-gray-400">
            Preview the new Flowbite dashboard navigation! You can turn the new
            navigation off for a limited time in your profile.
          </div>
          <a
            className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300"
            href="#"
          >
            Turn new navigation off
          </a>
        </Sidebar.CTA>
      </Sidebar>
      <div className="px-8 w-full">
        <div className="text-right py-4">
          <DarkThemeToggle />
        </div>
        <div className="px-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
