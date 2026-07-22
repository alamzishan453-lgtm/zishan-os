"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SingleBlogPage() {
  const { slug } = useParams();

  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      loadBlog();
    }
  }, [slug]);

  async function loadBlog() {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", String(slug))
      .maybeSingle();

    if (error) {
  console.error(error);
  return;
}

if (!data) {
  console.log("Blog not found");
  return;
}

setBlog(data);
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-10">
      <div className="max-w-4xl mx-auto px-6">

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full rounded-xl mb-8"
          />
        )}

        <p className="text-red-500">{blog.category}</p>

        <h1 className="text-5xl font-bold mt-3 mb-6">
          {blog.title}
        </h1>

        <div className="whitespace-pre-wrap text-gray-300 leading-8">
          {blog.content}
        </div>

      </div>
    </main>
  );
}