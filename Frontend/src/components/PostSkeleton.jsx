import React from "react";

const PostSkeleton = () => {
  return (
    <div className="my-8 w-full max-w-sm mx-auto border rounded-md p-4 shadow animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div> {/* Avatar */}
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-300 rounded w-1/2"></div> {/* Username */}
          <div className="h-2 bg-gray-300 rounded w-1/3"></div> {/* Subtext */}
        </div>
      </div>

      {/* Image */}
      <div className="w-full h-64 bg-gray-300 rounded mb-4"></div>

      {/* Actions */}
      <div className="flex items-center gap-4 mb-2">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      </div>

      {/* Caption */}
      <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-5/6"></div>
    </div>
  );
};

export default PostSkeleton;
