import React from "react";

const SuggestedUserSkeleton = () => {
  return (
    <div className="my-5 flex items-center justify-between animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="flex flex-col gap-2">
          <div className="h-3 w-24 bg-gray-300 rounded"></div>
          <div className="h-2 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="w-12 h-5 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SuggestedUserSkeleton;
