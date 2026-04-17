import { useState, useEffect, useRef, useCallback } from "react";

export default function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const rafRef = useRef(null);
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });

  // Smooth cursor animation using requestAnimationFrame
  useEffect(() => {
    const updatePosition = () => {
      // Easing for smooth follow (lower = smoother but slower)
      const ease = 0.15;
      currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * ease;
      currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * ease;
      
      setMouse({
        x: currentPosition.current.x,
        y: currentPosition.current.y
      });
      
      rafRef.current = requestAnimationFrame(updatePosition);
    };
    
    rafRef.current = requestAnimationFrame(updatePosition);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Track mouse movement without causing re-renders
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skills = [
    { title: "DevOps", items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Git"] },
    { title: "Frontend", items: ["React", "JavaScript", "TailwindCSS", "HTML", "CSS", "TypeScript"] },
    { title: "Backend", items: ["Node.js", "Express", "REST APIs", "Postman"] },
    { title: "Database", items: ["MongoDB", "MySQL"] },
    { title: "Languages", items: ["Java", "Python", "C", "C++"] },
    { title: "Advanced", items: ["Machine Learning", "Blockchain", "Web3"] },
  ];

  const projects = [
    {
      num: "01",
      title: "MoodMusic AI",
      icon: "🎧",
      desc: "Emotion-based music recommendation using real-time face detection and API-driven streaming with personalized playlists.",
      tags: ["React", "Node.js", "face-api.js", "YouTube API", "Vercel", "Render", "WebSocket"],
      live: "#",
      github: "#",
      gradient: "from-indigo-900/50 via-purple-900/50 to-pink-900/50",
      accent: "indigo",
    },
    {
      num: "02",
      title: "DevOps Pipeline",
      icon: "⚙️",
      desc: "End-to-end CI/CD pipeline with automated testing, containerization, and Kubernetes orchestration on AWS.",
      tags: ["Jenkins", "Docker", "K8s", "Terraform", "Prometheus", "Grafana"],
      live: "#",
      github: "#",
      gradient: "from-slate-800 via-blue-900/50 to-cyan-900/50",
      accent: "cyan",
    },
    {
      num: "03",
      title: "Web3 Marketplace",
      icon: "🔗",
      desc: "Decentralized NFT marketplace with smart contracts, wallet integration, and real-time bidding system.",
      tags: ["Solidity", "Ethers.js", "Hardhat", "IPFS", "React", "Tailwind"],
      live: "#",
      github: "#",
      gradient: "from-purple-900/50 via-fuchsia-900/50 to-pink-900/50",
      accent: "purple",
    },
  ];

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-gray-100 font-sans overflow-x-hidden">
      {/* Smooth Custom Cursor */}
      <SmoothCursor mouse={mouse} />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Divider */}
      <Divider />
      
      {/* Skills Section */}
      <SkillsSection skills={skills} />
      
      {/* Divider */}
      <Divider />
      
      {/* Projects Section */}
      <ProjectsSection 
        projects={projects} 
        hoveredCard={hoveredCard} 
        setHoveredCard={setHoveredCard} 
      />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

// ========== SMOOTH CURSOR COMPONENT ==========
const SmoothCursor = ({ mouse }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = target.closest('a, button, [role="button"], .cursor-pointer, .project-card');
      setIsHovering(!!isClickable);
    };
    
    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);
  
  return (
    <>
      {/* Large glow effect */}
      <div
        className="fixed pointer-events-none rounded-full z-[9998] will-change-transform"
        style={{
          width: isHovering ? '500px' : '400px',
          height: isHovering ? '500px' : '400px',
          background: `radial-gradient(circle, ${isHovering ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.12)'} 0%, rgba(99,102,241,0.03) 40%, transparent 70%)`,
          transform: `translate3d(${mouse.x - (isHovering ? 250 : 200)}px, ${mouse.y - (isHovering ? 250 : 200)}px, 0)`,
          transition: 'width 0.2s ease-out, background 0.2s ease-out',
          filter: 'blur(12px)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />
      
      {/* Small dot cursor */}
      <div
        className="fixed pointer-events-none rounded-full z-[9999] will-change-transform"
        style={{
          width: isHovering ? '12px' : '6px',
          height: isHovering ? '12px' : '6px',
          background: isHovering ? '#a5b4fc' : '#6366f1',
          transform: `translate3d(${mouse.x - (isHovering ? 6 : 3)}px, ${mouse.y - (isHovering ? 6 : 3)}px, 0)`,
          transition: 'width 0.15s ease-out, height 0.15s ease-out, background 0.15s ease-out',
          boxShadow: isHovering ? '0 0 20px rgba(165, 180, 252, 0.6)' : '0 0 12px rgba(99, 102, 241, 0.8)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />
    </>
  );
};

const Navigation = () => (
  <nav className="sticky top-5 z-50 flex justify-between items-center px-4 py-3 mx-4 md:mx-6 bg-[#0a0a0f]/75 backdrop-blur-xl rounded-full border border-indigo-500/20">
    <span className="text-xl font-semibold bg-gradient-to-r from-indigo-300 to-indigo-500 bg-clip-text text-transparent">
      AB
    </span>
    <div className="flex gap-6 md:gap-8 items-center">
      {["Stack", "Work", "Contact"].map((link) => (
        <a
          key={link}
          href={`#${link.toLowerCase()}`}
          className="text-sm font-medium text-gray-400 hover:text-indigo-400 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-indigo-500 after:transition-all hover:after:w-full"
        >
          {link}
        </a>
      ))}
      <a
        href="https://github.com/Adiii08"
        target="_blank"
        rel="noreferrer"
        className="text-sm font-medium text-indigo-300 px-3 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/30 hover:bg-indigo-500/20 transition-all"
      >
        GitHub ↗
      </a>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-16 relative overflow-hidden">
    {/* Animated Orbs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute w-[600px] h-[600px] -top-[150px] -left-[150px] rounded-full bg-gradient-radial from-indigo-500/20 to-transparent blur-[70px] animate-pulse-slow" />
      <div className="absolute w-[500px] h-[500px] -bottom-[100px] -right-[100px] rounded-full bg-gradient-radial from-purple-500/18 to-transparent blur-[70px] animate-pulse-slower" />
      <div className="absolute w-[300px] h-[300px] top-[40%] left-[30%] rounded-full bg-gradient-radial from-cyan-500/12 to-transparent blur-[60px]" />
    </div>

    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/50 bg-indigo-500/12 text-xs text-indigo-300 w-fit mb-7 backdrop-blur-sm animate-fade-up">
      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-glow" />
      Open to opportunities · Remote / Onsite
    </div>

    {/* Titles */}
    <h1 className="text-[clamp(52px,7vw,88px)] font-bold leading-[1.05] tracking-[-2px] bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent animate-fade-up animation-delay-100">
      Aditya Beura
    </h1>
    <h2 className="text-[clamp(42px,6vw,72px)] font-semibold leading-[1.1] tracking-[-1.5px] text-white/20 mb-6 animate-fade-up animation-delay-200">
      Full Stack + DevOps
    </h2>
    
    <p className="text-lg text-gray-400 max-w-[500px] leading-relaxed mb-10 animate-fade-up animation-delay-300">
      Building scalable systems, automating pipelines, and shipping real-world 
      applications from idea to production.
    </p>

    {/* Buttons */}
    <div className="flex gap-4 flex-wrap animate-fade-up animation-delay-400">
      <a href="#work" className="px-8 py-3.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:shadow-indigo-glow hover:-translate-y-0.5 transition-all cursor-pointer">
        ✨ View my work
      </a>
      <a href="https://github.com/Adiii08" target="_blank" rel="noreferrer" className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all backdrop-blur-sm cursor-pointer">
        GitHub Profile
      </a>
      <a href="mailto:adityabeura08@gmail.com" className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all cursor-pointer">
        📧 Get in touch
      </a>
    </div>

    {/* Stats */}
    <div className="mt-16 flex gap-6 items-center">
      <div className="flex gap-6">
        <span className="text-xs text-gray-500 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm">⚡ 5+ Projects</span>
        <span className="text-xs text-gray-500 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm">🎯 3+ Years</span>
        <span className="text-xs text-gray-500 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm">🌍 Global</span>
      </div>
    </div>
  </section>
);

const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent mx-6 md:mx-12" />
);

const SkillsSection = ({ skills }) => (
  <section id="stack" className="py-24 px-6 md:px-16">
    <div className="mb-14">
      <div className="text-xs font-semibold tracking-[3px] uppercase text-indigo-500 mb-3">Expertise</div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-3 tracking-[-1px]">Tech stack</h2>
      <p className="text-base text-gray-500 max-w-[500px]">
        Tools and technologies I work with daily to build robust solutions.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
      {skills.map((skill) => (
        <div key={skill.title} className="bg-[#0d0d14] p-7">
          <div className="text-xs font-semibold tracking-[1.5px] uppercase text-indigo-400 mb-4">
            {skill.title}
          </div>
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 hover:bg-indigo-500/20 hover:border-indigo-500/30 hover:text-white hover:-translate-y-0.5 transition-all cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const ProjectsSection = ({ projects, hoveredCard, setHoveredCard }) => (
  <section id="work" className="py-24 px-6 md:px-16">
    <div className="mb-14">
      <div className="text-xs font-semibold tracking-[3px] uppercase text-indigo-500 mb-3">Selected work</div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-3 tracking-[-1px]">Projects</h2>
      <p className="text-base text-gray-500 max-w-[500px]">
        Real-world apps with full deployment, APIs, and scalable architecture
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.num}
          project={project}
          isHovered={hoveredCard === index}
          onHover={() => setHoveredCard(index)}
          onLeave={() => setHoveredCard(null)}
        />
      ))}
      
      {/* Coming Soon Card */}
      <div className="bg-[#0d0d14]/60 border border-dashed border-white/10 rounded-2xl min-h-[280px] flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
        <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center text-2xl text-white/30">
          +
        </div>
        <span className="text-sm text-white/30">More projects coming soon</span>
      </div>
    </div>

    <TerminalDemo />
  </section>
);

const ProjectCard = ({ project, isHovered, onHover, onLeave }) => {
  const accentColors = {
    indigo: "text-indigo-400",
    cyan: "text-cyan-400",
    purple: "text-purple-400",
  };
  
  return (
    <div
      className={`bg-[#0d0d14] border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
        isHovered 
          ? `border-indigo-500/40 -translate-y-1 shadow-2xl` 
          : 'border-white/10'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={`w-full aspect-video bg-gradient-to-br ${project.gradient} flex items-center justify-center border-b border-white/10 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent" />
        <span className="relative z-10 text-5xl drop-shadow-lg">{project.icon}</span>
      </div>
      
      <div className="p-7">
        <div className={`text-xs font-semibold tracking-[2px] mb-3 ${accentColors[project.accent]}`}>
          {project.num}
        </div>
        <h3 className="text-xl font-semibold text-gray-100 mb-3">{project.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">{project.desc}</p>
        
        <div className="flex flex-wrap gap-2 mb-7">
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/25 rounded-full text-[11px] font-medium text-indigo-300">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <a href={project.live} className={`px-5 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:shadow-glow ${
            project.accent === 'indigo' ? 'bg-indigo-600' : 
            project.accent === 'cyan' ? 'bg-cyan-600' : 'bg-purple-600'
          }`}>
            Live demo →
          </a>
          <a href={project.github} className="px-5 py-2 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 transition-all">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

const TerminalDemo = () => (
  <div className="bg-[#050508] border border-indigo-500/20 rounded-2xl overflow-hidden shadow-2xl">
    <div className="px-5 py-3.5 bg-white/5 border-b border-white/10 flex items-center gap-3">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500 shadow-red" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-yellow" />
        <div className="w-3 h-3 rounded-full bg-green-500 shadow-green" />
      </div>
      <span className="ml-3 text-xs text-gray-500 font-mono">aditya@portfolio:~/moodmusic</span>
    </div>
    
    <div className="p-7 md:p-8 font-mono text-xs leading-8">
      <div><span className="text-emerald-400">$</span> <span className="text-gray-300">node server.js --env=production</span></div>
      <div className="text-gray-600">🚀 Initializing emotion detection engine...</div>
      <div><span className="text-blue-400">✓</span> <span className="text-indigo-300">face-api.js</span> <span className="text-gray-500">loaded (models: ssd_mobilenetv1)</span></div>
      <div><span className="text-blue-400">→</span> <span className="text-amber-400">Emotion:</span> <span className="text-emerald-400">HAPPY</span> <span className="text-gray-500">(confidence: 0.94)</span></div>
      <div><span className="text-blue-400">→</span> <span className="text-amber-400">YouTube API:</span> <span className="text-purple-400">fetching "upbeat summer vibes" playlist</span></div>
      <div><span className="text-blue-400">✓</span> <span className="text-emerald-400">Streaming 3 tracks</span> <span className="text-indigo-500 animate-pulse">█</span></div>
      <div className="mt-3 text-gray-600 text-[11px]">✨ Ready on http://localhost:3000</div>
    </div>
  </div>
);

const ContactSection = () => (
  <section id="contact" className="px-6 md:px-16 pb-24">
    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 rounded-3xl p-8 md:p-14 flex justify-between items-center gap-8 flex-wrap backdrop-blur-sm">
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3 tracking-[-0.5px]">
          Let's build something great
        </h3>
        <p className="text-base text-gray-500">
          Open to full-time roles, freelance projects, and interesting collaborations.
        </p>
      </div>
      
      <div className="flex flex-col items-end gap-4">
        <div className="px-5 py-2 bg-black/30 rounded-full border border-indigo-500/30">
          <span className="text-sm text-indigo-300 font-mono">📧 adityabeura08@gmail.com</span>
        </div>
        <a href="mailto:adityabeura08@gmail.com" className="px-9 py-3.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:shadow-indigo-glow hover:-translate-y-0.5 transition-all">
          Send a message →
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 px-6 md:px-16 border-t border-white/5 bg-[#0a0a0f]/50 flex justify-between items-center flex-col md:flex-row gap-4">
    <span className="text-xs text-gray-600">© 2025 Aditya Beura — Crafted with ⚡</span>
    <div className="flex gap-7">
      <a href="https://github.com/Adiii08" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
        GitHub
      </a>
      <a href="mailto:adityabeura08@gmail.com" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
        Email
      </a>
      <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
        Resume
      </a>
    </div>
  </footer>
);