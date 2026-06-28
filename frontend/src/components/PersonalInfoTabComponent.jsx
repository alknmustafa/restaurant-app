import { useState } from "react";
import { toast } from "react-toastify";
import { updateUser, deleteUser } from "../services/userService";

export default function PersonalInfoTabComponent({
  user,
  editUser,
  setEditUser,
  setUser,
  onLogout,
}) {
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const updated = await updateUser(token, {
        name: editUser.name,
        country: editUser.country,
        phone: editUser.phone,
      });

      setUser(updated);
      setEditUser(updated);

      localStorage.setItem("name", updated.name);
      toast.success("Profile updated 🎉");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await deleteUser(token);

      localStorage.removeItem("token");
      localStorage.removeItem("name");

      toast.success("Account deleted");

      onLogout();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-10">

      {/* NAME */}
      <div className="flex justify-between">
        <p>Name</p>
        <input
          className="border rounded px-3 py-2 w-40"
          value={editUser?.name || ""}
          onChange={(e) =>
            setEditUser({ ...editUser, name: e.target.value })
          }
        />
      </div>

      {/* EMAIL */}
      <div className="flex justify-between">
        <p>Email</p>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      {/* COUNTRY */}
      <div className="flex justify-between">
        <p>Country</p>
        <select
          className="border rounded px-3 py-2 w-40"
          value={editUser?.country || ""}
          onChange={(e) =>
            setEditUser({ ...editUser, country: e.target.value })
          }
        >
          <option value="">Select country</option>
          <option value="Germany">Germany</option>
          <option value="Turkey">Turkey</option>
          <option value="USA">USA</option>
          <option value="France">France</option>
        </select>
      </div>

      {/* PHONE */}
      <div className="flex justify-between">
        <p>Phone</p>
        <input
          className="border rounded px-3 py-2 w-40"
          value={editUser?.phone || ""}
          onChange={(e) =>
            setEditUser({ ...editUser, phone: e.target.value })
          }
        />
      </div>

      {/* SAVE */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-red-600 text-white px-6 py-2 rounded-md"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* DELETE */}
      <div className="flex justify-between">
        <p>Delete Account</p>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="text-red-600"
        >
          Delete
        </button>
      </div>

      {/* MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-100">
            <h2 className="text-lg font-bold mb-3">
              Delete Account
            </h2>

            <p className="text-gray-600 mb-5">
              Are you sure? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOGOUT */}
      <div className="flex justify-between">
        <p>Log out of Shoppi</p>
        <button onClick={onLogout} className="text-black hover:text-red-600">
          Logout
        </button>
      </div>
    </div>
  );
}