import Feed from "@/components/Feed";
import RightSidebar from "@/components/RightSidebar";
import useGetAllFollowers from "@/hooks/getAllFollower";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import React from "react";
import { Outlet } from "react-router-dom";

function Home() {
  useGetAllPost();
  useGetSuggestedUsers();
  useGetAllFollowers();
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
