import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import UserList from "./UserList";

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-x-hidden">
        <Sidebar />
        <div className="w-full overflow-x-auto">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
