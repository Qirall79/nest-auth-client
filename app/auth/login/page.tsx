import LoginForm from "@/components/LoginForm";
import { getSession } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const page = async () => {
  const session = await getSession();

  if (session?.user) redirect("/");

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center space-y-4">
      <LoginForm />
      
    </div>
  );
};

export default page;
