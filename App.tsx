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
  Trash2, Search,Users, Wrench, Briefcase, GraduationCap, ArrowUp
} from 'lucide-react';
import { cn } from './lib/utils';

// --- DATA ---

const PROJECTS = [
  {
    id: 1,
    title: "EggRow",
    category: "Data Analytics System",
    description: "A data-driven decision support system for poultry farm management.",
    longDescription: "EggRow is a data-driven analytics system designed to support decision-making in poultry farming. The system provides production monitoring, performance analysis (FCR, HDP), and interactive dashboards to help optimize farm operations. Built using Python and Streamlit, it enables users to visualize data, evaluate efficiency, and make informed business decisions.",
    tech: ["Python", "Streamlit", "Data Analysis", "Machine Learning"],
    image: "https://images.unsplash.com/photo-1598514982845-5f6f3d1c0f0b?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/Agrisynx-Develop/Eggrow-Analyst.git", // kalau ada repo khusus ganti
    demo: "https://eggrow.streamlit.app/"
  },
  {
    id: 2,
    title: "Smart Money",
    category: "Data science & Generative AI",
    description: "Team Project",
    longDescription: "Transformasi Manajemen Keuangan dengan AI & Analitik Data",
    tech: ["Python", "Streamlit", "Data Analysis", "Machine Learning"],
    image: "https://images.unsplash.com/photo-1598514982845-5f6f3d1c0f0b?auto=format&fit=crop&q=80&w=800",
    demo: "https://huggingface.co/spaces/Rakha4523/smart-money-app",
    ppt: "DSGA_Kelompok1.pdf"
  }
];

const EXPERIENCE = [

  {
    id: 1,
    role: "Business Intellegence Analyst Bank Muamalat (Project based Intern)",
    company: "Rakamin",
    duration: "Okt 2026 - Nov 2026",
    achievements: [
      "Participated in a Project Based Internship as a Business Intelligence Analyst,", 
      "learning how BI analysts work in the banking industry and completing a final project", 
      "aligned with the company’s activities. Processed and analyzed data using Excel, MS Access,", 
      "and MySQL (SQL), applied statistical analysis, and built data visualizations and BI dashboards",
      "to support business decision-making. Work was assessed and given feedback by the Bank Muamalat team."
      
    ]
  }, 
  {
    id: 2,
    role: "Management Trainee (SRAP)",
    company: "Suri Retail Nusantara",
    duration: "Jun 2026 - Sep 2026",
    achievements: [
      "Took part in the Suri Retail Acceleration Program, rotating through Supply Chain,", 
      "Data Analyst, Product Development, Sales & Marketing, and Retail Operation.", 
      "Analyzed operational data to identify bottlenecks and process inefficiencies,", 
      "and prepared improvement recommendations."
    ]
  },
  {
    id: 3,
    role: "Independent Study (eggrow developer)",
    company: "Faculty of Animal Science - MBKM program",
    duration: "Feb 2026 - May 2026",
    achievements: [
      "Developed a data driven analytical system for poultry farm management",
      "Built interactive dashboards using Python and Streamlit",
      "Designed a digital farm management system to support operations",
      "Applied statistical analysis to evaluate production performance",
      "Utilized data science methods to improve operational decision-making"
    ]
  },
  {
    id: 4,
    role: "Data Science Trainee",
    company: "Celerates Indonesia",
    duration: "Feb 2026 - Jul 2026",
    achievements: [
      "Learned data science fundamentals including NLP and statistical analysis",
      "Utilized Python, Git, and Streamlit for data processing and visualization",
      "Applied machine learning and deep learning techniques",
      "Explored generative AI, prompt engineering, and advanced techniques",
      "Developed AI applications using LangChain and Retrieval-Augmented Generation (RAG)"
    ]
  },
  {
    id: 5,
    role: "Technical Manager",
    company: "Marching Band UGM",
    duration: "Jan 2025 - Nov 2025",
    achievements: [
      "Led and managed major organizational programs and technical execution",
      "Developed structured training plans and schedules",
      "Acted as project manager for the main annual program",
      "Handled HR-related issues across multiple teams",
      "Played a strategic role in executing large-scale events"
    ]
  },
  {
    id: 6,
    role: "Marching Band Trainer",
    company: "Marching Band UGM",
    duration: "Mar 2024 - Nov 2025",
    achievements: [
      "Developed annual program themes and technical training materials",
      "Designed technical plans for major events",
      "Enhanced players’ technical skills and team performance",
      "Built strong team cohesion and collaboration",
      "Coordinated with multiple divisions for event execution"
    ]
  },
  {
    id: 7,
    role: "Technical Coordinator",
    company: "Marching Band UGM",
    duration: "Jul 2023 - Feb 2025",
    achievements: [
      "Guided technical staff in training sessions",
      "Prepared training materials and regeneration programs",
      "Built team cohesion among staff and new members",
      "Resolved HR-related challenges within the team",
      "Led and evaluated training program implementation"
    ]
  },
  {
    id: 8,
    role: "Equipment Staff",
    company: "Marching Band UGM",
    duration: "Mar 2023 - Dec 2023",
    achievements: [
      "Managed inventory of costumes, instruments, and equipment",
      "Coordinated logistics including transportation and accommodation",
      "Performed maintenance and repair of equipment",
      "Prepared technical equipment for major events"
    ]
  },
  {
    id: 9,
    role: "Leader",
    company: "Rythmic Charolais",
    duration: "Jan 2024 - Dec 2024",
    achievements: [
      "Led and managed team activities for organizational events",
      "Coordinated with internal and external stakeholders",
      "Monitored and controlled event execution",
      "Ensured organizational sustainability and development"
    ]
  },
  {
    id: 10,
    role: "Accounting Support Intern",
    company: "PT. JTEKT Indonesia",
    duration: "Dec 2019 - Mar 2020",
    achievements: [
      "Managed invoices and supported Account Officer processes",
      "Prepared purchase orders and financial documentation",
      "Organized and archived financial records",
      "Assisted in administrative tasks and month-end closing"
    ]
  }
];

