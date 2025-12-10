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

      // 1. Update logged-in user's following list
      if (isNowFollowing) {
        if (!state.user.following.includes(targetId)) {
          state.user.following.push(targetId);
        }
      } else {
        state.user.following = state.user.following.filter(
          (id) => id !== targetId
        );
      }

      // 2. Update current profile page (only if the profile user is same as target)
      if (state.userProfile && state.userProfile._id === targetId) {
        if (isNowFollowing) {
          if (!state.userProfile.followers.includes(state.user._id)) {
            state.userProfile.followers.push(state.user._id);
          }
        } else {
          state.userProfile.followers = state.userProfile.followers.filter(
            (id) => id !== state.user._id
          );
        }
      }

      // 3. Update suggested users list
      state.suggestedUsers = state.suggestedUsers.map((u) => {
        if (u._id === targetId) {
          return {
            ...u,
            followers: isNowFollowing
              ? [...u.followers, state.user._id]
              : u.followers.filter((id) => id !== state.user._id),
          };
        }
        return u;
      });
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
