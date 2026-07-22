"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);

  async function loadMessages() {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setMessages(data || []);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-bold text-red-500 text-center mb-10">
        Contact Messages
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead className="bg-red-600">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Message</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="border-t border-gray-700">
                <td className="p-4">{msg.name}</td>
                <td className="p-4">{msg.email}</td>
                <td className="p-4">{msg.subject}</td>
                <td className="p-4">{msg.message}</td>
                <td className="p-4">
                  {new Date(msg.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}