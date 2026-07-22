"use client";

import { motion } from "framer-motion";

interface AboutProps {
  settings: any;
}

export default function About({ settings }: AboutProps) {
  return (
    <section
      id="about"
      className="relative max-w-7xl mx-auto px-6 md:px-12 py-24"
    >
      {/* About Content */}
    </section>
  );
}
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

({ settings }: AboutProps)=> 
    {
  return (
    <section
      id="about"
      className="relative max-w-7xl mx-auto px-6 md:px-12 py-24"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center text-white"
        >
          About Me
        </motion.h2>

 <motion.div
          variants={itemVariants}
          className="w-24 h-1 bg-red-500 mx-auto rounded-full mt-4 mb-10"
        />

        <motion.p
          variants={itemVariants}
          className="max-w-3xl mx-auto text-center text-gray-300 leading-8 text-lg"
        >
          {settings?.about ||
            "I am a passionate Web Developer and Excel Specialist. I build modern websites, create professional dashboards, design exam sheets, and continuously learn new technologies to deliver high-quality solutions."}
        </motion.p>
                <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="rounded-2xl border border-red-500/20 bg-white/5 backdrop-blur-lg p-6"
          >
            <h3 className="text-xl font-bold text-red-400 mb-3">
              Experience
            </h3>

            <p className="text-gray-300">
              Building responsive websites using Next.js, Tailwind CSS and
              Supabase with a focus on clean UI and performance.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="rounded-2xl border border-red-500/20 bg-white/5 backdrop-blur-lg p-6"
          >
            <h3 className="text-xl font-bold text-red-400 mb-3">
              Education
            </h3>

            <p className="text-gray-300">
              Bachelor of Computer Applications (BCA) with continuous learning
              in web development and modern technologies.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="rounded-2xl border border-red-500/20 bg-white/5 backdrop-blur-lg p-6"
          >
            <h3 className="text-xl font-bold text-red-400 mb-3">
              Location
            </h3>

            <p className="text-gray-300">
              Bihar, India — Available for freelance and full-time
              opportunities.
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="rounded-xl bg-red-500/10 border border-red-500/20 p-5 text-center"
          >
            <h4 className="text-2xl font-bold text-red-400">Next.js</h4>
            <p className="text-gray-400 mt-2 text-sm">Frontend</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="rounded-xl bg-red-500/10 border border-red-500/20 p-5 text-center"
          >
            <h4 className="text-2xl font-bold text-red-400">Supabase</h4>
            <p className="text-gray-400 mt-2 text-sm">Backend</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="rounded-xl bg-red-500/10 border border-red-500/20 p-5 text-center"
          >
            <h4 className="text-2xl font-bold text-red-400">Tailwind</h4>
            <p className="text-gray-400 mt-2 text-sm">UI Design</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="rounded-xl bg-red-500/10 border border-red-500/20 p-5 text-center"
          >
            <h4 className="text-2xl font-bold text-red-400">Excel</h4>
            <p className="text-gray-400 mt-2 text-sm">Advanced</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}