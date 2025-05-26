import { useEffect, useState } from "react";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/get-users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        console.log("📥 Users fetched:", data);
        setUsers(data.users);
      } catch (err) {
        console.error("❌ Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-gray-600 text-center py-10">Loading users...</div>;
  }

  return (
    <div className="text-gray-600">
      <h2 className="text-xl font-bold mb-4">Users</h2>

      {/* Table view for larger screens */}
      <table className="hidden md:table w-full text-left border-collapse bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">First</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Last</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Phone</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Email</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Address 1</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">City</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">State</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">Zip</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr
              key={u.user_id}
              className={`${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } hover:bg-gray-100 transition`}
            >
              <td className="px-4 py-3 text-sm">{u.first_name}</td>
              <td className="px-4 py-3 text-sm">{u.last_name}</td>
              <td className="px-4 py-3 text-sm">{u.phone_number}</td>
              <td className="px-4 py-3 text-sm">{u.email}</td>
              <td className="px-4 py-3 text-sm">{u.address_line_1}</td>
              <td className="px-4 py-3 text-sm">{u.city}</td>
              <td className="px-4 py-3 text-sm">{u.state}</td>
              <td className="px-4 py-3 text-sm">{u.zip_code}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Card view for smaller screens */}
      <div className="md:hidden grid gap-4">
        {users.map((u) => (
          <div
            key={u.user_id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition border"
          >
            <p className="text-sm text-gray-500">
              <span className="font-semibold">First:</span> {u.first_name}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Last:</span> {u.last_name}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Phone:</span> {u.phone_number}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Email:</span> {u.email}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Address:</span> {u.address_line_1}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">City:</span> {u.city}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">State:</span> {u.state}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Zip:</span> {u.zip_code}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}