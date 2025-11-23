import Feed from "@/components/Feed";
import RightSidebar from "@/components/RightSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
       <RightSidebar/>
    </div>
  );
}

export default Home;
