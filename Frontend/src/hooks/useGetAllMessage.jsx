import { setMessages } from "@/redux/chatSlice";
import { ROUTES } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessage = () => {
    const {selectedUser} = useSelector((store)=>store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllMessage = async () => {
      try {
        const res = await axios.get(ROUTES.GET_ALL_MESSAGE(selectedUser?._id), {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setMessages(res.data.data));
        }
      } catch (error) {
        console.log(error);
       } 
    };
    fetchAllMessage();
  }, [dispatch,selectedUser]);
};

export default useGetAllMessage;
