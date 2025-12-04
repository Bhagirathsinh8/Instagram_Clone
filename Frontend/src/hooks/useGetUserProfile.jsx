import { setUserProfile } from "@/redux/authSlice";
import { ROUTES } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(ROUTES.GET_USER_PROFILE(userId), { withCredentials: true });
                if (res.data.success) { 
                    dispatch(setUserProfile(res.data.data));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserProfile();
    }, [userId,dispatch]);
};
export default useGetUserProfile;