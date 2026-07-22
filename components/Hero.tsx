"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
interface HeroProps {
  settings: any;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export default function Hero({ settings }: HeroProps) {
  return (
    <section
      id="home"
      className="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-12 pt-28 gap-16"
    >
      {/* LEFT CONTENT */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 text-center md:text-left"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium mb-6"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>

          Available for Freelance & Full-Time
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-white via-red-400 to-red-600 bg-clip-text text-transparent"
        >
          {settings?.hero_title || "Zishan Alam"}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-5 text-xl md:text-2xl font-semibold text-red-400 tracking-wide"
        >
          {settings?.hero_description ||
            "Website Builder • MS Excel • Exam Sheet Designer"}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-gray-300 leading-8 text-base md:text-lg"
        >
          Welcome to my official portfolio website. I build modern websites,
          create professional Excel solutions, design exam sheets and help
          businesses grow online.
        </motion.p> <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <motion.a
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            href="#contact"
            className="px-8 py-4 rounded-xl bg-red-500 hover:bg-red-600 font-bold shadow-lg shadow-red-500/30 transition-all duration-300"
          >
            📩 Contact Me
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            href="#projects"
            className="px-8 py-4 rounded-xl border border-red-500 hover:bg-red-500 font-semibold transition-all duration-300"
          >
            🚀 View Projects
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            href="/resume.pdf"
            download
            className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 font-semibold transition-all duration-300"
          >
            📄 Download Resume
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto md:mx-0"
        >
          <motion.div
            whileHover={{
              y: -8,
              scale: 1.05,
            }}
            className="rounded-2xl border border-red-500/20 bg-white/5 backdrop-blur-lg p-5 text-center"
          >
            <h3 className="text-3xl font-bold text-red-400">
              20+
            </h3>

            <p className="text-gray-400 text-sm mt-2">
              Projects
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.05,
            }}
            className="rounded-2xl border border-red-500/20 bg-white/5 backdrop-blur-lg p-5 text-center"
          >
            <h3 className="text-3xl font-bold text-red-400">
              3+
            </h3>

            <p className="text-gray-400 text-sm mt-2">
              Years Learning
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.05,
            }}
            className="rounded-2xl border border-red-500/20 bg-white/5 backdrop-blur-lg p-5 text-center"
          >
            <h3 className="text-3xl font-bold text-red-400">
              100%
            </h3>

            <p className="text-gray-400 text-sm mt-2">
              Dedication
            </p>
          </motion.div>
        </motion.div>

      </motion.div>
            {/* RIGHT IMAGE */}

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
        className="flex-1 flex justify-center relative"
      >
        {/* Glow Background */}
        <div className="absolute w-80 h-80 md:w-[420px] md:h-[420px] rounded-full bg-red-500/20 blur-[100px]"></div>

        {/* Floating Profile */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.03,
          }}
          className="relative"
        >
          <Image
            src={settings?.profile_image || "/profile.png"}
            alt="Profile"
            width={420}
            height={520}
            priority
            className="relative rounded-3xl border-2 border-red-500 object-cover shadow-[0_0_45px_rgba(239,68,68,0.45)]"
          />

          {/* Experience Badge */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-xl border border-red-500/30 rounded-2xl px-5 py-4 shadow-xl"
          >
            <p className="text-3xl font-bold text-red-400">
              20+
            </p>

            <p className="text-sm text-gray-300">
              Completed Projects
            </p>
          </motion.div>

          {/* Skill Badge */}
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute top-6 -right-6 bg-black/80 backdrop-blur-xl border border-red-500/30 rounded-2xl px-5 py-4 shadow-xl"
          >
            <p className="font-semibold text-red-400">
              Web Developer
            </p>

            <p className="text-sm text-gray-300">
              Next.js • Supabase
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}