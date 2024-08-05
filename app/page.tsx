"use client";

import { getSession } from "@/lib/actions";
import { Logout } from "./Logout";
import { useSession } from "./useSession";

export default function Home() {
  const [session, loading] = useSession() as any;

  if (loading)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        loading...
      </main>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(session)}
      <hr />
      <Logout />
    </main>
  );
}
