import { setLoading, setSuggestedUsers } from "@/redux/authSlice";
import { ROUTES } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux";

const useGetSuggestedUsers = () =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSuggestedUsers = async () =>{
            try {
                dispatch(setLoading(true))
                const res = await axios.get(ROUTES.SUGGESTED_USERS,{withCredentials:true});

                if(res.data.success){
                    dispatch(setSuggestedUsers(res.data.data));
                }

            } catch (error) {
                console.log(error);
            } finally {
                setTimeout(()=>{
                    dispatch(setLoading(false));
                },500);
            }
        }
        fetchSuggestedUsers();
    }, [dispatch]);
}

export default useGetSuggestedUsers;