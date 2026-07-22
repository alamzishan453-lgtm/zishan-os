"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EducationPage() {
  const [education, setEducation] = useState<any[]>([]);
  const [institute, setInstitute] = useState("");
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  async function loadEducation() {
    const { data } = await supabase
      .from("education")
      .select("*")
      .order("id", { ascending: false });

    setEducation(data || []);
  }

  async function addEducation() {
    const { error } = await supabase.from("education").insert({
      institute,
      course,
      duration,
      description,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setInstitute("");
    setCourse("");
    setDuration("");
    setDescription("");

    loadEducation();
  }

  async function deleteEducation(id: number) {
    await supabase.from("education").delete().eq("id", id);
    loadEducation();
  }

  useEffect(() => {
    loadEducation();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Education</h1>

      <div className="grid gap-4 mb-8">
        <input
          placeholder="Institute"
          value={institute}
          onChange={(e) => setInstitute(e.target.value)}
          className="p-3 bg-gray-900 rounded"
        />

        <input
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="p-3 bg-gray-900 rounded"
        />

        <input
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="p-3 bg-gray-900 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 bg-gray-900 rounded"
        />

        <button
          onClick={addEducation}
          className="bg-red-600 py-3 rounded"
        >
          Add Education
        </button>
      </div>

      {education.map((item) => (
        <div
          key={item.id}
          className="border border-gray-700 rounded p-4 mb-4"
        >
          <h2 className="font-bold">{item.course}</h2>
          <p>{item.institute}</p>
          <p>{item.duration}</p>

          <button
            onClick={() => deleteEducation(item.id)}
            className="mt-3 bg-red-500 px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}