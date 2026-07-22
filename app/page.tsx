"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);

  async function loadProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setProjects(data || []);
  }

  async function loadSettings() {
    const { data, error } = await supabase
      .from("website_settings")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.error(error);
      return;
    }
const { data: skillsData } = await supabase
  .from("skills")
  .select("*")
  .order("id", { ascending: true });

setSkills(skillsData || []);
const { data: experienceData } = await supabase
  .from("experiences")
  .select("*")
  .order("id", { ascending: true });

setExperiences(experienceData || []);
const { data: educationData } = await supabase
  .from("education")
  .select("*")
  .order("id", { ascending: true });

setEducation(educationData || []);
const { data: certificatesData } = await supabase
  .from("certificates")
  .select("*")
  .order("id", { ascending: false });

setCertificates(certificatesData || []);
    setSettings(data);
  }

  async function loadBlogs() {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error(error);
      return;
    }

    setBlogs(data || []);
  }
async function sendMessage() {
  if (!name || !contactEmail || !message) {
    alert("Please fill all required fields.");
    return;
  }

  setLoading(true);

  const { error } = await supabase
    .from("contact_messages")
    .insert([
      {
        name,
        email: contactEmail,
        subject,
        message,
      },
    ]);

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Message sent successfully!");

  setName("");
  setContactEmail("");
  setSubject("");
  setMessage("");
}
  useEffect(() => {
    if (typeof window === "undefined") return;

    const popupSeen = sessionStorage.getItem("popupSeen");

    if (!popupSeen && window.innerWidth < 768) {
      setShowPopup(true);
      sessionStorage.setItem("popupSeen", "true");
    }

    loadSettings();
    loadProjects();
    loadBlogs();
  }, []);
  useEffect(() => {
  const sections = document.querySelectorAll("section[id]");

  const onScroll = () => {
    let current = "home";

    sections.forEach((section) => {
      const top = (section as HTMLElement).offsetTop - 120;
      const height = (section as HTMLElement).offsetHeight;

      if (window.scrollY >= top && window.scrollY < top + height) {
        current = section.id;
      }
    });

    setActiveSection(current);
  };

  window.addEventListener("scroll", onScroll);

  return () => window.removeEventListener("scroll", onScroll);
}, []);
return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {showPopup && (
        <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center px-6">
          <div className="bg-white text-black rounded-3xl p-8 max-w-sm text-center shadow-2xl">

            <h2 className="text-2xl font-bold mb-4">
              💻 Best Experience
            </h2>

            <p className="text-gray-700 mb-6">
              For the best experience, please enable Desktop Mode.
            </p>

           <button
  onClick={() => setShowPopup(false)}
  className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
>
  Desktop Mode
</button>

          </div>
        </div>
      )}
<div className="absolute inset-0">
  <Image
  src={settings?.hero_image || "/profile.png"}
  alt="Background"
  fill
  priority
  className="object-cover object-top md:object-center opacity-70 md:opacity-40"
/>

  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-red-900/20 md:from-black md:via-black/80 md:to-red-900/40"></div>

  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
</div>

<nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-red-500/20 shadow-lg">
  <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">

<a href="#home" className="flex items-center gap-3">
  <Image
    src={settings?.logo || "/logo.png"}
    alt={settings?.website_name || "Logo"}
    width={55}
    height={55}
    className="object-contain"
  />

  <div>
    <h1 className="text-xl font-bold hover:text-red-500 transition">
      {settings?.website_name || "Zishan Alam"}
    </h1>
  </div>
</a>

<div className="hidden md:flex gap-8 text-lg">
  <a
  href="#home"
  className={`transition duration-300 ${
    activeSection === "home"
      ? "text-red-500 font-semibold"
      : "hover:text-red-500"
  }`}
>
  Home
</a>
  <a
  href="#about"
  className={`transition duration-300 ${
    activeSection === "about"
      ? "text-red-500 font-semibold"
      : "hover:text-red-500"
  }`}
>
  About
</a>
  <a
  href="#experience"
  className={`transition duration-300 ${
    activeSection === "experience"
      ? "text-red-500 font-semibold"
      : "hover:text-red-500"
  }`}
>
  Experience
</a>
  <a
  href="#education"
  className={`transition duration-300 ${
    activeSection === "education"
      ? "text-red-500 font-semibold"
      : "hover:text-red-500"
  }`}
>
  Education
</a>
  <a
  href="#certificates"
  className={`transition duration-300 ${
    activeSection === "certificates"
      ? "text-red-500 font-semibold"
      : "hover:text-red-500"
  }`}
>
  Certificates
</a>
  <a
  href="#projects"
  className={`transition duration-300 ${
    activeSection === "projects"
      ? "text-red-500 font-semibold"
      : "hover:text-red-500"
  }`}
