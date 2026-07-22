"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  async function loadExperiences() {
    const { data } = await supabase
      .from("experiences")
      .select("*")
      .order("id", { ascending: false });

    setExperiences(data || []);
  }

  async function addExperience() {
    if (!company || !role || !duration) {
      alert("Please fill required fields.");
      return;
    }

    const { error } = await supabase.from("experiences").insert({
      company,
      role,
      duration,
      description,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setCompany("");
    setRole("");
    setDuration("");
    setDescription("");

    loadExperiences();
  }

  async function deleteExperience(id: number) {
    await supabase.from("experiences").delete().eq("id", id);
    loadExperiences();
  }

  useEffect(() => {
    loadExperiences();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Experience</h1>

      <div className="grid gap-4 mb-8">
        <input
          className="border p-3 rounded bg-gray-900"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="border p-3 rounded bg-gray-900"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          className="border p-3 rounded bg-gray-900"
          placeholder="Duration (e.g. 2024 - Present)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <textarea
          className="border p-3 rounded bg-gray-900"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={addExperience}
          className="bg-red-600 py-3 rounded"
        >
          Add Experience
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-red-600">
            <th className="p-3">Company</th>
            <th className="p-3">Role</th>
            <th className="p-3">Duration</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {experiences.map((exp) => (
            <tr key={exp.id} className="border-t">
              <td className="p-3">{exp.company}</td>
              <td className="p-3">{exp.role}</td>
              <td className="p-3">{exp.duration}</td>
              <td className="p-3">
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="bg-red-500 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}