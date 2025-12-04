
import React from "react";
import Posts from "./Posts";

function Feed() {
  return (
    <div
      className="
        flex-1 flex flex-col items-center 
        my-8
        px-2 sm:px-4 
        md:pl-[22%] lg:pl-[18%]
      "
    >
      <Posts />
    </div>
  );
}

export default Feed;
