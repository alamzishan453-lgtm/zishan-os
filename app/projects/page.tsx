"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setProjects(data || []);
    setLoading(false);
  };
    return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-4">
          My Projects
        </h1>

        <p className="text-center text-gray-400 mb-12">
          Explore my latest projects and development work.
        </p>

        {loading ? (
          <div className="text-center text-xl">
            Loading Projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-400">
            No Projects Found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-500 transition"
              >

               {project.image ? (
  <img
    src={project.image}
    alt={project.title}
    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
  />
) : (
  <div className="w-full h-56 flex items-center justify-center bg-zinc-800 text-gray-500">
    No Image
  </div>
)}
                <div className="p-6">

                  <span className="text-sm text-red-500">
                    {project.category}
                  </span>

                  <h2 className="text-2xl font-bold mt-2">
                    {project.title}
                  </h2>

                  <p className="text-gray-400 mt-3 line-clamp-3">
                    {project.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-4">
  Added on{" "}
  {new Date(project.created_at).toLocaleDateString()}
</p>

                  <div className="flex gap-3 mt-6">

                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-center py-2 rounded-lg"
                      >
                        GitHub
                      </a>
                    )}

                    {project.demo_link && (
                      <a
                        href={project.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-red-600 hover:bg-red-700 text-center py-2 rounded-lg"
                      >
                        Live Demo
                      </a>
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}