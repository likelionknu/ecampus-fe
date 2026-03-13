import { NavLink, useLocation } from "react-router-dom";

interface TabItem {
  label: string;
  path: string;
  end?: boolean;
}

function TabBar({ items }: { items: TabItem[] }) {
  const { pathname } = useLocation();

  const activeItem =
    items.find((item) =>
      item.end ? pathname === item.path : pathname.startsWith(item.path),
    ) ?? items[0];

  return (
    <nav className="bg-ec-table-header border-ec-outline-dark rounded-b-ec-10 md:rounded-ec-10 absolute top-16.25 z-10 w-dvw overflow-hidden border md:relative md:top-0 md:w-50">
      <div className="flex items-center justify-center">
        <span className="text-caption text-ec-sub">{activeItem?.label}</span>
      </div>

      <ul className="flex flex-col gap-5 px-7 py-7">
        {items.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `text-sub-title transition-colors ${
                  isActive
                    ? "text-ec-black font-semibold"
                    : "text-ec-black hover:text-ec-sub"
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TabBar;