>
  Projects
</a>
  <a
  href="#notes"
  className={`transition duration-300 ${
    activeSection === "notes"
      ? "text-red-500 font-semibold"
      : "hover:text-red-500"
  }`}
>
  Notes
</a>
  <a
  href="#files"
  className={`transition duration-300 ${
    activeSection === "files"
      ? "text-red-500 font-semibold"
      : "hover:text-red-500"
  }`}
>
  Files
</a>
 <a
  href="#contact"
  className={`transition duration-300 ${
    activeSection === "contact"
      ? "text-red-500 font-semibold"
      : "hover:text-red-500"
  }`}
>
  Contact
</a>
</div>

<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden text-3xl"
>
  {menuOpen ? "✕" : "☰"}
</button>

</div>
</nav>
{menuOpen && (
  <div className="md:hidden fixed top-[88px] left-0 w-full bg-black/95 backdrop-blur-xl border-b border-red-500/20 z-40">
    <div className="flex flex-col p-6 space-y-5 text-lg">

      <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
      <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
      <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
      <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
      <a href="#certificates" onClick={() => setMenuOpen(false)}>Certificates</a>
      <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
      <a href="#notes" onClick={() => setMenuOpen(false)}>Notes</a>
      <a href="#files" onClick={() => setMenuOpen(false)}>Files</a>
      <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

    </div>
  </div>
)}
<Hero settings={settings} />

<section className="relative z-10 py-24 px-6 bg-black/30">
  <div className="max-w-7xl mx-auto">

    <div className="flex items-center justify-between mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-red-500">
        Latest Blogs
      </h2>

      <a
        href="/blog"
        className="border border-red-500 px-5 py-2 rounded-lg hover:bg-red-500 transition"
      >
        View All
      </a>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white/5 border border-red-500/30 rounded-3xl overflow-hidden backdrop-blur-lg hover:scale-105 transition"
        >
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-52 object-cover"
            />
          )}

          <div className="p-6">
            <p className="text-red-400 text-sm">
              {blog.category}
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {blog.title}
            </h3>

            <p className="text-gray-300 mt-3 line-clamp-3">
              {blog.content}
            </p>

            <a
              href={`/blog/${blog.slug}`}
              className="inline-block mt-5 bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600"
            >
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>
<section id="about" className="relative z-10 py-24 bg-black/40 backdrop-blur-sm">
<div className="max-w-6xl mx-auto px-6">
<h2 className="text-4xl font-bold text-red-500 mb-10">About Me</h2>

<div className="grid md:grid-cols-2 gap-10">

<div className="rounded-3xl border border-red-500/30 bg-white/5 p-8">
<h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
<p className="text-gray-300 leading-8">
Hi, I'm Zishan Alam. I build modern websites, create professional MS Excel solutions, design exam sheets, and continuously learn new digital skills. My goal is to create useful and visually appealing projects.
</p>
</div>

<div className="rounded-3xl border border-red-500/30 bg-white/5 p-8">
<h3 className="text-2xl font-semibold mb-4">Skills</h3>

<div className="space-y-5">
  {skills.map((skill) => (
    <div key={skill.id}>
      <div className="flex justify-between mb-2">
        <span>{skill.name}</span>
        <span>{skill.percentage}%</span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-3">
        <div
          className="bg-red-500 h-3 rounded-full"
          style={{ width: `${skill.percentage}%` }}
        />
      </div>
    </div>
  ))}
</div>

</div>

</div>
</div>
</section>
<section id="experience" className="relative z-10 py-24 px-6 bg-black/30">
  <div className="max-w-6xl mx-auto">

    <h2 className="text-4xl md:text-5xl font-bold text-center text-red-500 mb-12">
      Experience
    </h2>

    <div className="space-y-8">

      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="rounded-3xl border border-red-500/30 bg-white/5 p-8 backdrop-blur-lg"
        >
          <h3 className="text-2xl font-bold">
            {exp.role}
          </h3>

          <p className="text-red-400 mt-2">
            {exp.company}
          </p>

          <p className="text-gray-400 text-sm mt-1">
            {exp.duration}
          </p>

          <p className="text-gray-300 mt-5 leading-8">
            {exp.description}
          </p>

        </div>
      ))}

    </div>

  </div>
