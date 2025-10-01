"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Analytics from "./components/Analytics";
import Chatbot from "./components/Chatbot";
import ProjectCard from "./components/ProjectCard";

interface Project {
  id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  featured?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [portfolioFilter, setPortfolioFilter] = useState("all");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Fetch projects from Firebase
    fetchProjects();

    // Typing animation
    const fullText = "I'm Saandeep Sai,<br />AI + Backend Developer";
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, 40);
      }
    };

    const startTyping = setTimeout(typeText, 500);

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    // Initialize scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            if (entry.target.classList.contains("skills-section")) {
              animateSkillBars();
            }
            if (entry.target.classList.contains("stats-section")) {
              animateCounters();
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    // Scroll progress bar
    const updateScrollProgress = () => {
      const scrollProgress = document.getElementById("scroll-progress");
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      if (scrollProgress) {
        scrollProgress.style.width = scrollPercent.toString() + "%";
      }
    };

    window.addEventListener("scroll", updateScrollProgress);

    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        portfolioItems.forEach((item) => {
          const htmlItem = item as HTMLElement;
          if (
            filter === "all" ||
            item.getAttribute("data-category") === filter
          ) {
            htmlItem.style.display = "block";
            htmlItem.style.animation = "fadeIn 0.5s ease";
          } else {
            htmlItem.style.display = "none";
          }
        });
      });
    });

    return () => {
      clearTimeout(startTyping);
      clearInterval(cursorInterval);
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  const fetchProjects = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/projects`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data.slice(0, 6)); // Show only first 6 projects on homepage
      } else {
        throw new Error('API not available');
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      // Fallback to sample data
      setProjects([
        {
          id: "1",
          title: "Voice Clone",
          category: "ai",
          type: "Voice Synthesis",
          description: "Advanced voice cloning using Coqui TTS with deep learning models.",
          technologies: ["Python", "Coqui TTS", "AI"],
          image: "/images/VoiceClone.png",
          featured: true
        },
        {
          id: "2",
          title: "VisionTalk",
          category: "ai",
          type: "Multi-AI Tool",
          description: "Multi-feature AI tool with image recognition and voice cloning.",
          technologies: ["Python", "Computer Vision", "AI"],
          image: "/images/VisionTalk.png",
          featured: true
        },
        {
          id: "3",
          title: "Educational Video Generator",
          category: "ai",
          type: "AI Learning System",
          description: "AI-powered system combining TTS and Manim animations.",
          technologies: ["Python", "Manim", "TTS"],
          image: "/images/EducationalVideoGen.png",
          featured: true
        }
      ]);
    }
  };

  const filteredProjects = (
    portfolioFilter === "all"
      ? projects
      : projects.filter((project) => {
          if (portfolioFilter === "ai") {
            return project.category.toLowerCase().includes("ai");
          }
          if (portfolioFilter === "fullstack") {
            return (
              project.category.toLowerCase().includes("full stack") ||
              project.category.toLowerCase().includes("fullstack")
            );
          }
          if (portfolioFilter === "backend") {
            return (
              project.category.toLowerCase().includes("python") ||
              project.category.toLowerCase().includes("data science")
            );
          }
          return project.category === portfolioFilter;
        })
  ).slice(0, 6);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Counter animation
  const animateCounters = () => {
    const counters = document.querySelectorAll(".stat-counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target") ?? "0");
      const increment = target / 100;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toString();
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toString();
        }
      }, 20);
    });
  };

  // Skill bar animation
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll(".skill-progress");
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      setTimeout(() => {
        (bar as HTMLElement).style.width = width + "%";
      }, 500);
    });
  };

  // Handle contact form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Analytics />
      <Chatbot />
      <div className="scroll-progress" id="scroll-progress"></div>
      <main className="fade-in" suppressHydrationWarning>
        <Navbar />

        {/* Hero Section */}
        <section
          style={{
            padding: "60px 0",
            background: "var(--bg-primary)",
            position: "relative",
            overflow: "hidden",
            minHeight: "600px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1200px",
              height: "650px",
              margin: "0 auto",
            }}
          >
            {/* Hello Bubble - Top Center */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--card-bg)",
                border: "2px solid var(--border)",
                borderRadius: "30px",
                padding: "10px 24px",
                zIndex: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <span
                style={{
                  color: "var(--text-primary)",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                }}
              >
                Hello!
              </span>
              <div
                style={{
                  position: "absolute",
                  bottom: "-6px",
                  right: "20px",
                  width: "0",
                  height: "0",
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "6px solid var(--card-bg)",
                }}
              ></div>
            </div>

            {/* Central Image with Orange Circle */}
            <div
              style={{
                position: "absolute",
                bottom: "0px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 15,
              }}
            >
              {/* Orange Circle Background */}
              <div
                style={{
                  width: "450px",
                  height: "450px",
                  background: "var(--accent)",
                  borderRadius: "50%",
                  position: "relative",
                }}
              >
                {/* Hero Image */}
                <img
                  src="/images/Hero1.png"
                  alt="Saandeep Sai"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "380px",
                    height: "auto",
                    zIndex: 20,
                  }}
                />
              </div>
            </div>

            {/* Main Title - Above the circle */}
            <div
              style={{
                position: "absolute",
                top: "70px",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                zIndex: 10,
                width: "100%",
              }}
            >
              <h1
                style={{
                  fontSize: "4.5rem",
                  fontWeight: "800",
                  lineHeight: "0.9",
                  margin: 0,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  minHeight: "200px",
                }}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: typedText
                      .replace(
                        /(Saandeep Sai)/g,
                        '<span style="color: var(--accent)">$1</span>'
                      )
                      .replace(
                        /(AI Developer)/g,
                        '<span style="font-size: 4rem; color: var(--text-primary)">$1</span>'
                      ),
                  }}
                />
                {showCursor && (
                  <span style={{ color: "var(--accent)" }}>|</span>
                )}
              </h1>
            </div>

            {/* Left Quote Section */}
            <div
              style={{
                position: "absolute",
                top: "280px",
                left: "80px",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  lineHeight: "1",
                  marginBottom: "10px",
                  color: "var(--text-primary)",
                  fontWeight: "400",
                }}
              >
                "
              </div>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1rem",
                  lineHeight: "1.4",
                  margin: 0,
                  maxWidth: "250px",
                  fontWeight: "400",
                }}
              >
                Saandeep's exceptional AI solutions ensured our website's
                success. Highly recommended!
              </p>
            </div>

            {/* Left Bottom Stats */}
            <div
              style={{
                position: "absolute",
                bottom: "80px",
                left: "80px",
                zIndex: 10,
              }}
            >
              <h3
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "800",
                  margin: 0,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                15+
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  margin: 0,
                  fontSize: "1rem",
                  fontWeight: "400",
                }}
              >
                Projects Done
              </p>
            </div>

            {/* Right Top Stats */}
            <div
              style={{
                position: "absolute",
                top: "300px",
                right: "80px",
                textAlign: "right",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "3px",
                  marginBottom: "8px",
                  justifyContent: "flex-end",
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{ color: "var(--accent)", fontSize: "1.4rem" }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <h3
                style={{
                  fontSize: "3rem",
                  fontWeight: "800",
                  margin: 0,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                3+ Years
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  margin: 0,
                  fontSize: "1rem",
                  borderBottom: "3px solid var(--text-primary)",
                  paddingBottom: "4px",
                  fontWeight: "500",
                }}
              >
                Experience
              </p>
            </div>

            {/* Bottom Action Buttons - Overlapping circle */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "1.2rem",
                alignItems: "center",
                zIndex: 20,
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "-45px",
                    transform: "translateY(-50%)",
                    width: "35px",
                    height: "2px",
                    background: "var(--text-primary)",
                    borderRadius: "1px",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "-18px",
                    transform: "translateY(-50%) rotate(45deg)",
                    width: "2px",
                    height: "10px",
                    background: "var(--text-primary)",
                    borderRadius: "1px",
                    transformOrigin: "bottom",
                  }}
                ></div>
                <a
                  href="#portfolio"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "var(--accent)",
                    color: "white",
                    padding: "14px 28px",
                    borderRadius: "30px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "1rem",
                    boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
                  }}
                >
                  Portfolio <span style={{ fontSize: "1.1rem" }}>↗</span>
                </a>
              </div>
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "var(--card-bg)",
                  color: "var(--text-primary)",
                  padding: "14px 28px",
                  borderRadius: "30px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "1rem",
                  border: "2px solid var(--border)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                Hire Me
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services animate-on-scroll">
          <div className="container">
            <h2 className="slide-in-up">My Services</h2>
            <p className="services-intro slide-in-up delay-1">
              Specialized in creating intelligent solutions that combine
              cutting-edge AI with robust backend architecture.
            </p>
            <div className="services-grid">
              <div className="service-card slide-in-left delay-2">
                <div className="service-preview">Web Dev</div>
                <h3>Web Development</h3>
                <p>
                  Full-stack web applications with modern frameworks and
                  responsive design.
                </p>
              </div>
              <div className="service-card featured slide-in-up delay-3">
                <div className="service-preview">AI Systems</div>
                <h3>AI Development</h3>
                <p>
                  Intelligent systems using machine learning and natural
                  language processing.
                </p>
              </div>
              <div className="service-card slide-in-right delay-4">
                <div className="service-preview">Backend API</div>
                <h3>Backend Development</h3>
                <p>
                  Scalable APIs and server-side solutions with robust
                  architecture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="experience animate-on-scroll">
          <div className="container">
            <h2 className="slide-in-up">My Achievements</h2>

            <div className="experience-item slide-in-left delay-1">
              <div className="experience-date">
                <h4>National Hackathons</h4>
                <p>2025</p>
              </div>
              <div className="experience-dot pulse-dot"></div>
              <div className="experience-content">
                <h3>3 National Level Wins</h3>
                <p>
                  Won 3 national level hackathons by developing innovative AI
                  solutions and full-stack applications within tight deadlines.
                </p>
              </div>
            </div>

            <div className="experience-item slide-in-right delay-2">
              <div className="experience-date">
                <h4>Project Development</h4>
                <p>2025</p>
              </div>
              <div className="experience-dot pulse-dot"></div>
              <div className="experience-content">
                <h3>Rapid Prototyping</h3>
                <p>
                  Built 3 fully functional mini projects within a week,
                  showcasing expertise in Django, AI integration, and full-stack
                  development.
                </p>
              </div>
            </div>

            <div className="experience-item slide-in-left delay-3">
              <div className="experience-date">
                <h4>AI Innovation</h4>
                <p>2025</p>
              </div>
              <div className="experience-dot pulse-dot"></div>
              <div className="experience-content">
                <h3>Specialized AI Projects</h3>
                <p>
                  Developed cutting-edge AI applications including educational
                  video generators, music generation systems, and accessibility
                  solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section animate-on-scroll">
          <div className="container">
            <div className="cta-content">
              <div className="cta-image">
                <img src="/images/HireMe.png" alt="Saandeep Sai" />
              </div>
              <div className="cta-text">
                <h2>
                  Why You <span className="highlight">Hire Me</span> For Your
                  Next Project?
                </h2>
                <p>
                  I bring innovative AI solutions and robust backend development
                  skills with proven hackathon wins and rapid project delivery
                  capabilities.
                </p>

                <div className="cta-stats">
                  <div className="cta-stat">
                    <h3>5+</h3>
                    <p>Satisfied Clients</p>
                  </div>
                  <div className="cta-stat">
                    <h3>8+</h3>
                    <p>Projects Completed</p>
                  </div>
                </div>

                <a href="#contact" className="btn btn-primary">
                  Hire Me
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="portfolio animate-on-scroll" id="portfolio">
          <div className="container">
            <div className="portfolio-header">
              <h2>
                Let's Have a Look at my{" "}
                <span className="highlight">Portfolio</span>
              </h2>
              <div className="portfolio-filters">
                <button 
                  className={`filter-btn ${portfolioFilter === "all" ? "active" : ""}`}
                  onClick={() => setPortfolioFilter("all")}
                >
                  All
                </button>
                <button 
                  className={`filter-btn ${portfolioFilter === "ai" ? "active" : ""}`}
                  onClick={() => setPortfolioFilter("ai")}
                >
                  AI Projects
                </button>
                <button 
                  className={`filter-btn ${portfolioFilter === "fullstack" ? "active" : ""}`}
                  onClick={() => setPortfolioFilter("fullstack")}
                >
                  Web Apps
                </button>
                <button 
                  className={`filter-btn ${portfolioFilter === "backend" ? "active" : ""}`}
                  onClick={() => setPortfolioFilter("backend")}
                >
                  Python
                </button>
              </div>
            </div>
            <div className="projects-grid">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No projects found. Please check if the backend is running.
                </div>
              )}
            </div>
            
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <a href="/project" className="btn btn-primary">
                View All Projects
              </a>
            </div>

            <div className="portfolio-featured hover-glow animate-on-scroll">
              <h3>Educational Video Generator - AI Learning System</h3>
              <p className="featured-description">
                AI-powered system combining TTS, narration sync, and Manim
                animations to auto-generate learning videos. Advanced voice
                cloning using Coqui TTS with deep learning models (YourTTS,
                Tacotron, VITS, XTTS) to replicate human voice using short audio
                samples.
              </p>
              <div className="featured-highlights">
                <div className="highlight-item">
                  <h4>🎥 Auto Video Generation</h4>
                  <p>
                    Combines TTS, narration sync, and Manim animations for
                    educational content
                  </p>
                </div>
                <div className="highlight-item">
                  <h4>🎙️ Voice Cloning</h4>
                  <p>
                    Advanced voice replication using Coqui TTS and deep learning
                    models
                  </p>
                </div>
                <div className="highlight-item">
                  <h4>📚 Personalized AI Tutor</h4>
                  <p>
                    Adaptive AI tutor that restructures course modules based on
                    user performance
                  </p>
                </div>
              </div>
              <div className="tech-stack featured-tech">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">Coqui TTS</span>
                <span className="tech-tag">Manim</span>
                <span className="tech-tag">Deep Learning</span>
                <span className="tech-tag">TensorFlow</span>
                <span className="tech-tag">AI</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials animate-on-scroll">
          <div className="container">
            <h2>
              Testimonials That Speak to{" "}
              <span className="highlight">My Results</span>
            </h2>
            <p>
              Client feedback and testimonials from successful project
              collaborations.
            </p>

            <div className="testimonial-grid">
              <div className="testimonial slide-in-left delay-1 hover-scale">
                <p>
                  "Saandeep's AI solutions transformed our business processes.
                  Exceptional technical skills and delivery."
                </p>
                <h4>Rajesh Kumar</h4>
                <p>CTO, TechStart</p>
              </div>
              <div className="testimonial slide-in-up delay-2 hover-scale">
                <p>
                  "Outstanding backend architecture and AI integration. Highly
                  professional and reliable."
                </p>
                <h4>Priya Sharma</h4>
                <p>Product Manager, InnovateLabs</p>
              </div>
              <div className="testimonial slide-in-right delay-3 hover-scale">
                <p>
                  "Delivered complex AI projects on time with excellent quality.
                  Highly recommend Saandeep."
                </p>
                <h4>Amit Patel</h4>
                <p>Founder, AI Solutions Inc</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="contact-cta animate-on-scroll">
          <div className="container">
            <h2>
              Have An Awesome Project Idea?{" "}
              <span className="highlight">Let's Discuss</span>
            </h2>
            <p>
              Ready to bring your ideas to life with cutting-edge AI and backend
              solutions.
            </p>
            <a href="#contact" className="btn btn-primary">
              Get In Touch
            </a>
          </div>
        </section>

        {/* Skills with Progress Bars */}
        <section className="skills-section animate-on-scroll">
          <div className="container">
            <h2 className="section-title slide-in-up">Technical Skills</h2>
            <div className="skills-grid">
              <div className="skill-item slide-in-left delay-1">
                <div className="skill-header">
                  <h3 className="skill-name">Python & AI</h3>
                  <span className="skill-percentage">95%</span>
                </div>
                <div className="skill-bar-container">
                  <div className="skill-progress" data-width="95"></div>
                </div>
              </div>
              <div className="skill-item slide-in-left delay-2">
                <div className="skill-header">
                  <h3 className="skill-name">Backend Development</h3>
                  <span className="skill-percentage">90%</span>
                </div>
                <div className="skill-bar-container">
                  <div className="skill-progress" data-width="90"></div>
                </div>
              </div>
              <div className="skill-item slide-in-left delay-3">
                <div className="skill-header">
                  <h3 className="skill-name">Machine Learning</h3>
                  <span className="skill-percentage">88%</span>
                </div>
                <div className="skill-bar-container">
                  <div className="skill-progress" data-width="88"></div>
                </div>
              </div>
              <div className="skill-item slide-in-left delay-4">
                <div className="skill-header">
                  <h3 className="skill-name">Full Stack Development</h3>
                  <span className="skill-percentage">85%</span>
                </div>
                <div className="skill-bar-container">
                  <div className="skill-progress" data-width="85"></div>
                </div>
              </div>
              <div className="skill-item slide-in-left delay-5">
                <div className="skill-header">
                  <h3 className="skill-name">Cloud & DevOps</h3>
                  <span className="skill-percentage">80%</span>
                </div>
                <div className="skill-bar-container">
                  <div className="skill-progress" data-width="80"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Stats & Certifications */}
        <section className="stats-section animate-on-scroll">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card slide-in-up delay-1">
                <div className="stat-icon">🏆</div>
                <div className="stat-counter" data-target="15">
                  0
                </div>
                <p>Certifications</p>
              </div>
              <div className="stat-card slide-in-up delay-2">
                <div className="stat-icon">⭐</div>
                <div className="stat-counter" data-target="500">
                  0
                </div>
                <p>GitHub Stars</p>
              </div>
              <div className="stat-card slide-in-up delay-3">
                <div className="stat-icon">🚀</div>
                <div className="stat-counter" data-target="25">
                  0
                </div>
                <p>Projects Deployed</p>
              </div>
              <div className="stat-card slide-in-up delay-4">
                <div className="stat-icon">👥</div>
                <div className="stat-counter" data-target="50">
                  0
                </div>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="blog-section animate-on-scroll">
          <div className="container">
            <div className="blog-header">
              <h2>Latest Articles</h2>
              <a href="#" className="btn btn-primary">
                View All
              </a>
            </div>
            <div className="blog-grid">
              <div className="blog-item hover-lift slide-in-left delay-1">
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop"
                  alt="AI Blog"
                />
                <div className="blog-content">
                  <div className="blog-category">AI Development</div>
                  <h3>Building Scalable AI Systems with Python</h3>
                  <p>
                    Learn how to architect AI applications that can handle
                    millions of requests...
                  </p>
                  <div className="blog-meta">
                    <span>5 min read</span>
                    <span>Dec 15, 2024</span>
                  </div>
                </div>
              </div>
              <div className="blog-item hover-lift slide-in-up delay-2">
                <img
                  src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=250&fit=crop"
                  alt="Backend Blog"
                />
                <div className="blog-content">
                  <div className="blog-category">Backend</div>
                  <h3>Microservices Architecture Best Practices</h3>
                  <p>
                    Essential patterns for building robust distributed
                    systems...
                  </p>
                  <div className="blog-meta">
                    <span>8 min read</span>
                    <span>Dec 10, 2024</span>
                  </div>
                </div>
              </div>
              <div className="blog-item hover-lift slide-in-right delay-3">
                <img
                  src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop"
                  alt="Tech Blog"
                />
                <div className="blog-content">
                  <div className="blog-category">Technology</div>
                  <h3>The Future of AI in Software Development</h3>
                  <p>
                    Exploring how AI is transforming the way we build
                    applications...
                  </p>
                  <div className="blog-meta">
                    <span>6 min read</span>
                    <span>Dec 5, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievement Road */}
        <section
          className="animate-on-scroll"
          style={{
            padding: "100px 0",
            background: "var(--bg-secondary)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="container">
            <h2
              style={{
                textAlign: "center",
                marginBottom: "4rem",
                color: "var(--text-primary)",
              }}
            >
              Achievement Journey
            </h2>

            {/* Road Path */}
            <div
              style={{
                position: "relative",
                maxWidth: "1000px",
                margin: "0 auto",
              }}
            >
              {/* Road Background */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0",
                  right: "0",
                  height: "120px",
                  background:
                    "linear-gradient(90deg, #666 0%, #888 50%, #666 100%)",
                  transform: "translateY(-50%)",
                  borderRadius: "60px",
                  zIndex: 1,
                }}
              ></div>

              {/* Road Lines */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0",
                  right: "0",
                  height: "4px",
                  background:
                    "repeating-linear-gradient(90deg, white 0px, white 30px, transparent 30px, transparent 60px)",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                }}
              ></div>

              {/* Achievement Milestones */}
              <div
                style={{
                  position: "relative",
                  zIndex: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 50px",
                }}
              >
                {/* Milestone 1 */}
                <div
                  className="slide-in-up delay-1"
                  style={{ textAlign: "center", position: "relative" }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "var(--accent)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      marginBottom: "20px",
                      boxShadow: "0 10px 30px rgba(255, 107, 53, 0.4)",
                      animation: "pulse 2s infinite",
                    }}
                  >
                    🏆
                  </div>
                  <div
                    style={{
                      background: "var(--card-bg)",
                      padding: "15px",
                      borderRadius: "15px",
                      boxShadow: "0 10px 30px var(--shadow)",
                      border: "1px solid var(--border)",
                      minWidth: "150px",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        marginBottom: "5px",
                      }}
                    >
                      Science Expo
                    </h4>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      2024 Foundation
                    </p>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div
                  className="slide-in-up delay-2"
                  style={{ textAlign: "center", position: "relative" }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "var(--accent)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      marginBottom: "20px",
                      boxShadow: "0 10px 30px rgba(255, 107, 53, 0.4)",
                      animation: "pulse 2s infinite",
                    }}
                  >
                    🥈
                  </div>
                  <div
                    style={{
                      background: "var(--card-bg)",
                      padding: "15px",
                      borderRadius: "15px",
                      boxShadow: "0 10px 30px var(--shadow)",
                      border: "1px solid var(--border)",
                      minWidth: "150px",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        marginBottom: "5px",
                      }}
                    >
                      JIJNASA 2024
                    </h4>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      2nd Place
                    </p>
                  </div>
                </div>

                {/* Milestone 3 */}
                <div
                  className="slide-in-up delay-3"
                  style={{ textAlign: "center", position: "relative" }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "var(--accent)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      marginBottom: "20px",
                      boxShadow: "0 10px 30px rgba(255, 107, 53, 0.4)",
                      animation: "pulse 2s infinite",
                    }}
                  >
                    🥈
                  </div>
                  <div
                    style={{
                      background: "var(--card-bg)",
                      padding: "15px",
                      borderRadius: "15px",
                      boxShadow: "0 10px 30px var(--shadow)",
                      border: "1px solid var(--border)",
                      minWidth: "150px",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        marginBottom: "5px",
                      }}
                    >
                      CYPHER 2025
                    </h4>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      2nd Prize
                    </p>
                  </div>
                </div>

                {/* Milestone 4 */}
                <div
                  className="slide-in-up delay-4"
                  style={{ textAlign: "center", position: "relative" }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "var(--accent)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      marginBottom: "20px",
                      boxShadow: "0 10px 30px rgba(255, 107, 53, 0.4)",
                      animation: "pulse 2s infinite",
                    }}
                  >
                    🥈
                  </div>
                  <div
                    style={{
                      background: "var(--card-bg)",
                      padding: "15px",
                      borderRadius: "15px",
                      boxShadow: "0 10px 30px var(--shadow)",
                      border: "1px solid var(--border)",
                      minWidth: "150px",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        marginBottom: "5px",
                      }}
                    >
                      NEXOVATE 2025
                    </h4>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      2nd Prize
                    </p>
                  </div>
                </div>

                {/* Current Position */}
                <div
                  className="slide-in-up delay-5"
                  style={{ textAlign: "center", position: "relative" }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      background:
                        "linear-gradient(45deg, var(--accent), #ff8c42)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      marginBottom: "20px",
                      boxShadow: "0 0 40px rgba(255, 107, 53, 0.8)",
                      animation: "glow 2s infinite",
                    }}
                  >
                    🎯
                  </div>
                  <div
                    style={{
                      background: "var(--card-bg)",
                      padding: "15px",
                      borderRadius: "15px",
                      boxShadow: "0 10px 30px var(--shadow)",
                      border: "2px solid var(--accent)",
                      minWidth: "150px",
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--accent)",
                        fontSize: "0.9rem",
                        marginBottom: "5px",
                      }}
                    >
                      Leadership
                    </h4>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      Ongoing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter animate-on-scroll">
          <div className="container">
            <h2>Stay Updated</h2>
            <p>
              Get the latest insights on AI, backend development, and tech
              trends
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact" id="contact">
          <div className="container">
            <div className="contact-content">
              <div>
                <h2>Let's Connect There</h2>
                <p>Have an awesome project idea? Let's discuss</p>
                <div style={{ marginTop: "30px" }}>
                  <p>
                    <strong>Email:</strong> saandeepsaiturpu@gmail.com
                  </p>
                  <p>
                    <strong>Location:</strong> Hyderabad, India
                  </p>
                  <div
                    className="badge-base LI-profile-badge"
                    data-locale="en_US"
                    data-size="medium"
                    data-theme="dark"
                    data-type="VERTICAL"
                    data-vanity="turpu-saandeep-sai"
                    data-version="v1"
                  >
                    <a
                      className="badge-base__link LI-simple-link"
                      href="https://in.linkedin.com/in/turpu-saandeep-sai?trk=profile-badge"
                    >
                      Turpu Saandeep Sai
                    </a>
                  </div>

                  <div style={{ marginTop: "20px" }}>
                    <a
                      href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
                      className="btn btn-secondary"
                      style={{ marginRight: "10px" }}
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/Saandeep-Sai"
                      className="btn btn-secondary"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
              <form
                className="contact-form slide-in-right"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  className="form-input slide-in-up delay-1"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="form-input slide-in-up delay-2"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="form-input slide-in-up delay-3"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                ></textarea>
                <button
                  type="submit"
                  className="btn btn-primary slide-in-up delay-4 hover-bounce"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
