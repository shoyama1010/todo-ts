import type { User } from "../../types/user";

const dummyUsers: User[] = [
  { id: 1, name: "Admin", email: "admin@test.com", role: "admin" },
  { id: 2, name: "User1", email: "user1@test.com", role: "user" },
  { id: 3, name: "User2", email: "user2@test.com", role: "user" },
];

export const UserList = () => {
  return (
    <div className='list-container'>
      <h3>ユーザー一覧</h3>
      <ul>
        {dummyUsers.map((user) => (
          <li key={user.id}>
            {user.name} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
};
