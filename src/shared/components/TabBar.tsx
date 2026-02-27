import { NavLink } from "react-router-dom";

interface TabItem {
  label: string;
  path: string;
}

function TabBar({ items }: { items: TabItem[] }) {
  return (
    <div className="bg-ec-white border-ec-outline flex h-237.25 w-49.25 flex-col border px-7.5 py-7.5">
      <ul className="flex flex-col gap-5">
        {items.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `text-[18px] transition-colors ${
                  isActive ? "text-ec-blue" : "text-ec-sub hover:text-ec-blue"
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TabBar;

/*  사용 예시
/baseurl/path
ex) /user/경로, /admin/경로
*/
/*
  <TabBar
  items={[
    { label: "목록명", path: "경로" },
    { label: "목록명", path: "경로" },
    { label: "목록명", path: "경로" },
  ]}
/>
 */
