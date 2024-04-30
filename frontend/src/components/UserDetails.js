import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";
import Sidebar from "./Sidebar";

const UserDetails = () => {
  const { userId } = useParams();
  const { users, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const selectedUser = users.find((user) => user._id === userId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedUser = {
      username: event.target.username.value,
      email: event.target.email.value,
    };
    await updateUser(userId, updatedUser);
    navigate("/");
  };

  if (!selectedUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 justify-center items-center">
        <Sidebar />
        <div className="flex-1 p-6 ml-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-4 text-white text-center">
              User Details
            </h1>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  defaultValue={selectedUser.username}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={selectedUser.email}
                  className="border rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
