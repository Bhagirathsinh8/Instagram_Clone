import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:"chat",
    initialState:{
        onlineUsers:[],
        messages:[],
        currentFollowingUsers :[]
    },
    reducers:{
        setOnlineUsers:(state,action) =>{
            state.onlineUsers = action.payload;
        },
        setMessages:(state,action) =>{
            state.messages = action.payload;
        },
        setCurrentFollowingUsers: (state, action) => {
      state.currentFollowingUsers = action.payload;
    },
    }
});

export const {setOnlineUsers,setMessages,setCurrentFollowingUsers} = chatSlice.actions;
export default chatSlice.reducer;