import "./App.css";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from "./pages/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import MainLayout from "./components/MainLayout";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

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
  return (
    <>
    <RouterProvider router={browserRouter}/>
    </>
  );
}

export default App;
