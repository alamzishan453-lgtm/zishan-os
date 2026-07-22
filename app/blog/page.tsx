"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (!error) {
      setBlogs(data || []);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold text-center mb-10 text-red-500">
        My Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-400">
          No blogs available.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-red-500"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />
              )}

              <div className="p-5">
                <p className="text-red-400 text-sm">
                  {blog.category}
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {blog.title}
                </h2>

                <p className="text-gray-400 mt-3 line-clamp-3">
                  {blog.content}
                </p>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-block mt-5 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}