import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";

function Login() {
  let loading = false;
  const [input, setInput] = useState({
    email: "test@user.com",
    password: "test123",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        input
      );

      const token = res.data.data.token;
      const user = res.data.data.user;

      if (res.data.success) {
        localStorage.setItem("token", token);
        alert(res.data.message);
        alert(`Login Successfully ${user.username}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        action=""
        className="shadow-lg flex flex-col gap-5 p-5 mt-1 border rounded-lg"
        onSubmit={submitHandler}
      >
        <div className="my-4">
          {/* <h1 className='text-center'>LOGO</h1> */}
          <div className="flex items-center justify-center w-full mb-3 p-5 bg-gray-100">
            <img
              src="https://img.freepik.com/premium-vector/instagram-vector-social-media-icon_459124-558.jpg?semt=ais_hybrid&w=740&q=80"
              alt=""
              height={90}
              width={90}
            />
          </div>
          <h1 className="text-center font-bold text-2xl mb-3">Login</h1>
          <p className="text-center">
            explore the feed and connect with friends
          </p>
        </div>
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
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="my-2 focus-visible:ring-transparent"
          />
        </div>

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
      </form>
    </div>
  );
}

export default Login;
