import "./App.css";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from "./pages/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import MainLayout from "./components/MainLayout";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPage";
import {io} from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "./utils/constant";
import { setOnlineUsers } from "./redux/chatSlice";
import { setSocket } from "./redux/socketSlice";

const browserRouter = createBrowserRouter([
  {
    path:"/",
    element:  <MainLayout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/profile/:id',
        element:<Profile/>
      },
      {
        path:'/account/edit',
        element:<EditProfile/>
      },
      {
        path:'/chat',
        element:<ChatPage/>
      }
    ]
  },
  {
    path:"/signup",
    element:  <Signup/>,
  },
  {
    path:"/login",
    element:  <Login/>,
  },

])

function App() {
  const dispatch = useDispatch();
  const {user} = useSelector((store)=>store.auth);
  const { socket } = useSelector(store => store.socketio);

  useEffect(() => {
    if (user) {
      const socketio = io(ROUTES.BASE_SOCKET, {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        console.log(onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      });

      // socketio.on('notification', (notification) => {
      //   dispatch(setLikeNotification(notification));
      // });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch]);


  


  return (
    <>
    <RouterProvider router={browserRouter}/>
    </>
  );
}

export default App;
