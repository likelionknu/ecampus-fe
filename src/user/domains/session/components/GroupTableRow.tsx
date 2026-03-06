interface UserRow {
  course: number;
  name: string;
  part: string;
  email: string;
}

interface GroupTableRowProps {
  users: UserRow[];
}
const PART_MAP: Record<string, string> = {
  BACKEND: "백엔드",
  FRONTEND: "프론트엔드",
  DESIGN: "디자인",
  PLANNING: "기획",
};
function GroupTableRow({ users }: GroupTableRowProps) {
  return (
    <div className="flex flex-col">
      {users.map((user, index) => (
        <div
          key={user.email}
          className={`flex items-center px-8 py-4 ${
            index % 2 === 1 ? "bg-ec-box" : ""
          }`}
        >
          <div className="flex gap-5">
            <span className="text-body-2 mr-7 text-center">
              {user.course}기
            </span>
            <span className="text-body-2 mr-5 text-center">{user.name}</span>
            <span className="text-body-2 mr-5 text-center">
              {PART_MAP[user.part] || user.part}
            </span>
            <span className="text-body-2 text-left">{user.email}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupTableRow;
