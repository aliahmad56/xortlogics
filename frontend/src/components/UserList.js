import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const { users, searchUsers, loading, deleteUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      searchUsers(searchTerm);
    }
  }, [searchTerm, searchUsers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      toast.success("User successfully deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#3cb371",
          color: "white",
          fontSize: "18px",
          padding: "10px",
        },
      });
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="flex flex-col items-center justify-end w-full">
      <div className="flex items-center my-2 w-1/2">
        <label htmlFor="search" className="mr-2">
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg w-full text-center"
        />
      </div>

      <table className="table-auto w-full border border-collapse border-gray-400">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="px-4 py-2 font-bold border border-gray-400">Name</th>
            <th className="px-4 py-2 font-bold border border-gray-400">
              Email
            </th>
            <th className="px-4 py-2 font-bold border border-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-gray-100">
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 flex items-center justify-center">
                <Link
                  to={`/user/${user._id}`}
                  className="text-blue-500 hover:underline"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="ml-4 text-red-500 hover:underline"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <ToastContainer />
      </table>
    </div>
  );
};

export default UserList;
