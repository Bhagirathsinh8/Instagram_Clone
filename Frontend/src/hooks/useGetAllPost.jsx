import { setLoading, setPosts } from "@/redux/postSlice";
import { ROUTES } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(ROUTES.GET_ALL_POST, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setPosts(res.data.data));
        }
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      } finally {
        setTimeout(()=>{
            dispatch(setLoading(false));
        },500);
      }
    };
    fetchAllPost();
  }, [dispatch]);
};

export default useGetAllPost;
