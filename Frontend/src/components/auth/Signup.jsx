import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { PATH, ROUTES } from "@/utils/constant";
import { useSelector } from "react-redux";

function Signup() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    const {user} = useSelector(store=>store.auth)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        ROUTES.SIGNUP_ENDPOINT,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
        navigate(PATH.LOGIN);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

   useEffect(()=>{
    if(user){
      navigate(PATH.HOME)
    }
   },[]);

  return (
  <div className="flex items-center justify-center min-h-screen px-4">
    <form
      className="shadow-lg flex flex-col gap-5 p-6 border rounded-lg w-full max-w-sm bg-white"
      onSubmit={submitHandler}
    >
      <div className="my-1">
        <div className="flex items-center justify-center w-full mb-3 p-4 bg-gray-100 rounded-md">
          <img
            src="https://img.freepik.com/premium-vector/instagram-vector-social-media-icon_459124-558.jpg?semt=ais_hybrid&w=740&q=80"
            alt=""
            className="h-20 w-20 object-cover"
          />
        </div>

        <h1 className="text-center font-bold text-2xl mb-2">Signup</h1>
        <p className="text-center text-gray-600 text-sm">
          Signup to see photos and videos from your friends
        </p>
      </div>

      <div>
        <Label>Username</Label>
        <Input
          type="text"
          name="username"
          value={input.username}
          onChange={changeEventHandler}
          className="my-2"
        />
      </div>

      <div>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={input.email}
          onChange={changeEventHandler}
          className="my-2"
        />
      </div>

      <div>
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          value={input.password}
          onChange={changeEventHandler}
          className="my-2"
        />
      </div>

      {loading ? (
        <Button className="w-full my-3">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait!
        </Button>
      ) : (
        <Button type="submit" className="w-full my-3">
          Signup
        </Button>
      )}

      <span className="text-center text-sm">
        Already have an account?{" "}
        <Link to={PATH.LOGIN} className="text-blue-600 font-medium">
          Login here
        </Link>
      </span>
    </form>
  </div>
);

}

export default Signup;
