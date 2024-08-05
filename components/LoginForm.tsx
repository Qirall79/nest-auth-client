"use client";

import { login } from "@/lib/actions";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: "email" | "password", value: string) => {
    if (field === "email") {
      setFormData({
        ...formData,
        email: value,
      });
    } else {
      setFormData({
        ...formData,
        password: value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = (process.env.NEXT_PUBLIC_API_URL as string) + "/auth/login";
    try {
      const res = await axios.post(url, formData, {
        withCredentials: true,
      });
      toast.success("logged in successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <form
      className="w-full max-w-[500px] flex flex-col space-y-4"
      onSubmit={handleSubmit}
    >
      <input
        onChange={(e) => {
          handleChange("email", e.target.value);
        }}
        className="w-full border bg-black h-12 px-2 rounded-md"
        type="email"
        name="email"
        id="email"
        placeholder="email"
      />
      <input
        onChange={(e) => {
          handleChange("password", e.target.value);
        }}
        className="w-full border bg-black h-12 px-2 rounded-md"
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />

      <button
        type="submit"
        className="bg-blue-600 w-full self-center py-2 px-8 rounded hover:bg-opacity-80 transition-all"
        disabled={false}
      >
        Log in
      </button>
      <button className="bg-pink-600 w-full self-center py-2 px-8 rounded hover:bg-opacity-80 transition-all text-center">
        <Link href="http://localhost:3000/api/auth/google">
          login with google
        </Link>
      </button>
      <button className="bg-teal-600 w-full self-center py-2 px-8 rounded hover:bg-opacity-80 transition-all text-center">
        <Link href="http://localhost:3000/api/auth/42-school">
          login with 42
        </Link>
      </button>
    </form>
  );
}
