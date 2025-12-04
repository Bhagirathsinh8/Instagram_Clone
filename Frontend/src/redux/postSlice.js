import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:"post",
    initialState:{
        loading: false,
        posts:[],
        selectedPost:null,
    },
    reducers:{
        //Actions
        setPosts : (state,action) =>{
            state.posts = action.payload;
        },
        setSelectedPost : (state,action) =>{
            state.selectedPost = action.payload;
        },
        setLoading: (state, action) => {
      state.loading = action.payload;
    },
    }
});

export const {setPosts,setSelectedPost,setLoading} = postSlice.actions;
export default postSlice.reducer;