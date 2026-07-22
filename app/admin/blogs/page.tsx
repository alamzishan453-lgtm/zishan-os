"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BlogsPage() {
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(true);

  const [image, setImage] = useState<File | null>(null);

  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState("");

  async function loadBlogs() {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setBlogs(data || []);
    }
  }

  async function saveBlog() {

    let imageUrl = currentImage;

    if (image) {
      const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("blogs")
        .upload(fileName, image);

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("blogs")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/\s+/g, "-");

    let error;

    if (editingId) {
      ({ error } = await supabase
        .from("blogs")
        .update({
          title,
          slug,
          content,
          category,
          image: imageUrl,
          published,
        })
        .eq("id", editingId));
    } else {
      ({ error } = await supabase.from("blogs").insert([
        {
          title,
          slug,
          content,
          category,
          image: imageUrl,
          published,
        },
      ]));
    }

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      editingId
        ? "Blog Updated Successfully"
        : "Blog Added Successfully"
    );

    setTitle("");
    setContent("");
    setCategory("");
    setPublished(true);
    setImage(null);
    setCurrentImage("");
    setEditingId(null);
    setShowForm(false);

    loadBlogs();
  }
function editBlog(blog: any) {
  setEditingId(blog.id);

  setTitle(blog.title);
  setContent(blog.content);
  setCategory(blog.category);
  setPublished(blog.published);

  setCurrentImage(blog.image || "");
  setImage(null);

  setShowForm(true);
}

async function deleteBlog(id: number) {
  const ok = confirm("Are you sure you want to delete this blog?");

  if (!ok) return;

  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Blog Deleted Successfully");

  loadBlogs();
}
  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-red-500">
          Blog Manager
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
        >
          + Add Blog
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-zinc-900 border border-red-500 rounded-2xl p-8 w-[600px]">

            <h2 className="text-2xl font-bold mb-6">
  {editingId ? "Edit Blog" : "Add Blog"}
</h2>

            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
            />

            <textarea
              placeholder="Blog Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-40 p-3 rounded-lg bg-black border border-gray-700 mb-4"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
            />

            <div className="flex items-center gap-3 mb-6">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <label>Published</label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-2 rounded-lg bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={saveBlog}
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700"
              >
                {editingId ? "Update Blog" : "Save Blog"}
              </button>
            </div>

          </div>
        </div>
      )}

      <div className="mt-10">
        {blogs.length === 0 ? (
          <p className="text-gray-400">No blogs found.</p>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-zinc-900 border border-red-500 rounded-xl p-5"
              >
                <h2 className="text-xl font-bold">{blog.title}</h2>

                <p className="text-gray-400 mt-2">
                  {blog.category}
                </p>

                <p className="mt-2">
                  {blog.published ? "✅ Published" : "❌ Draft"}
                </p>
                <div className="flex gap-3 mt-5">
  <button
    onClick={() => editBlog(blog)}
    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() => deleteBlog(blog.id)}
    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
  >
    Delete
  </button>
</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}