</section>
<section id="education" className="relative z-10 py-24 px-6">

  <div className="max-w-6xl mx-auto">



    <h2 className="text-4xl md:text-5xl font-bold text-center text-red-500 mb-12">

      Education

    </h2>



    <div className="space-y-8">



      {education.map((item) => (

        <div

          key={item.id}

          className="rounded-3xl border border-red-500/30 bg-white/5 p-8"

        >

          <h3 className="text-2xl font-bold">

            {item.course}

          </h3>



          <p className="text-red-400 mt-2">

            {item.institute}

          </p>



          <p className="text-gray-400 mt-1">

            {item.duration}

          </p>



          <p className="text-gray-300 mt-5">

            {item.description}

          </p>

        </div>

      ))}



    </div>



  </div>

</section>
<section id="certificates" className="relative z-10 py-24 px-6 bg-black/30">
  <div className="max-w-7xl mx-auto">

    <h2 className="text-4xl md:text-5xl font-bold text-center text-red-500 mb-12">
      Certificates
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {certificates.map((item) => (
        <div
          key={item.id}
          className="rounded-3xl border border-red-500/30 bg-white/5 backdrop-blur-lg overflow-hidden hover:scale-105 transition"
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover"
            />
          )}

          <div className="p-6">
            <h3 className="text-2xl font-bold">
              {item.title}
            </h3>

            <p className="text-red-400 mt-2">
              {item.issuer}
            </p>

            <p className="text-gray-400 mt-1">
              {item.issue_date}
            </p>

            {item.certificate_link && (
              <a
                href={item.certificate_link}
                target="_blank"
                className="inline-block mt-6 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl"
              >
                View Certificate
              </a>
            )}
          </div>
        </div>
      ))}
    </div>

  </div>
</section>
<section id="projects" className="relative z-10 py-24 px-6">
<div className="max-w-7xl mx-auto">

<h2 className="text-4xl md:text-5xl font-bold text-center text-red-500 mb-12">
My Projects
</h2>

<div className="grid md:grid-cols-3 gap-8">
  {projects.map((project) => (
    <div
      key={project.id}
      className="bg-white/5 border border-red-500/30 rounded-3xl overflow-hidden backdrop-blur-lg hover:scale-105 transition"
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-52 object-cover"
        />
      ) : (
        <div className="w-full h-52 flex items-center justify-center bg-zinc-800">
          No Image
        </div>
      )}

      <div className="p-6">
        <span className="text-red-400 text-sm">
          {project.category}
        </span>

        <h3 className="text-2xl font-bold mt-2">
          {project.title}
        </h3>

        <p className="text-gray-300 mt-3 line-clamp-3">
          {project.description}
        </p>

        <div className="flex gap-3 mt-6">
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              className="px-4 py-2 bg-red-500 rounded-lg"
            >
              GitHub
            </a>
          )}

          {project.demo_link && (
            <a
              href={project.demo_link}
              target="_blank"
              className="px-4 py-2 border border-red-500 rounded-lg"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  ))}
</div>

</div>
</section>
<section id="notes" className="relative z-10 py-24 px-6 bg-black/30">
<div className="max-w-7xl mx-auto">

<h2 className="text-4xl md:text-5xl font-bold text-center text-red-500 mb-12">
Notes
</h2>

<div className="grid md:grid-cols-3 gap-8">

<div className="rounded-3xl bg-white/5 border border-red-500/30 p-8 backdrop-blur-lg hover:scale-105 transition">
<h3 className="text-2xl font-bold mb-4">HTML Notes</h3>
<p className="text-gray-300 mb-6">
Beginner to Advanced HTML Notes.
</p>
<a
href="/Physics_Question_Paper_A4.pdf"
download
className="inline-block px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
>
Download
</a>
</div>

<div className="rounded-3xl bg-white/5 border border-red-500/30 p-8 backdrop-blur-lg hover:scale-105 transition">
<h3 className="text-2xl font-bold mb-4">CSS Notes</h3>
<p className="text-gray-300 mb-6">
Complete CSS Learning Notes.
</p>
<a
href="/Physics_Question_Paper_A4.pdf"
download
className="inline-block px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
>
Download
</a>
</div>

<div className="rounded-3xl bg-white/5 border border-red-500/30 p-8 backdrop-blur-lg hover:scale-105 transition">
<h3 className="text-2xl font-bold mb-4">JavaScript Notes</h3>
<p className="text-gray-300 mb-6">
Modern JavaScript PDF Notes.
</p>
<a
href="/Physics_Question_Paper_A4.pdf"
download
className="inline-block px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
>
Download
</a>
</div>

</div>

</div>
</section>
<section id="files" className="relative z-10 py-24 px-6">
<div className="max-w-7xl mx-auto">

<h2 className="text-4xl md:text-5xl font-bold text-center text-red-500 mb-12">
Files
</h2>

<div className="grid md:grid-cols-3 gap-8">

