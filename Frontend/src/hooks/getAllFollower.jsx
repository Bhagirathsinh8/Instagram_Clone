import {  setCurrentFollowingUsers } from "@/redux/chatSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllFollowers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllFollowers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/follower-list', {
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success) {
            dispatch(setCurrentFollowingUsers(res.data.data));
        }
      } catch (error) {
        console.log(error);
       } 
    };
    fetchAllFollowers();
  }, [dispatch]);
};

export default useGetAllFollowers;
