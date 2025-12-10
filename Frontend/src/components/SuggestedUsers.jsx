import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import SuggestedUserSkeleton from './SuggestedUserSkeleton';
import { PATH, ROUTES } from '@/utils/constant';
import axios from 'axios';
import { updateFollowState } from '@/redux/authSlice';
import { toast } from 'sonner';

const SuggestedUsers = () => {
  const dispatch = useDispatch();
  const { user, suggestedUsers, loading } = useSelector(store => store.auth);

  const handleFollow = async (targetId) => {
    try {
      const isNowFollowing = !user.following.includes(targetId);

      const res = await axios.post(ROUTES.FOLLOW_USER(targetId),{},{withCredentials:true});

      if(res.data.success){
      dispatch(updateFollowState({ targetId, isNowFollowing }));
      toast.success(res.data.message);
      }

     
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <SuggestedUserSkeleton key={i} />
        ))}
      </>
    );
  }

  if (!loading && suggestedUsers.length === 0) {
  return (
    <>
    <div className='flex items-center justify-between text-sm'>
        <h1 className='font-semibold  text-gray-600'>Suggested for you</h1>
        {/* <span className='font-medium cursor-pointer'>See All</span> */}
      </div>
       <div className='my-10 text-center text-gray-500 text-sm'>
      No new users to follow 😊
    </div>
    </>
   
  );
}

  return (
    <div className='my-10'>
      <div className='flex items-center justify-between text-sm'>
        <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
        <span className='font-medium cursor-pointer'>See All</span>
      </div>

      {suggestedUsers.map((userItem) => {
        const isFollowing = user.following.includes(userItem._id);

        return (
          <div key={userItem._id} className='flex items-center justify-between my-5'>
            <div className='flex items-center gap-2'>
              <Link to={PATH.PROFILE(userItem._id)}>
                <Avatar>
                  <AvatarImage src={userItem.profilePhoto} alt="post_image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>

              <div>
                <h1 className='font-semibold text-sm'>
                  <Link to={PATH.PROFILE(userItem._id)}>{userItem.username}</Link>
                </h1>
                <span className='text-gray-600 text-sm'>
                  {userItem.bio || 'Bio here...'}
                </span>
              </div>
            </div>

            {/* Follow / Unfollow Button */}
            <span
              onClick={() => handleFollow(userItem._id)}
              className={`text-xs font-bold cursor-pointer ${
                isFollowing ? 'text-red-500 hover:text-red-600' : 'text-[#3BADF8] hover:text-[#3495d6]'
              }`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
