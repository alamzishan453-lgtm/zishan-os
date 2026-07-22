"use client";

import { motion } from "framer-motion";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "Supabase",
  "Git",
  "GitHub",
  "Figma",
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 px-6 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.05,
                duration: 0.5,
              }}
              whileHover={{
                scale: 1.05,
              }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-center text-lg font-semibold hover:border-cyan-400 transition"
            >
              {skill}
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}