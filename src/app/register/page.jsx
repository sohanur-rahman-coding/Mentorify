"use client";

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
import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Router } from "next/router";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const UserData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: UserData.name,
      email: UserData.email,
      password: UserData.password,
      image: UserData.image,
      callbackURL: "/login",
    });
    console.log(data, error);

    if (error) {
      toast.error("Login failed: " + error.message);
    } else {
      toast.success("Successfully signed in !");
      router.push("/");
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
        <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign up to get started
        </p>

        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          {/* Name */}
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) return "Name must be at least 3 characters";
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="Your Name" />
            <FieldError />
          </TextField>

          {/* profile link  */}
          <TextField
            isRequired
            name="image"
            validate={(value) => {
              if (value.length < 3) return "Name must be at least 3 characters";
              return null;
            }}
          >
            <Label>Profile Photo link</Label>
            <Input placeholder="Your DP link" />
            <FieldError />
          </TextField>

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
                  size="sm"
                  variant="ghost"
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

          {/* Submit */}
          <Button type="submit" className="w-full bg-black text-white">
            <Check className="mr-1" />
            Register
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

          {/* Login redirect */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
