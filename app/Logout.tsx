"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={handleLogout}>Logout</button>;
};
