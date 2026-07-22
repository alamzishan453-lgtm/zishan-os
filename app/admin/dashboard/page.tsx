"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  const cards = [
    {
      title: "Projects",
      description: "Manage portfolio projects",
      link: "/admin/projects",
    },
    {
      title: "Blogs",
      description: "Manage blog posts",
      link: "/admin/blogs",
    },
    {
      title: "Skills",
      description: "Manage skills",
      link: "/admin/skills",
    },
    {
      title: "Experience",
      description: "Manage experience",
      link: "/admin/experience",
    },
    {
      title: "Education",
      description: "Manage education",
      link: "/admin/education",
    },
    {
      title: "Certificates",
      description: "Manage certificates",
      link: "/admin/certificates",
    },
    {
      title: "Messages",
      description: "View contact messages",
      link: "/admin/messages",
    },
    {
      title: "Settings",
      description: "Website settings",
      link: "/admin/settings",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-red-500">
            Portfolio Admin Dashboard
          </h1>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.link}
              className="bg-zinc-900 border border-red-500 rounded-2xl p-6 hover:bg-zinc-800 transition"
            >
              <h2 className="text-2xl font-bold text-red-400">
                {card.title}
              </h2>

              <p className="mt-3 text-gray-400">
                {card.description}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}