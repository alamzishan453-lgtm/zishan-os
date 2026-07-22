"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProjectsPage() {
  const [editingId, setEditingId] = useState<number | null>(null);
const [currentImage, setCurrentImage] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [github, setGithub] = useState("");
const [demo, setDemo] = useState("");
const [category, setCategory] = useState("");

// 👇 Ye nayi line add karo
const [featured, setFeatured] = useState(false);

const [image, setImage] = useState<File | null>(null);
  useEffect(() => {
    loadProjects();
  }, []);
  const loadProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("LOAD PROJECTS ERROR:", error);
    alert(error.message);
    return;
  }

  if (data) {
    setProjects(data);
  }
};
const saveProject = async () => {
  let imageUrl = "";

  // Check session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("SESSION:", session);

  if (!session) {
    alert("Please login first.");
    return;
  }

  // Upload image
  if (image) {
    const fileName = `${Date.now()}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("projects")
      .upload(fileName, image);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

    imageUrl = data.publicUrl;
  }

  // Save project
let error;

if (editingId) {
  const { error: updateError } = await supabase
    .from("projects")
    .update({
      title,
      description,
      github_link: github,
      demo_link: demo,
      category,
      image: image ? imageUrl : currentImage,
      featured,
    })
    .eq("id", editingId);

  error = updateError;
} else {
  const { error: insertError } = await supabase
    .from("projects")
    .insert([
      {
        title,
        description,
        github_link: github,
        demo_link: demo,
        category,
        image: imageUrl,
        featured,
      },
    ]);

  error = insertError;
}
  if (error) {
    console.log("INSERT ERROR:", error);

    alert(
      `Code: ${error.code}
Message: ${error.message}
Details: ${error.details}
Hint: ${error.hint}`
    );

    return;
  }

alert(editingId ? "Project Updated Successfully" : "Project Added Successfully");

  setTitle("");
  setDescription("");
  setGithub("");
  setDemo("");
  setCategory("");
  setFeatured(false);
  setImage(null);
  setShowForm(false);
setEditingId(null);
setCurrentImage("");
  loadProjects();
};
const deleteProject = async (id: number) => {
  if (!confirm("Delete this project?")) return;

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  setProjects((prev) => prev.filter((p) => p.id !== id));

  alert("Project Deleted Successfully");
};
const editProject = (project: any) => {
  setEditingId(project.id);

  setTitle(project.title);
  setDescription(project.description);
  setGithub(project.github_link || "");
  setDemo(project.demo_link || "");
  setCategory(project.category || "");
  setFeatured(project.featured || false);
  setCurrentImage(project.image || "");

  setImage(null);
  setShowForm(true);
};
return (
  <main className="min-h-screen bg-black text-white p-8">
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-5xl font-bold text-red-500">
        Projects
      </h1>

      <button
        onClick={() => setShowForm(true)}
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
      >
        + Add Project
      </button>
    </div>

    {showForm && (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-zinc-900 p-8 rounded-2xl w-[600px] border border-red-500">

          <h2 className="text-3xl font-bold text-red-500 mb-6">
            Add Project
          </h2>

          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-28 p-3 rounded-lg bg-black border border-gray-700 mb-4"
          />

          <input
            type="text"
            placeholder="GitHub Link"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
          />

          <input
            type="text"
            placeholder="Live Demo Link"
            value={demo}
            onChange={(e) => setDemo(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
          />
          <div className="flex items-center gap-3 mb-6">
  <input
    type="checkbox"
    id="featured"
    checked={featured}
    onChange={(e) => setFeatured(e.target.checked)}
    className="w-5 h-5"
  />

  <label htmlFor="featured" className="text-white">
    Featured Project
  </label>
</div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setImage(e.target.files[0]);
              }
            }}
            className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-6"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-2 rounded-lg bg-gray-700"
            >
              Cancel
            </button>

            <button
              onClick={saveProject}
              className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700"
            >
              Save Project
            </button>
          </div>

        </div>
      </div>
    )}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-red-500">
      <h2 className="text-2xl font-bold mb-6">
        Projects List
      </h2>

      {projects.length === 0 ? (
        <p className="text-gray-400">
          No Projects Found.
        </p>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between bg-black p-4 rounded-xl border border-zinc-700"
            >
              <div>
                <h3 className="text-xl font-bold">
                  {project.title}
                </h3>

                <p className="text-gray-400">
                  {project.description}
                </p>

                <p className="text-red-500 mt-2">
                  {project.category}
                </p>

                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-24 h-24 object-cover rounded-lg mt-3"
                  />
                )}
              </div>

              <div className="flex gap-3">
                <button
                onClick={() => editProject(project)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
  onClick={() => deleteProject(project.id)}
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