import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import userApi from "../api/userApi";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/users");
        console.log("Response data:", response.data);
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/update/${id}`,
        updatedUser
      );
      setUsers(users.map((user) => (user._id === id ? updatedUser : user)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const searchUsers = async (searchTerm) => {
    try {
      if (searchTerm) {
        const searchedUsers = await userApi.searchUsers(searchTerm);
        setUsers(searchedUsers);
      } else {
        const response = await axios.get("http://localhost:4000/api/users");
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/delete/${id}`
      );
      if (response.data.status) {
        setUsers(users.filter((user) => user._id !== id));
      } else {
        console.error("Failed to delete user:", response.data.msg);
        throw new Error(response.data.msg);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser,
        loading,
        searchUsers,
        deleteUser,
        updateUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
