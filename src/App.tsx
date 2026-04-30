/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Github, Linkedin, Mail, ExternalLink, 
  Code2, Database, Layout, Smartphone, Palette, 
  ChevronRight, Calendar, User, Download, Send, 
  Trash2, Search, Briefcase, GraduationCap, ArrowUp
} from 'lucide-react';
import { cn } from './lib/utils';

// --- DATA ---

const PROJECTS = [
  {
    id: 1,
    title: "NexGen E-Commerce",
    category: "Web",
    description: "A high-performance modern store built with Next.js 14 and Stripe integration.",
    longDescription: "NexGen is a fully featured e-commerce platform focusing on performance and user experience. It features server-side rendering, real-time inventory updates, and a seamless checkout flow.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 2,
    title: "DevTracker Mobile",
    category: "Mobile",
    description: "Personal task and calorie tracking app for developers.",
    longDescription: "An application designed specifically for developers to manage their project deadlines alongside their health goals. Built with React Native for cross-platform support.",
    tech: ["React Native", "Firebase", "Redux"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 3,
    title: "CloudScale API",
    category: "API",
    description: "Scalable microservices architecture for data processing.",
    longDescription: "A robust API backbone designed to handle millions of requests, utilizing a distributed architecture for horizontal scaling and reliability.",
    tech: ["Node.js", "Express", "PostgreSQL", "Docker"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 4,
    title: "EcoSmart Dashboard",
    category: "UI",
    description: "Visualization dashboard for IoT environmental sensors.",
    longDescription: "A real-time monitoring interface for environmental data. Features interactive charts, map integration, and predictive analysis models.",
    tech: ["React", "D3.js", "Material UI", "IoT"],
    image: "https://images.unsplash.com/photo-1551288049-bb8c803f293a?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 5,
    title: "SecurePass Manager",
    category: "Web",
    description: "Encrypted password manager with cross-device sync.",
    longDescription: "A security-first application for managing credentials. Uses end-to-end encryption with AES-256 and features an automatic breach detection system.",
    tech: ["React", "Go", "SQLite", "Crypto"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 6,
    title: "FinTech Insight",
    category: "Web",
    description: "Real-time stock analysis platform with AI integration.",
    longDescription: "A comprehensive platform for financial analysis, integrating OpenAI for sentiment news analysis and technical indicator calculation.",
    tech: ["React", "Gemini API", "Python", "Flask"],
    image: "https://images.unsplash.com/photo-1611974714851-eb605161ca50?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com",
    demo: "https://demo.com"
  }
];

const EXPERIENCE = [
  {
    id: 1,
    role: "Senior Fullstack Developer",
    company: "TechInova Solutions",
    duration: "2022 - Present",
    achievements: [
      "Led a team of 5 developers to rebuild the core SaaS platform, increasing performance by 40%.",
      "Implemented a new CI/CD pipeline reducing deployment time from 2 hours to 15 minutes.",
      "Developed an internal AI-assisted coding tool using Gemini API."
    ]
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Creative Digital Agency",
    duration: "2020 - 2022",
    achievements: [
      "Delivered 20+ responsive web applications for international clients.",
      "Optimized frontend bundle size by 30% through code-splitting and tree-shaking.",
      "Mentored 3 junior developers in modern React practices."
    ]
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "Startup Hub",
    duration: "2018 - 2020",
    achievements: [
      "Assisted in developing a real-time collaboration tool.",
      "Improved database query efficiency by 25% for high-traffic endpoints.",
      "Gained deep expertise in CSS-in-JS and state management."
    ]
  }
];

const EDUCATION = [
  {
    id: 1,
    degree: "S1 Teknik Informatika",
    institution: "Universitas Indonesia",
    year: "2014 - 2018",
    highlight: "Lulus dengan IPK 3.85, fokus pada Rekayasa Perangkat Lunak."
  },
  {
    id: 2,
    degree: "Nanodegree Fullstack Web",
    institution: "Udacity",
    year: "2019",
    highlight: "Intensive training on Python, React, and Database Management."
  }
];

// --- COMPONENTS ---

const Section = ({ id, title, children, className }: any) => (
  <section id={id} className={cn("section-padding relative overflow-hidden", className)}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{title}</h2>
        <div className="h-px flex-1 bg-border-subtle" />
      </div>
      {children}
    </motion.div>
  </section>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('portfolio_messages');
    if (savedMessages) setMessages(JSON.parse(savedMessages));

    const handleScroll = () => {
      // ScrollSpy
      const sections = ['home', 'tentang', 'portofolio', 'pendidikan', 'pengalaman', 'kontak'];
      const scrollPos = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }

      // Back to Top
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchesFilter = filter === 'All' || p.category === filter;
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                           p.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.includes('@')) {
      alert('Pesan: Email tidak valid');
      return;
    }
    
    const newMessage = { ...formData, id: Date.now(), date: new Date().toLocaleDateString() };
    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('portfolio_messages', JSON.stringify(updatedMessages));
    
    setFormStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormStatus(null), 3000);
  };

  const deleteMessage = (id: number) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));
  };

  const navLinks = [
    { name: 'Beranda', id: 'home' },
    { name: 'Tentang', id: 'tentang' },
    { name: 'Portofolio', id: 'portofolio' },
    { name: 'Pendidikan', id: 'pendidikan' },
    { name: 'Pengalaman', id: 'pengalaman' },
    { name: 'Kontak', id: 'kontak' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg selection:bg-accent-cyan/30 flex flex-col">
      <div className="grid-bg fixed inset-0 z-0 opacity-40 pointer-events-none" />
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
            <span className="w-8 h-8 bg-accent-cyan rounded-lg flex items-center justify-center text-dark-bg">T</span>
            Guntoro
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent-cyan",
                  activeSection === link.id ? "text-accent-cyan" : "text-gray-400"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          <button 
            className="md:hidden p-2 text-gray-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark-surface border-t border-border-subtle overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={cn(
                      "text-lg font-medium py-2",
                      activeSection === link.id ? "text-accent-cyan" : "text-gray-400"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO --- */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative px-6 text-center overflow-hidden">
        <div className="tech-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              Available for new projects
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              Teguh Guntoro
              <span className="block text-accent-cyan mt-2">Fullstack Developer</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              Membangun solusi digital modern dengan fokus pada performa, 
              estetika, dan pengalaman pengguna yang seamless.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#portofolio" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                Lihat Portofolio <ChevronRight size={18} />
              </a>
              <a href="/dummy-cv.pdf" download className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2">
                Download CV <Download size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- TENTANG --- */}
      <Section id="tentang" title="Tentang Saya">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-400 leading-relaxed">
              Saya adalah seorang Fullstack Developer dengan pengalaman lebih dari 5 tahun 
              dalam merancang dan mengembangkan aplikasi web skala besar. Saya senang 
              memecahkan masalah teknis yang kompleks dan mengubahnya menjadi antarmuka 
              yang elegan.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Keahlian saya mencakup seluruh lifecycle pengembangan perangkat lunak, 
              mulai dari perencanaan arsitektur, pengembangan sistem backend, 
              hingga optimasi performa frontend.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              {[
                { label: 'Proyek Selesai', value: '40+' },
                { label: 'Pengalaman', value: '5+ Tahun' },
                { label: 'Client Puas', value: '100%' },
                { label: 'Jam Ngoding', value: '10k+' },
              ].map((stat, i) => (
                <div key={i} className="card-gradient p-6 rounded-2xl">
                  <h3 className="text-3xl font-bold text-accent-cyan mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: <Layout className="text-accent-cyan" />, title: 'Frontend', skills: ['React', 'Next.js', 'Tailwind', 'Framermotion'] },
              { icon: <Database className="text-accent-cyan" />, title: 'Backend', skills: ['Node.js', 'Go', 'Python', 'PostgreSQL'] },
              { icon: <Smartphone className="text-accent-cyan" />, title: 'Mobile', skills: ['React Native', 'Expo', 'Mobile UI Design'] },
              { icon: <Code2 className="text-accent-cyan" />, title: 'Tools', skills: ['Docker', 'Git', 'AWS', 'Figma'] },
            ].map((cat, i) => (
              <div key={i} className="card-gradient p-6 rounded-2x">
                <div className="p-3 bg-accent-cyan/10 rounded-xl w-fit mb-4">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-4">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span key={skill} className="tech-badge">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* --- PORTFOLIO --- */}
      <Section id="portofolio" title="Proyek Unggulan">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Web', 'Mobile', 'API', 'UI'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer",
                  filter === cat ? "bg-accent-cyan text-dark-bg" : "bg-dark-surface text-gray-400 border border-border-subtle hover:border-gray-600"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative group max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent-cyan transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Cari proyek atau teknologi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-surface border border-border-subtle rounded-xl text-sm focus:outline-none focus:border-accent-cyan transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="card-gradient rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-white font-medium flex items-center gap-2">
                      Lihat Detail <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-accent-cyan uppercase tracking-wider">{project.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">Tidak ada proyek yang sesuai dengan pencarian Anda.</p>
          </div>
        )}
      </Section>

      {/* --- PENDIDIKAN & PENGALAMAN --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto">
        <Section id="pendidikan" title="Pendidikan">
          <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-border-subtle">
            {EDUCATION.map((item) => (
              <div key={item.id} className="relative pl-12">
                <div className="absolute left-[-2px] top-2 w-2.5 h-2.5 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <span className="text-sm font-semibold text-accent-cyan/80 bg-accent-cyan/5 px-2 py-0.5 rounded mb-2 inline-block">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold text-white mb-1">{item.degree}</h3>
                <p className="text-gray-400 font-medium mb-2">{item.institution}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.highlight}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="pengalaman" title="Pengalaman Kerja">
          <div className="space-y-8">
            {EXPERIENCE.map((item) => (
              <div key={item.id} className="card-gradient p-6 rounded-2xl group transition-all hover:border-accent-cyan/30">
                <div className="flex flex-col sm:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-accent-cyan">{item.role}</h3>
                    <p className="text-gray-400 font-medium">{item.company}</p>
                  </div>
                  <span className="text-sm font-semibold text-accent-cyan/80 bg-accent-cyan/5 px-3 py-1 rounded-full whitespace-nowrap">
                    {item.duration}
                  </span>
                </div>
                <ul className="space-y-3">
                  {item.achievements.map((acc, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-500 leading-relaxed">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-cyan/40 shrink-0" />
                      {acc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* --- CONTACT --- */}
      <Section id="kontak" title="Mari Berdiskusi">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Punya ide proyek menarik?</h3>
            <p className="text-gray-400 mb-10 leading-relaxed">
              Saya selalu terbuka untuk kolaborasi baru atau sekadar diskusi teknologi. 
              Gunakan formulir ini atau langsung hubungi saya melalui platform favorit Anda.
            </p>

            <div className="space-y-6">
              <a href="mailto:teguhguntoro28@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-dark-surface border border-border-subtle hover:border-accent-cyan transition-all group">
                <div className="p-3 bg-accent-cyan/10 rounded-xl text-accent-cyan group-hover:bg-accent-cyan group-hover:text-dark-bg transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Saya</p>
                  <p className="text-lg font-semibold text-white">teguhguntoro28@gmail.com</p>
                </div>
              </a>
              <div className="flex gap-4">
                {[
                  { icon: <Linkedin />, label: 'LinkedIn', href: 'https://linkedin.com' },
                  { icon: <Github />, label: 'GitHub', href: 'https://github.com' },
                ].map((social, i) => (
                  <a key={i} href={social.href} className="flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl bg-dark-surface border border-border-subtle hover:border-accent-cyan transition-all text-white group">
                    <span className="group-hover:text-accent-cyan">{social.icon}</span>
                    <span className="font-semibold">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="card-gradient p-8 rounded-3xl relative overflow-hidden">
            <form onSubmit={handleContactSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Nama Lengkap</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: John Doe"
                    className="w-full px-4 py-3 bg-dark-bg border border-border-subtle rounded-xl text-white focus:outline-none focus:border-accent-cyan transition-all placeholder:text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Email</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="johndoe@email.com"
                    className="w-full px-4 py-3 bg-dark-bg border border-border-subtle rounded-xl text-white focus:outline-none focus:border-accent-cyan transition-all placeholder:text-gray-700"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Subjek</label>
                <input 
                  required
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Butuh bantuan untuk..."
                  className="w-full px-4 py-3 bg-dark-bg border border-border-subtle rounded-xl text-white focus:outline-none focus:border-accent-cyan transition-all placeholder:text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Pesan</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tuliskan pesan Anda di sini..."
                  className="w-full px-4 py-3 bg-dark-bg border border-border-subtle rounded-xl text-white focus:outline-none focus:border-accent-cyan transition-all placeholder:text-gray-700 resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Send size={18} /> Kirim Pesan Sekarang
              </button>
              
              {formStatus === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-accent-cyan font-semibold flex items-center justify-center gap-2"
                >
                  Pesan berhasil dikirim!
                </motion.p>
              )}
            </form>
          </div>
        </div>

        {/* Message History Simulation */}
        {messages.length > 0 && (
          <div className="mt-20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              Riwayat Pesan Anda <span className="text-xs bg-accent-cyan/10 text-accent-cyan px-2 py-0.5 rounded-full">{messages.length}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {messages.map((msg) => (
                <div key={msg.id} className="card-gradient p-5 rounded-2xl relative group">
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    className="absolute top-2 right-2 p-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                  <p className="text-xs text-accent-cyan font-bold mb-1 uppercase tracking-widest">{msg.subject}</p>
                  <p className="text-white text-sm font-semibold mb-2">{msg.name}</p>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-3">{msg.message}</p>
                  <div className="flex items-center justify-between text-[10px] text-gray-700">
                    <span>{msg.email}</span>
                    <span>{msg.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-border-subtle py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <a href="#home" className="text-xl font-bold tracking-tighter text-white">T. Guntoro</a>
            <p className="text-gray-500 text-sm mt-2">© 2026 Teguh Guntoro. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            {navLinks.slice(0, 3).map(link => (
              <a key={link.id} href={`#${link.id}`} className="text-sm font-medium text-gray-500 hover:text-white transition-colors">{link.name}</a>
            ))}
          </div>
          <div className="flex gap-4">
             <button className="p-2 text-gray-500 hover:text-accent-cyan transition-colors" title="Toggle Search">
               <Search size={20} />
             </button>
             <button className="p-2 text-gray-500 hover:text-accent-cyan transition-colors" title="Toggle Theme">
               <User size={20} />
             </button>
          </div>
        </div>
      </footer>

      {/* --- MODAL PROJECT --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-dark-bg/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-dark-surface border border-border-subtle w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col relative"
            >
              <button 
                className="absolute top-6 right-6 p-2 bg-dark-bg/50 rounded-full text-white hover:bg-white/10 transition-all z-10 cursor-pointer"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full aspect-video object-cover" />
                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="text-xs font-bold text-accent-cyan px-2 py-1 bg-accent-cyan/10 rounded uppercase tracking-widest">
                      {selectedProject.category}
                    </span>
                    <div className="h-4 w-px bg-border-subtle" />
                    <div className="flex gap-2">
                       {selectedProject.tech.map((t: string) => (
                         <span key={t} className="tech-badge">{t}</span>
                       ))}
                    </div>
                  </div>

                  <h2 className="text-4xl font-bold text-white mb-6">{selectedProject.title}</h2>
                  <p className="text-xl text-gray-400 leading-relaxed mb-10">
                    {selectedProject.longDescription}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 border-t border-border-subtle pt-8">
                    <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="btn-primary flex items-center justify-center gap-2">
                      <ExternalLink size={18} /> Live Preview
                    </a>
                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="btn-outline flex items-center justify-center gap-2">
                      <Github size={18} /> Source Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- BACK TO TOP --- */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-4 bg-accent-cyan text-dark-bg rounded-2xl shadow-xl shadow-accent-cyan/20 cursor-pointer z-40 hover:scale-110 active:scale-95 transition-transform"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
