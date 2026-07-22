"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CertificatesAdmin() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [image, setImage] = useState("");
  const [certificateLink, setCertificateLink] = useState("");

  async function loadCertificates() {
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .order("id", { ascending: false });

    setCertificates(data || []);
  }

  async function addCertificate() {
    await supabase.from("certificates").insert([
      {
        title,
        issuer,
        issue_date: issueDate,
        image,
        certificate_link: certificateLink,
      },
    ]);

    setTitle("");
    setIssuer("");
    setIssueDate("");
    setImage("");
    setCertificateLink("");

    loadCertificates();
  }

  async function deleteCertificate(id: number) {
    await supabase.from("certificates").delete().eq("id", id);
    loadCertificates();
  }

  useEffect(() => {
    loadCertificates();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Certificates</h1>

      <div className="space-y-4 mb-10">
        <input
          className="w-full border p-3 rounded"
          placeholder="Certificate Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Issuer"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Issue Date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Certificate Link"
          value={certificateLink}
          onChange={(e) => setCertificateLink(e.target.value)}
        />

        <button
          onClick={addCertificate}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Save Certificate
        </button>
      </div>

      <div className="space-y-4">
        {certificates.map((item) => (
          <div
            key={item.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{item.title}</h2>
              <p>{item.issuer}</p>
            </div>

            <button
              onClick={() => deleteCertificate(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}