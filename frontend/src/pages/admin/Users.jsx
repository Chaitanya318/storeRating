import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
import AddUserModal from "../../components/admin/AddUserModal";
import Table from "../../components/ui/Table";
import UserRow from "./UserRow";
import api from "../../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
    sortBy: "createdAt",
    order: "desc",
  });

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/users", {
        params: filters,
      });

      setUsers(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>

          <p className="text-gray-500 mt-1">
            Manage users, admins and store owners
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="
        bg-indigo-600
        text-white
        px-5 py-3
        rounded-lg
        hover:bg-indigo-700
    "
        >
          Add User
        </button>
      </div>

      {/* Filters */}
      <div
        className="
                bg-white
                p-5
                rounded-xl
                shadow
                mb-6
                grid
                grid-cols-1
                md:grid-cols-5
                gap-4
            "
      >
        <input
          type="text"
          name="name"
          placeholder="Search Name"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="text"
          name="email"
          placeholder="Search Email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Search Address"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <select
          name="role"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        >
          <option value="">All Roles</option>

          <option value="ADMIN">Admin</option>

          <option value="USER">User</option>

          <option value="OWNER">Store Owner</option>
        </select>

        <select
          name="order"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        >
          <option value="desc">Newest First</option>

          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div
          className="
                        bg-white
                        p-6
                        rounded-xl
                        shadow
                    "
        >
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <div
          className="
                        bg-white
                        p-6
                        rounded-xl
                        text-center
                        shadow
                    "
        >
          No users found
        </div>
      ) : (
        <Table headers={["Name", "Email", "Address", "Role"]}>
          {users.map((user) => (
            <UserRow key={user._id} user={user} />
          ))}
        </Table>
      )}

      {
    showModal &&
    <AddUserModal
        closeModal={() => setShowModal(false)}
        refreshUsers={fetchUsers}
    />
}
    </DashboardLayout>
  );
};

export default Users;
