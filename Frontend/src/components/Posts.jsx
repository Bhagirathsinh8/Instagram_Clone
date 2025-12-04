// import React from 'react'
// import Post from './Post';
// import { useSelector } from 'react-redux';


// function Posts() {
//   const {posts} = useSelector(store =>store.post);
//   return (
//     <div>
//         {
//             posts.map((post)=>{
//                 return <Post key={post._id} post={post}/>
//             })
//         } 
//     </div>
//   )
// }

// export default Posts 

import React from "react";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";
import { useSelector } from "react-redux";

function Posts() {
  const { posts, loading } = useSelector((store) => store.post);

  if (loading) {
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
