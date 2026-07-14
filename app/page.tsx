import Image from "next/image";

export default function Home() {
return(
<main className="relative min-h-screen overflow-hidden bg-black text-white">

<div className="absolute inset-0">
<Image
src="/profile.png"
alt="Background"
fill
priority
className="object-cover object-center opacity-40"
/>
<div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-red-900/40"></div>
<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
</div>

<nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
<div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

<Image
  src="/logo.png"
  alt="ZA Logo"
  width={55}
  height={55}
/>

<div className="hidden md:flex gap-8 text-lg">
<a href="#home">Home</a>
<a href="#about">About</a>
<a href="#projects">Projects</a>
<a href="#notes">Notes</a>
<a href="#files">Files</a>
<a href="#contact">Contact</a>
</div>

<button className="md:hidden text-3xl">
☰
</button>

</div>
</nav>

<section
  id="home"
  className="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-12 pt-24"
>

<div className="max-w-2xl">

<h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
Zishan Alam
</h1>

<p className="mt-5 text-xl md:text-2xl text-red-400">
Website Builder • MS Excel • Exam Sheet Designer
</p><p className="mt-8 text-lg text-gray-300 leading-8">
Welcome to my official portfolio website.
I build modern websites, create professional Excel solutions,
design exam sheets and help businesses grow online.
</p>

<div className="mt-10 flex flex-col sm:flex-row gap-5">

<a href="#contact" className="px-8 py-4 rounded-xl bg-red-500 hover:bg-red-600 transition font-bold inline-block">
Contact Me
</a>

<a href="#projects" className="px-8 py-4 rounded-xl border border-red-500 hover:bg-red-500 transition inline-block">
View Projects
</a>

</div>

</div>

<div className="hidden md:block w-[420px]">
<Image
src="/profile.png"
alt="Profile"
width={420}
height={620}
priority
className="rounded-3xl shadow-2xl border border-red-500"
 />
</div></section>
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

<div className="space-y-4">
<p>🌐 Website Development</p>
<p>📊 MS Excel</p>
<p>📄 Exam Sheet Design</p>
<p>🎨 Graphic Design</p>
<p>📱 Social Media Content</p>
</div>

</div>

</div>
</div>
</section>
<section id="projects" className="relative z-10 py-24 px-6">
<div className="max-w-7xl mx-auto">

<h2 className="text-4xl md:text-5xl font-bold text-center text-red-500 mb-12">
My Projects
</h2>

<div className="grid md:grid-cols-3 gap-8">

<div className="bg-white/5 border border-red-500/30 rounded-3xl p-8 backdrop-blur-lg hover:scale-105 transition">
<h3 className="text-2xl font-bold mb-4">🌐 Portfolio Website</h3>
<p className="text-gray-300">
Modern responsive portfolio website built using Next.js and Tailwind CSS.
</p>
</div>

<div className="bg-white/5 border border-red-500/30 rounded-3xl p-8 backdrop-blur-lg hover:scale-105 transition">
<h3 className="text-2xl font-bold mb-4">📊 Excel Dashboard</h3>
<p className="text-gray-300">
Professional Excel dashboards and automation projects.
</p>
</div>

<div className="bg-white/5 border border-red-500/30 rounded-3xl p-8 backdrop-blur-lg hover:scale-105 transition">
<h3 className="text-2xl font-bold mb-4">📄 Exam Sheet Design</h3>
<p className="text-gray-300">
Beautiful printable exam sheets and office documents.
</p>
</div>

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
<div className="max-w-4xl mx-auto text-center">

<h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-6">
Contact Me
</h2>

<p className="text-gray-300 mb-10">
Feel free to contact me for website development, Excel work or any project.
</p>

<div className="space-y-5 text-lg">

<a href="mailto:alamzishan453@gmail.com" className="block hover:text-red-400 transition">
📧 Email: alamzishan453@gmail.com
</a>

<a href="tel:+919102657318" className="block hover:text-red-400 transition">
📱 Phone: +91 9102657318
</a>

<a href="https://www.instagram.com/g_shan_7?igsh=MXkyNWdya2pmMWQ2eg==" target="_blank" rel="noopener noreferrer" className="block hover:text-red-400 transition">
📷 Instagram
</a>

<a href="https://wa.me/qr/KFOPAJYRNKISN1" target="_blank" rel="noopener noreferrer" className="block hover:text-red-400 transition">
💬 WhatsApp
</a>

</div>

</div>
</section>
<footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
<div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-400">
<p>© 2026 Zishan Alam. All Rights Reserved.</p>
<p className="mt-2">Website Builder • MS Excel Expert • Exam Sheet Designer</p>
</div>
</footer>

</main>
);
}