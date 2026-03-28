import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// ─── Utility: cn ──────────────────────────────────────────────────────────────
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ─── Floating Orb ─────────────────────────────────────────────────────────────
function FloatingOrb({ style, color = "#7c3aed" }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        background: `radial-gradient(circle at 40% 40%, ${color}55, ${color}11)`,
        filter: "blur(60px)",
        animation: "float 8s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

// ─── Particle Field ───────────────────────────────────────────────────────────
function ParticleField() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `rgba(139, 92, 246, ${p.opacity})`,
            animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Grid Lines ───────────────────────────────────────────────────────────────
function GridBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        mask: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        WebkitMask: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
      }}
    />
  );
}

// ─── Animated 3D Cube ─────────────────────────────────────────────────────────
function AnimatedCube() {
  return (
    <div style={{ perspective: "800px", width: 220, height: 220 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          animation: "rotateCube 12s linear infinite",
        }}
      >
        {[
          { transform: "translateZ(110px)", label: "React", icon: "⚛️" },
          { transform: "translateZ(-110px) rotateY(180deg)", label: "Node", icon: "🟩" },
          { transform: "rotateY(90deg) translateZ(110px)", label: "Python", icon: "🐍" },
          { transform: "rotateY(-90deg) translateZ(110px)", label: "HTML", icon: "🌐" },
          { transform: "rotateX(90deg) translateZ(110px)", label: "MongoDB", icon: "🍃" },
          { transform: "rotateX(-90deg) translateZ(110px)", label: "CSS", icon: "🎨" },
        ].map((face, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              transform: face.transform,
              background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.08))",
              border: "1px solid rgba(139,92,246,0.3)",
              borderRadius: 16,
              backdropFilter: "blur(10px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 40 }}>{face.icon}</span>
            <span style={{ color: "#c4b5fd", fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700 }}>
              {face.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Glassmorphism Card ───────────────────────────────────────────────────────
function GlassCard({ children, style, hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        border: `1px solid ${hovered ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 20,
        backdropFilter: "blur(20px)",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: hovered
          ? "0 20px 60px rgba(139,92,246,0.2), 0 0 0 1px rgba(139,92,246,0.1)"
          : "0 4px 24px rgba(0,0,0,0.3)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Skill Badge ──────────────────────────────────────────────────────────────
const skills = [
  { name: "JavaScript", level: 95, color: "#F7DF1E", icon: "JS" },
  { name: "React", level: 92, color: "#61DAFB", icon: "⚛" },
  { name: "Node.js", level: 88, color: "#339933", icon: "N" },
  { name: "Python", level: 85, color: "#3776AB", icon: "🐍" },
  { name: "TypeScript", level: 87, color: "#3178C6", icon: "TS" },
  { name: "MongoDB", level: 82, color: "#47A248", icon: "M" },
  { name: "HTML", level: 94, color: "#E34F26", icon: "H" },
  { name: "CSS", level: 92, color: "#1572B6", icon: "C" },
  { name: "Tailwind", level: 88, color: "#06B6D4", icon: "TW" },
  { name: "C", level: 80, color: "#A8B9CC", icon: "C" },
];

function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), index * 80 + 300);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${skill.color}18, ${skill.color}08)`
          : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        border: `1px solid ${hovered ? skill.color + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        padding: "20px",
        transform: hovered ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: `${skill.color}22`,
            border: `1px solid ${skill.color}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 900,
            color: skill.color,
            fontFamily: "'Space Mono', monospace",
            flexShrink: 0,
          }}
        >
          {skill.icon}
        </div>
        <div>
          <div style={{ color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14 }}>
            {skill.name}
          </div>
          <div style={{ color: skill.color, fontFamily: "'Space Mono', monospace", fontSize: 11 }}>
            {skill.level}%
          </div>
        </div>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: animated ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${skill.color}bb, ${skill.color})`,
            borderRadius: 2,
            transition: "width 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
            boxShadow: `0 0 8px ${skill.color}88`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
const projects = [
  {
    title: "Nova AI Compiler",
    description: "An AI-powered online compiler experience that helps users write, run, and improve code faster with a clean web interface.",
    tech: ["React", "JavaScript", "AI", "Compiler", "Netlify"],
    color: "#7c3aed",
    emoji: "🧠",
    gradient: "linear-gradient(135deg, #7c3aed22, #3b82f622)",
    liveUrl: "https://novacompiler.netlify.app/",
  },
  {
    description: "Real-time collaborative project management tool with WebSocket-powered updates, Gantt charts, and AI task prioritization for distributed teams.",
    title: "Smile Bright",
    tech: ["Next.js", "GraphQL", "PostgreSQL", "Redis", "Docker"],
    color: "#06b6d4",
    emoji: "⚡",
    gradient: "linear-gradient(135deg, #06b6d422, #8b5cf622)",
  },
  {
    title: "STUDENTS FEEDBACK SYSTEM",
    description: "Enterprise-grade encrypted file storage with end-to-end encryption, version control, granular permissions, and 99.99% uptime SLA.",
    tech: ["React", "AWS S3", "Node.js", "TypeScript", "Redis"],
    color: "#f59e0b",
    emoji: "🔐",
    gradient: "linear-gradient(135deg, #f59e0b22, #ef444422)",
  },
];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        background: hovered ? project.gradient : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        border: `1px solid ${hovered ? project.color + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 24,
        overflow: "hidden",
        transform: hovered
          ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(10px)`
          : "perspective(800px) rotateX(0) rotateY(0) translateZ(0)",
        transition: hovered ? "transform 0.1s ease" : "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: hovered ? `0 30px 80px ${project.color}22, 0 0 0 1px ${project.color}22` : "0 4px 30px rgba(0,0,0,0.3)",
        cursor: "default",
      }}
    >
      {/* Card Header */}
      <div
        style={{
          height: 180,
          background: project.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle at 30% 50%, ${project.color}33, transparent 60%)`,
        }} />
        <div style={{ fontSize: 72, filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))", zIndex: 1 }}>
          {project.emoji}
        </div>
        {/* Shine effect */}
        <div style={{
          position: "absolute", top: -50, left: -50, right: -50, bottom: -50,
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }} />
      </div>

      {/* Card Body */}
      <div style={{ padding: "24px" }}>
        <h3 style={{
          color: "#f1f5f9", fontFamily: "'Syne', sans-serif",
          fontSize: 20, fontWeight: 800, marginBottom: 10,
        }}>{project.title}</h3>
        <p style={{
          color: "#94a3b8", fontFamily: "'DM Sans', sans-serif",
          fontSize: 13.5, lineHeight: 1.7, marginBottom: 18,
        }}>{project.description}</p>

        {/* Tech Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {project.tech.map((t) => (
            <span key={t} style={{
              padding: "3px 10px",
              background: `${project.color}18`,
              border: `1px solid ${project.color}33`,
              borderRadius: 6,
              color: project.color,
              fontSize: 11,
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
            }}>{t}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 10 }}>
          {["GitHub", "Live Demo"].map((label) => {
            const isLiveDemo = label === "Live Demo";
            const canOpenLive = Boolean(project.liveUrl) && isLiveDemo;
            return (
              <button
                key={label}
                onClick={() => {
                  if (canOpenLive) window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                }}
                style={{
                  flex: 1,
                  padding: "9px 0",
                  background: isLiveDemo ? `linear-gradient(135deg, ${project.color}, ${project.color}cc)` : "transparent",
                  border: `1px solid ${isLiveDemo ? "transparent" : project.color + "55"}`,
                  borderRadius: 10,
                  color: isLiveDemo ? "#fff" : project.color,
                  fontSize: 12,
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                  cursor: canOpenLive || !isLiveDemo ? "pointer" : "not-allowed",
                  opacity: isLiveDemo && !canOpenLive ? 0.65 : 1,
                  transition: "all 0.2s",
                }}
              >
                {label === "GitHub" ? "⌥ " : "→ "}{label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
const experiences = [
  {
    year: "2026",
    title: "Junior Full Stack Developer",
    org: "Self / Team Projects",
    desc: "Built full-stack applications using modern frontend and backend tools, focusing on responsive UI and clean API integration.",
    color: "#7c3aed",
    type: "Work",
  },
  {
    year: "2025",
    title: "College and School Projects",
    org: "Academic Projects",
    desc: "Worked on practical projects in college and school including web apps and programming assignments with real-world problem-solving.",
    color: "#f59e0b",
    type: "Academic",
  },
  {
    year: "2024",
    title: "Freelancer",
    org: "Freelance",
    desc: "Delivered custom websites and application features for clients, handling development from planning to deployment.",
    color: "#10b981",
    type: "Work",
  },
];

function TimelineItem({ exp, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", gap: 24, marginBottom: 8 }}
    >
      {/* Left: Year + Line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 64, flexShrink: 0 }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 12, color: exp.color, fontWeight: 700,
          marginBottom: 8,
        }}>{exp.year}</div>
        <div style={{
          width: 12, height: 12, borderRadius: "50%",
          background: exp.color,
          boxShadow: `0 0 16px ${exp.color}`,
          flexShrink: 0,
          transition: "transform 0.3s",
          transform: hovered ? "scale(1.5)" : "scale(1)",
        }} />
        {index < experiences.length - 1 && (
          <div style={{
            width: 1, flexGrow: 1, marginTop: 8,
            background: "linear-gradient(180deg, rgba(139,92,246,0.3), transparent)",
          }} />
        )}
      </div>

      {/* Right: Content */}
      <div
        style={{
          flex: 1,
          background: hovered
            ? `linear-gradient(135deg, ${exp.color}12, ${exp.color}05)`
            : "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
          border: `1px solid ${hovered ? exp.color + "44" : "rgba(255,255,255,0.06)"}`,
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 24,
          transform: hovered ? "translateX(6px)" : "translateX(0)",
          transition: "all 0.35s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{
            padding: "2px 10px",
            background: `${exp.color}22`,
            border: `1px solid ${exp.color}44`,
            borderRadius: 20,
            color: exp.color, fontSize: 10,
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
          }}>{exp.type}</span>
        </div>
        <h3 style={{
          color: "#f1f5f9", fontFamily: "'Syne', sans-serif",
          fontSize: 17, fontWeight: 800, marginBottom: 4,
        }}>{exp.title}</h3>
        <div style={{
          color: exp.color, fontFamily: "'Space Mono', monospace",
          fontSize: 11, marginBottom: 10, opacity: 0.8,
        }}>{exp.org}</div>
        <p style={{
          color: "#94a3b8", fontFamily: "'DM Sans', sans-serif",
          fontSize: 13.5, lineHeight: 1.7,
        }}>{exp.desc}</p>
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ activeSection }) {
  const links = ["Hero", "About", "Skills", "Projects", "Experience", "Contact"];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      padding: "16px 32px",
      background: scrolled ? "rgba(5,5,16,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(139,92,246,0.1)" : "none",
      transition: "all 0.4s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 900, fontSize: 22,
        background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "-0.5px",
      }}>
        SP<span style={{ opacity: 0.4 }}>.</span>dev
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{
              padding: "7px 14px",
              color: activeSection === l.toLowerCase() ? "#a78bfa" : "#94a3b8",
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              textDecoration: "none",
              borderRadius: 8,
              background: activeSection === l.toLowerCase() ? "rgba(139,92,246,0.12)" : "transparent",
              border: activeSection === l.toLowerCase() ? "1px solid rgba(139,92,246,0.25)" : "1px solid transparent",
              transition: "all 0.25s",
              letterSpacing: "0.02em",
            }}
          >
            {l}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const resolvedTemplateId = EMAILJS_TEMPLATE_ID?.startsWith("template_")
    ? EMAILJS_TEMPLATE_ID
    : `template_${EMAILJS_TEMPLATE_ID || ""}`;
  const templateCandidates = Array.from(
    new Set([EMAILJS_TEMPLATE_ID, resolvedTemplateId].filter(Boolean))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setSendError("Please fill in all fields before sending.");
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY || templateCandidates.length === 0) {
      setSendError("Email service is not configured yet.");
      return;
    }

    setIsSending(true);

    try {
      let sent = false;
      let lastError = null;

      for (const templateId of templateCandidates) {
        try {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            templateId,
            {
              name: form.name,
              email: form.email,
              reply_to: form.email,
              from_name: form.name,
              from_email: form.email,
              message: form.message,
              to_email: "suryar4586@gmail.com",
              sent_at: new Date().toISOString(),
            },
            {
              publicKey: EMAILJS_PUBLIC_KEY,
            }
          );
          sent = true;
          break;
        } catch (error) {
          lastError = error;
        }
      }

      if (!sent) {
        throw lastError || new Error("EmailJS send failed");
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      const details = error?.text || error?.message || "unknown error";
      setSendError(`Could not send message: ${details}`);
    } finally {
      setIsSending(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "14px 18px",
    background: focused === field ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === field ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 12,
    color: "#e2e8f0",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    outline: "none",
    transition: "all 0.25s",
    boxSizing: "border-box",
    boxShadow: focused === field ? "0 0 0 3px rgba(139,92,246,0.1)" : "none",
  });

  return sent ? (
    <div style={{
      textAlign: "center", padding: "60px 40px",
      background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.03))",
      border: "1px solid rgba(16,185,129,0.3)",
      borderRadius: 20,
    }}>
      <div style={{ fontSize: 60, marginBottom: 20 }}>✅</div>
      <h3 style={{ color: "#10b981", fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800 }}>
        Message Sent!
      </h3>
      <p style={{ color: "#94a3b8", fontFamily: "'DM Sans', sans-serif" }}>
        Thanks for reaching out. I'll get back to you within 24 hours.
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={{ color: "#64748b", fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, display: "block", marginBottom: 8, letterSpacing: "0.1em" }}>NAME</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            placeholder="Surya Prakash"
            style={inputStyle("name")}
          />
        </div>
        <div>
          <label style={{ color: "#64748b", fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, display: "block", marginBottom: 8, letterSpacing: "0.1em" }}>EMAIL</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            placeholder="hello@example.com"
            style={inputStyle("email")}
          />
        </div>
      </div>
      <div>
        <label style={{ color: "#64748b", fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, display: "block", marginBottom: 8, letterSpacing: "0.1em" }}>MESSAGE</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          placeholder="Tell me about your project..."
          rows={5}
          style={{ ...inputStyle("message"), resize: "vertical", minHeight: 140 }}
        />
      </div>
      <button
        type="submit"
        disabled={isSending}
        style={{
          padding: "16px 32px",
          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          border: "none",
          borderRadius: 12,
          color: "#fff",
          fontFamily: "'Space Mono', monospace",
          fontSize: 13,
          fontWeight: 700,
          cursor: isSending ? "not-allowed" : "pointer",
          opacity: isSending ? 0.7 : 1,
          letterSpacing: "0.05em",
          boxShadow: "0 10px 40px rgba(124,58,237,0.4)",
          transition: "all 0.25s",
        }}
        onMouseEnter={(e) => {
          if (isSending) return;
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 16px 50px rgba(124,58,237,0.5)";
        }}
        onMouseLeave={(e) => {
          if (isSending) return;
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 10px 40px rgba(124,58,237,0.4)";
        }}
      >
        {isSending ? "SENDING..." : "→ SEND MESSAGE"}
      </button>
      {sendError && (
        <div style={{
          color: "#fda4af",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          marginTop: 2,
        }}>
          {sendError}
        </div>
      )}
    </form>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({ label, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 64 }}>
      <div style={{
        display: "inline-block",
        padding: "5px 16px",
        background: "rgba(139,92,246,0.12)",
        border: "1px solid rgba(139,92,246,0.25)",
        borderRadius: 20,
        color: "#a78bfa",
        fontFamily: "'Space Mono', monospace",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.1em",
        marginBottom: 20,
      }}>{label}</div>
      <h2 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 900,
        fontSize: "clamp(32px, 5vw, 52px)",
        color: "#f1f5f9",
        lineHeight: 1.1,
        marginBottom: 16,
        letterSpacing: "-0.02em",
      }}>{title}</h2>
      {subtitle && <p style={{
        color: "#64748b",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 16,
        maxWidth: 520,
        margin: "0 auto",
        lineHeight: 1.7,
      }}>{subtitle}</p>}
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar() {
  return (
    <div style={{
      width: 280,
      height: 280,
      borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
      background: "linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4)",
      padding: 3,
      animation: "morphAvatar 8s ease-in-out infinite",
      flexShrink: 0,
    }}>
      <div style={{
        width: "100%", height: "100%",
        borderRadius: "inherit",
        background: "linear-gradient(135deg, #1e1b4b, #0f172a)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 100,
        overflow: "hidden",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900,
          fontSize: 90,
          lineHeight: 1,
        }}>SP</div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouse = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const sectionStyle = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "120px 40px",
  };

  return (
    <div style={{
      background: "#050510",
      minHeight: "100vh",
      color: "#e2e8f0",
      overflowX: "hidden",
    }}>
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050510; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#7c3aed, #3b82f6); border-radius: 2px; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(5deg); }
          66% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes rotateCube {
          0% { transform: rotateX(10deg) rotateY(0deg); }
          100% { transform: rotateX(10deg) rotateY(360deg); }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          25% { transform: translateY(-30px) translateX(15px); opacity: 0.6; }
          75% { transform: translateY(-15px) translateX(-10px); opacity: 0.4; }
        }
        @keyframes morphAvatar {
          0%, 100% { border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%; }
          33% { border-radius: 60% 40% 40% 60% / 60% 60% 40% 40%; }
          66% { border-radius: 50% 50% 60% 40% / 40% 60% 50% 50%; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.4); }
          50% { box-shadow: 0 0 50px rgba(139,92,246,0.7), 0 0 100px rgba(139,92,246,0.2); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes typewriter {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .typing-title { animation: typewriter 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.15s; opacity: 0; }
        .delay-2 { animation-delay: 0.3s; opacity: 0; }
        .delay-3 { animation-delay: 0.45s; opacity: 0; }
        .delay-4 { animation-delay: 0.6s; opacity: 0; }
      `}</style>

      {/* Cursor Glow */}
      <div style={{
        position: "fixed",
        left: cursorPos.x - 200,
        top: cursorPos.y - 200,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.06), transparent 70%)",
        pointerEvents: "none",
        zIndex: 998,
        transition: "left 0.1s ease, top 0.1s ease",
      }} />

      <Nav activeSection={activeSection} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <ParticleField />
        <GridBackground />
        <FloatingOrb style={{ width: 600, height: 600, top: -200, right: -200, opacity: 0.6 }} color="#7c3aed" />
        <FloatingOrb style={{ width: 400, height: 400, bottom: -100, left: -100, opacity: 0.4, animationDelay: "3s" }} color="#3b82f6" />
        <FloatingOrb style={{ width: 250, height: 250, top: "60%", left: "40%", opacity: 0.3, animationDelay: "5s" }} color="#06b6d4" />

        <div style={{ ...sectionStyle, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60, width: "100%", position: "relative", zIndex: 1 }}>
          {/* Left */}
          <div style={{ flex: 1, maxWidth: 600 }}>
            <div className="typing-title" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 18px",
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.25)",
              borderRadius: 30,
              marginBottom: 28,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#10b981",
                animation: "pulseGlow 2s ease infinite",
                display: "inline-block",
              }} />
              <span style={{ color: "#94a3b8", fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700 }}>
                Available for Work
              </span>
            </div>

            <h1 className="typing-title delay-1" style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(44px, 6vw, 76px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              marginBottom: 10,
            }}>
              <span style={{
                background: "linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>SP</span>
              {" "}
              <span style={{
                background: "linear-gradient(135deg, #a78bfa, #60a5fa, #67e8f9)",
                backgroundSize: "200% 200%",
                animation: "gradientShift 3s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>DEV</span>
            </h1>

            <div className="typing-title delay-2" style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(14px, 2vw, 18px)",
              color: "#7c3aed",
              letterSpacing: "0.15em",
              marginBottom: 24,
              fontWeight: 700,
            }}>
              FULL STACK DEVELOPER
            </div>

            <p className="typing-title delay-3" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17,
              color: "#64748b",
              lineHeight: 1.8,
              marginBottom: 40,
              maxWidth: 480,
            }}>
              I architect high-performance web applications and scalable cloud infrastructure. 
              Turning complex problems into elegant, user-centric digital experiences.
            </p>

            <div className="typing-title delay-4" style={{ display: "flex", gap: 14 }}>
              <a href="#projects" style={{
                padding: "15px 32px",
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                borderRadius: 12,
                color: "#fff",
                textDecoration: "none",
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.05em",
                boxShadow: "0 10px 40px rgba(124,58,237,0.4)",
                transition: "all 0.25s",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 16px 50px rgba(124,58,237,0.5)"; }}
              onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 10px 40px rgba(124,58,237,0.4)"; }}
              >
                ◈ View Projects
              </a>
              <a href="#contact" style={{
                padding: "15px 32px",
                background: "transparent",
                border: "1px solid rgba(139,92,246,0.4)",
                borderRadius: 12,
                color: "#a78bfa",
                textDecoration: "none",
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.05em",
                transition: "all 0.25s",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => { e.target.style.background = "rgba(139,92,246,0.1)"; e.target.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.transform = "translateY(0)"; }}
              >
                → Let's Talk
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
              {[["1+", "Years Exp."], ["10+", "Projects"], ["15", "GitHub Stars"], ["99%", "Client Sat."]].map(([n, l]) => (
                <div key={l}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 24,
                    background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>{n}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#475569", fontWeight: 700, letterSpacing: "0.05em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D Cube */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
            <AnimatedCube />
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10, color: "#475569",
              letterSpacing: "0.15em",
              animation: "float 4s ease-in-out infinite",
            }}>[ TECH STACK ]</div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#475569", letterSpacing: "0.15em" }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, #7c3aed, transparent)" }} />
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section id="about" style={{ position: "relative", overflow: "hidden" }}>
        <div style={sectionStyle}>
          <SectionHeading
            label="// ABOUT_ME"
            title="Crafting Digital Experiences"
            subtitle="Bridging the gap between great design and robust engineering"
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 60, alignItems: "center" }}>
            {/* Avatar */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative" }}>
                <Avatar />
                {/* Floating badges */}
                {[
                  { label: "React Expert", top: -20, right: -40, color: "#61DAFB" },
                  { label: "Cloud Arch.", bottom: 20, left: -50, color: "#FF9900" },
                  { label: "Open Source", bottom: -20, right: -30, color: "#10b981" },
                ].map((b) => (
                  <div key={b.label} style={{
                    position: "absolute",
                    top: b.top, bottom: b.bottom, left: b.left, right: b.right,
                    padding: "8px 16px",
                    background: "rgba(15,23,42,0.9)",
                    border: `1px solid ${b.color}44`,
                    borderRadius: 20,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10, fontWeight: 700, color: b.color,
                    whiteSpace: "nowrap",
                    backdropFilter: "blur(10px)",
                    animation: "float 6s ease-in-out infinite",
                    animationDelay: `${Math.random() * 3}s`,
                  }}>{b.label}</div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <p style={{ color: "#94a3b8", fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.9, marginBottom: 24 }}>
                I'm a junior full stack developer building practical web applications and software projects.
                I focus on clean UI, responsive design, and solving real problems through simple and reliable code.
              </p>
              <p style={{ color: "#64748b", fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.9, marginBottom: 36 }}>
                Through college projects, school projects, and freelance work, I keep improving my development
                skills in frontend and backend technologies while learning by building.
              </p>

              {/* Quick facts */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  ["📍", "India"],
                  ["🎓", "College Student"],
                  ["💼", "Open to Opportunities"],
                  ["🌐", "Remote-First"],
                ].map(([emoji, text]) => (
                  <div key={text} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 12,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "#94a3b8",
                  }}>
                    <span>{emoji}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────────── */}
      <section id="skills" style={{ position: "relative" }}>
        <FloatingOrb style={{ width: 500, height: 500, top: -100, left: -200, opacity: 0.25 }} color="#3b82f6" />
        <div style={sectionStyle}>
          <SectionHeading
            label="// TECH_STACK"
            title="Tools of the Trade"
            subtitle="Battle-tested technologies I use to build production-grade systems"
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
            {skills.map((s, i) => <SkillCard key={s.name} skill={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────────── */}
      <section id="projects" style={{ position: "relative" }}>
        <FloatingOrb style={{ width: 500, height: 500, bottom: -100, right: -200, opacity: 0.25 }} color="#7c3aed" />
        <div style={sectionStyle}>
          <SectionHeading
            label="// PROJECTS"
            title="Things I've Built"
            subtitle="A selection of production applications, side projects, and open-source contributions"
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
            {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ────────────────────────────────────────────────── */}
      <section id="experience" style={{ position: "relative" }}>
        <div style={sectionStyle}>
          <SectionHeading
            label="// EXPERIENCE"
            title="Journey So Far"
            subtitle="The milestones, companies, and achievements that shaped my career"
          />
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {experiences.map((exp, i) => <TimelineItem key={i} exp={exp} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────── */}
      <section id="contact" style={{ position: "relative", overflow: "hidden" }}>
        <FloatingOrb style={{ width: 600, height: 600, top: -200, right: -300, opacity: 0.3 }} color="#7c3aed" />
        <FloatingOrb style={{ width: 400, height: 400, bottom: -200, left: -200, opacity: 0.2 }} color="#3b82f6" />
        <div style={sectionStyle}>
          <SectionHeading
            label="// CONTACT"
            title="Let's Build Together"
            subtitle="Have a project in mind? I'm always open to discussing new opportunities"
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48 }}>
            {/* Left: Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "✉️", label: "Email", value: "suryar4586@gmail.com", color: "#a78bfa" },
                { icon: "💼", label: "LinkedIn", value: "www.linkedin.com/in/surya-prakash-r-k-057297387", color: "#60a5fa" },
                { icon: "⌥", label: "GitHub", value: "suryar4586-stack", color: "#10b981" },
              ].map((item) => (
                <GlassCard key={item.label} style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}33`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, flexShrink: 0,
                    }}>{item.icon}</div>
                    <div>
                      <div style={{ color: "#64748b", fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 3 }}>{item.label}</div>
                      <div style={{ color: item.color, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600 }}>{item.value}</div>
                    </div>
                  </div>
                </GlassCard>
              ))}

              <GlassCard style={{ padding: "24px", marginTop: 8 }} hover={false}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#64748b", fontSize: 13.5, lineHeight: 1.8, fontStyle: "italic",
                }}>
                  "The best code is no code at all. The second best is code that's so clean, it reads like prose."
                </p>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#7c3aed", marginTop: 12, fontWeight: 700 }}>— Surya Prakash</div>
              </GlassCard>
            </div>

            {/* Right: Form */}
            <GlassCard style={{ padding: "36px" }} hover={false}>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800, fontSize: 22,
                color: "#f1f5f9", marginBottom: 24,
              }}>Send a Message</h3>
              <ContactForm />
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <div style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: 20,
          background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>SP.dev</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#334155" }}>
          © 2026 SURYA PRAKASH · BUILT WITH ♥
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {["GitHub", "LinkedIn"].map((s) => (
            <a key={s} href="#" style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10, color: "#475569",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: "0.05em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.color = "#a78bfa"}
            onMouseLeave={(e) => e.target.style.color = "#475569"}
            >{s}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}