const EDUCATION = [
  {
    id: 1,
    degree: "S1 Ilmu dan Industri Peternakan",
    institution: "Universitas Gadjah Mada",
    year: "2022 - 2026",
    highlight: "Lulus dengan IPK 3.41"
  },
  {
    id: 2,
    degree: "Data Science & Generative AI",
    institution: "Celerates",
    year: "2026",
    highlight: "Intensive training on Data Science, Machine Learning, Deep Learning, Prompting, Project and Database Management."
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
            <span className="w-20 h-8 bg-accent-cyan rounded-lg flex items-center justify-center text-dark-bg">TEGUH</span>
            GUNTORO
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
              <span className="block text-accent-cyan mt-2">Website Portofolio</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              Open To Work | Data Analyst & Data Science Enthusiast | Animal Science Background
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#portofolio" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                Lihat Portofolio <ChevronRight size={18} />
              </a>
              <a href="/CV_2026.pdf" download className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2">
                Download CV <Download size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- TENTANG --- */}
      <Section id="tentang" title="Tentang Saya">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* FOTO */}
          <div className="flex justify-center">
            <img
              src="/foto.jpeg"
              alt="Teguh Guntoro"
              className="w-64 h-64 object-cover rounded-2xl shadow-lg"
            />
          </div>

        
          <div className="space-y-6">
            <p className="text-lg text-gray-400 leading-relaxed">
              Undergraduate in Animal Science with strong analytical thinking and leadership experience. 
              Experienced in developing data-driven systems, managing cross-functional teams, and applying 
              data analytics to support operational and business decision-making. Passionate about continuous
              improvement, problem-solving, and contributing to business growth.
              
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              My expertise includes data analysis, problem-solving, and 
              developing data-driven solutions to support decision-making 
              and improve operational efficiency.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              {[
                { label: 'Proyek Selesai', value: '2' },
                
                { label: 'Jam Ngoding', value: '4k+' },
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
              { icon: <Database className="text-accent-cyan" />, title: 'Data Analysis', skills: ['Python', 'Statistical Analysis', 'Data Visualization', 'Machine Learning'] },
              { icon: <Code2 className="text-accent-cyan" />, title: 'Problem Solving', skills: ['Analytical Thinking', 'Decision Making', 'Process Improvement'] },
              { icon: <Users className="text-accent-cyan" />, title: 'Leadership', skills: ['Team Management', 'Project Coordination', 'Communication'] },
              { icon: <Wrench className="text-accent-cyan" />, title: 'Tools', skills: ['Python', 'Streamlit', 'Git', 'Excel'] },
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
                  { icon: <Linkedin />, label: 'LinkedIn', href: 'http://linkedin.com/in/teguh-guntoro' },
                  { icon: <Github />, label: 'GitHub', href: 'https://github.com/Agrisynx-Develop' },
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
            <a href="#home" className="text-xl font-bold tracking-tighter text-white">Teguh Guntoro</a>
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
                    {selectedProject.demo && (
                      <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="btn-primary flex items-center justify-center gap-2">
                        <ExternalLink size={18} /> Live Preview
                      </a>
                    )}

                    {selectedProject.ppt && (
                      <a href={selectedProject.ppt} target="_blank" rel="noreferrer" className="btn-outline flex items-center justify-center gap-2">
                        <ExternalLink size={18} /> Lihat Presentasi
                      </a>
                    )}

                    {selectedProject.github && (
                      <a href={selectedProject.github} target="_blank" rel="noreferrer" className="btn-outline flex items-center justify-center gap-2">
                        <Github size={18} /> Source Code
                      </a>
                    )}
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
