import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Table from "../../components/ui/Table";
import StoreRow from "../../components/admin/StoreRow";
import AddStoreModal from "../../components/admin/AddStoreModal";
import api from "../../services/api";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    address: "",
    sortBy: "createdAt",
    order: "desc",
  });

  useEffect(() => {
    fetchStores();
  }, [filters]);

  const fetchStores = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/stores", {
        params: filters,
      });

      setStores(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch stores");
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
      <div
        className="
                flex
                flex-col
                md:flex-row
                md:justify-between
                md:items-center
                gap-4
                mb-6
            "
      >
        <div>
          <h1 className="text-3xl font-bold">Store Management</h1>

          <p className="text-gray-500 mt-1">Manage all registered stores</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="
        bg-indigo-600
        text-white
        px-5
        py-3
        rounded-lg
        hover:bg-indigo-700
    "
        >
          Add Store
        </button>
      </div>

      {/* Filters */}

      <div
        className="
                bg-white
                rounded-xl
                shadow
                p-5
                mb-6
                grid
                grid-cols-1
                md:grid-cols-3
                gap-4
            "
      >
        <input
          type="text"
          name="name"
          placeholder="Search Store Name"
          className="border rounded-lg p-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Search Address"
          className="border rounded-lg p-3"
          onChange={handleChange}
        />

        <select
          name="order"
          className="border rounded-lg p-3"
          onChange={handleChange}
        >
          <option value="desc">Newest First</option>

          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Table Section */}

      {loading ? (
        <div
          className="
                        bg-white
                        rounded-xl
                        shadow
                        p-6
                    "
        >
          Loading stores...
        </div>
      ) : stores.length === 0 ? (
        <div
          className="
                        bg-white
                        rounded-xl
                        shadow
                        p-6
                        text-center
                    "
        >
          No stores found
        </div>
      ) : (
        <Table headers={["Store Name", "Email", "Address", "Owner", "Rating"]}>
          {stores.map((store) => (
            <StoreRow key={store.id} store={store} />
          ))}
        </Table>
      )}

      {
    showModal &&
    <AddStoreModal
        closeModal={() =>
            setShowModal(false)
        }
        refreshStores={fetchStores}
    />
}
    </DashboardLayout>
  );
};

export default Stores;
