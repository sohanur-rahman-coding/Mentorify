"use client";

import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
;

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const UserData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: UserData.email,
      password: UserData.password,
      // callbackURL: "/",
    });

    if (error) {
      toast.error("Login failed: " + error.message);
    } else {
      toast.success("Successfully signed in !");
    }
  };
  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="animate__animated animate__fadeInDown min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to your account
        </p>

        {/* Form */}
        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Enter a valid email";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="name@example.com" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField name="password" isRequired>
            <Label>Password</Label>
            <InputGroup>
              <InputGroup.Input
                type={isVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
              />
              <InputGroup.Suffix>
                <Button
                  isIconOnly
                  variant="ghost"
                  size="sm"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
          </TextField>

          {/* Buttons */}
          <Button type="submit" className="w-full bg-black text-white">
            <Check className="mr-1" />
            Login
          </Button>
          <div className="flex items-center my-1">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 font-medium text-sm">
              OR
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
            className="btn btn-outline rounded-4xl flex items-center justify-center gap-2"
            onClick={signIn}
          >
            <FcGoogle />
            login with Google{" "}
          </button>

          {/* Extra */}
          <p className="text-center text-sm text-gray-500">
            Dont have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