<div className="rounded-3xl bg-white/5 border border-red-500/30 p-8 backdrop-blur-lg hover:scale-105 transition">
<h3 className="text-2xl font-bold mb-4">Portfolio PDF</h3>
<p className="text-gray-300 mb-6">
Download my latest portfolio.
</p>
<a href="/Physics_Question_Paper_A4.pdf" className="inline-block px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition">
Download
</a>
</div>

<div className="rounded-3xl bg-white/5 border border-red-500/30 p-8 backdrop-blur-lg hover:scale-105 transition">
<h3 className="text-2xl font-bold mb-4">Resume</h3>
<p className="text-gray-300 mb-6">
Download my professional resume.
</p>
<a href="/Physics_Question_Paper_A4.pdf" className="inline-block px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition">
Download
</a>
</div>

<div className="rounded-3xl bg-white/5 border border-red-500/30 p-8 backdrop-blur-lg hover:scale-105 transition">
<h3 className="text-2xl font-bold mb-4">Resources</h3>
<p className="text-gray-300 mb-6">
Useful files and documents.
</p>
<a href="/Physics_Question_Paper_A4.pdf" className="inline-block px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition">
Download
</a>
</div>

</div>

</div>
</section>
<section id="contact" className="relative z-10 py-24 px-6">
  <div className="max-w-3xl mx-auto">

    <h2 className="text-4xl md:text-5xl font-bold text-red-500 text-center mb-6">
      Contact Me
    </h2>

    <p className="text-gray-300 text-center mb-10">
      Have a project or question? Send me a message.
    </p>

    <div className="space-y-5">

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-4 rounded-xl bg-white/5 border border-red-500/30"
      />

      <input
        type="email"
        placeholder="Your Email"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
        className="w-full p-4 rounded-xl bg-white/5 border border-red-500/30"
      />

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-4 rounded-xl bg-white/5 border border-red-500/30"
      />

      <textarea
        placeholder="Your Message"
        rows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-4 rounded-xl bg-white/5 border border-red-500/30"
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-xl font-bold"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

    </div>

  </div>
</section>
<footer className="relative z-10 border-t border-red-500/20 bg-black/60 backdrop-blur-xl">
  <div className="max-w-7xl mx-auto px-6 py-14">

    <div className="grid md:grid-cols-3 gap-10">

      {/* Brand */}
      <div>
        <h2 className="text-3xl font-bold text-red-500">
          {settings?.website_name || "Zishan Alam"}
        </h2>

        <p className="mt-4 text-gray-400 leading-8">
          Passionate Web Developer, MS Excel Expert and Designer dedicated to
          building modern, responsive and high-quality digital solutions.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-5">
          Quick Links
        </h3>

        <div className="flex flex-col gap-3 text-gray-400">
          <a href="#home" className="hover:text-red-400">Home</a>
          <a href="#about" className="hover:text-red-400">About</a>
          <a href="#projects" className="hover:text-red-400">Projects</a>
          <a href="#contact" className="hover:text-red-400">Contact</a>
        </div>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-5">
          Contact
        </h3>
        <div className="flex gap-4 mt-6">
  <a
  href="https://github.com/alamzishan453-lgtm"
  target="_blank"
  rel="noopener noreferrer"
  className="w-12 h-12 rounded-full bg-white/5 border border-red-500/30 flex items-center justify-center hover:bg-red-500 transition"
>
  🌐
</a>

  <a
  href="https://www.linkedin.com/in/zishan-alam-a6bba9423/"
  target="_blank"
  rel="noopener noreferrer"
  className="w-12 h-12 rounded-full bg-white/5 border border-red-500/30 flex items-center justify-center hover:bg-red-500 transition"
>
  💼
</a>

  <a
  href="https://www.instagram.com/g_shan_7?igsh=MXkyNWdya2pmMWQ2eg=="
  target="_blank"
  rel="noopener noreferrer"
  className="w-12 h-12 rounded-full bg-white/5 border border-red-500/30 flex items-center justify-center hover:bg-red-500 transition"
>
  📷
</a>

  <a
  href="https://youtube.com/@zishan_facts_?si=MureP1CR7AHraNfT"
  target="_blank"
  rel="noopener noreferrer"
  className="w-12 h-12 rounded-full bg-white/5 border border-red-500/30 flex items-center justify-center hover:bg-red-500 transition"
>
  ▶️
</a>
</div>

        <div className="space-y-3 text-gray-400">
          <p>📧 alamzishan453@gmail.com</p>
          <p>📍 Bihar, India</p>
          <p>💼 Available for Freelance</p>
        </div>
      </div>

    </div>

    <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-500">
      © {new Date().getFullYear()} {settings?.website_name || "Zishan Alam"}.
      All Rights Reserved.
    </div>

  </div>
</footer>

</main>
);
}