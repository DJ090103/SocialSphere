import { setPosts } from "@/redux/postSlice";
import axios from "axios"
import { apiUrl } from "@/lib/utils"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner";

const useGetAllPosts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPosts = async() => {
            try {
                const res = await axios.get(apiUrl("/api/v1/post/all"), {withCredentials:true})
                if(res.data.success){
                    // console.log(res.data);
                    dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "Failed to load posts");
            }
        }
        fetchAllPosts();
    },[])
}

export default useGetAllPosts;