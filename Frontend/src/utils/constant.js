// const BASE_API_URL = "http://localhost:5000/api";
// const BASE_API_URL = "https://5x8r3p4w-5000.inc1.devtunnels.ms/api";
const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const ROUTES = {
  BASE: BASE_API_URL,
  BASE_SOCKET : 'http://localhost:5000',

  //Authentication Endpoints
  AUTH: `${BASE_API_URL}/auth`,
  SIGNUP_ENDPOINT: `${BASE_API_URL}/auth/register`,
  LOGIN_ENDPOINT: `${BASE_API_URL}/auth/login`,
  LOGOUT_ENDPOINT: `${BASE_API_URL}/auth/logout`,

  //User Endpoints
  GET_USER_PROFILE: (userId) => `${BASE_API_URL}/user/${userId}/profile`,
  PROFILE_EDIT: `${BASE_API_URL}/user/profile/edit`,
  SUGGESTED_USERS:`${BASE_API_URL}/user/suggested`,

  


  //Post Endpoints
  GET_ALL_POST: `${BASE_API_URL}/post/`,
  ADD_POST : `${BASE_API_URL}/post/add-post`,
  DELETE_POST :(postId) => `${BASE_API_URL}/post/${postId}`,

  //Comments
  ADD_COMMENT :(postId) => `${BASE_API_URL}/post/comment/${postId}`,

   // Post like/dislike
  LIKE_POST:   (postId) => `${BASE_API_URL}/post/like/${postId}`,
  DISLIKE_POST:(postId) => `${BASE_API_URL}/post/dislike/${postId}`,

  //Messages
  SEND_MESSAGE: (receiverId) => `${BASE_API_URL}/message/send/${receiverId}`,
  GET_ALL_MESSAGE:(receiverId) => `${BASE_API_URL}/message/all/${receiverId}`,

  //Follow/Unfollow
  FOLLOW_USER :(userId) => `${BASE_API_URL}/user/followorunfollow/${userId}`,

  //Bookmark/Unbookmark
  BOOKMARK_UNBOOKMARK_POST :   (postId) => `${BASE_API_URL}/post/bookmark/${postId}`,
};

//Navigation Route Path
export const PATH = {
  //Auth
  HOME: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",

  //USER
  PROFILE: (userId) => `/profile/${userId}`,
  EDIT_PROFILE :"/account/edit",

  //Pages
  MESSAGES_PAGE :'/chat'
};
