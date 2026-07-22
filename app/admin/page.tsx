"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from 
"@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const login = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    router.push("/admin/dashboard");
  }
};

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 border border-red-500">

        <h1 className="text-3xl font-bold text-center text-red-500 mb-8">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-black text-white border border-gray-700 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-black text-white border border-gray-700 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
  onClick={login}
  className="w-full bg-red-500 hover:bg-red-600 p-4 rounded-xl font-bold"
>
  Login
</button>

      </div>

    </main>
  );
}