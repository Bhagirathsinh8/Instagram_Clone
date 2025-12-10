import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    suggestedUsers: [],
    userProfile: null,
    selectedUser: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateFollowState(state, action) {
      const { targetId, isNowFollowing } = action.payload;

      // Update logged-in user's following list
      if (isNowFollowing) {
        state.user.following.push(targetId);
      } else {
        state.user.following = state.user.following.filter(
          (id) => id !== targetId
        );
      }

      // Update profile followers
      if (isNowFollowing) {
        state.userProfile.followers.push(state.user._id);
      } else {
        state.userProfile.followers = state.userProfile.followers.filter(
          (id) => id !== state.user._id
        );
      }
    },

  },
});

export const {
  setAuthUser,
  setSuggestedUsers,
  setUserProfile,
  setLoading,
  setSelectedUser,
  updateFollowState,
} = authSlice.actions;
export default authSlice.reducer;
