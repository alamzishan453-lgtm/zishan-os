"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState(90);

  async function loadSkills() {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("id", { ascending: false });

    setSkills(data || []);
  }

  async function addSkill() {
    if (!name) return;

    const { error } = await supabase.from("skills").insert({
      name,
      percentage,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setPercentage(90);
    loadSkills();
  }

  async function deleteSkill(id: number) {
    await supabase.from("skills").delete().eq("id", id);
    loadSkills();
  }

  useEffect(() => {
    loadSkills();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Skills</h1>

      <div className="flex gap-4 mb-8">
        <input
          className="border p-3 rounded bg-gray-900"
          placeholder="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="border p-3 rounded bg-gray-900 w-32"
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
        />

        <button
          onClick={addSkill}
          className="bg-red-600 px-6 rounded"
        >
          Add Skill
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-red-600">
            <th className="p-3">Skill</th>
            <th className="p-3">%</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id} className="border-t">
              <td className="p-3">{skill.name}</td>
              <td className="p-3">{skill.percentage}%</td>
              <td className="p-3">
                <button
                  onClick={() => deleteSkill(skill.id)}
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