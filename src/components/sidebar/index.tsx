import { ReactNode } from "react";
import Link from "next/link";
import { ROUTES } from "@/common/routes";

const SidebarLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <li>
      <Link
        href={href}
        className="text-base text-gray-900 font-normal rounded-lg flex items-center px-4 py-2 hover:bg-gray-100"
      >
        {children}
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    <aside className="fixed z-20 h-full top-0 left-0 flex flex-shrink-0 flex-col w-64 transition-width duration-75">
      <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 bg-white divide-y space-y-1">
            <ul className="space-y-2 pb-2">
              <SidebarLink href={ROUTES.Dashboard}>Dashboard</SidebarLink>
              <SidebarLink href={ROUTES.Expenses}>Expenses</SidebarLink>
              <SidebarLink href={ROUTES.Categories}>Categories</SidebarLink>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export { Sidebar };
