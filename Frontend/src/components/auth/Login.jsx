import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { PATH, ROUTES } from "@/utils/constant";


function Login() {
  const [input, setInput] = useState({
    email: "test@user.com",
    password: "test123",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        ROUTES.LOGIN_ENDPOINT,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const token = res.data.data.token;
      const user = res.data.data.user;

      if (res.data.success) {
        localStorage.setItem("token", token);
        toast.success(`Login Successfully ${user.username}`);
        navigate(PATH.HOME);
        dispatch(setAuthUser(user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        className="shadow-lg flex flex-col gap-5 p-5 mt-1 border rounded-lg"
        onSubmit={submitHandler}
      >
        <div className="my-4">
          <div className="flex items-center justify-center w-full mb-3 p-5 bg-gray-100">
            <img
              src="https://img.freepik.com/premium-vector/instagram-vector-social-media-icon_459124-558.jpg?semt=ais_hybrid&w=740&q=80"
              alt=""
              height={80}
              width={80}
            />
          </div>

          <h1 className="text-center font-bold text-2xl mb-3">Login</h1>
          <p className="text-center">explore the feed and connect with friends</p>
        </div>

        {/* Email */}
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="my-2 focus-visible:ring-transparent"
          />
        </div>

        {/* Password with visibility toggle */}
        <div>
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="my-2 focus-visible:ring-transparent pr-10"
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        {loading ? (
          <Button className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait!
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Login
          </Button>
        )}

        <span className="text-center">
          Don't have an account?
          <Link to={PATH.SIGNUP} className="text-blue-600 ml-1">
            Signup here
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
