"use client";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useScrollAnimation } from "../components/useScrollAnimation";

export default function About() {
  useScrollAnimation();

  return (
    <main className="fade-in">
      <Navbar />

      {/* Hero/Intro Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content-centered">
            <div className="hello-bubble slide-in-up">
              👋 Hello, I'm Saandeep!
            </div>
            <h1 className="hero-title slide-in-up delay-1">
              Computer Science student, pursuing{" "}
              <span className="name-highlight">B.Tech</span> and an{" "}
              <span className="name-highlight">Associate of Science in AI</span>
            </h1>
            <p
              className="slide-in-up delay-2"
              style={{
                fontSize: "1.2rem",
                color: "var(--text-secondary)",
                maxWidth: "600px",
                textAlign: "center",
              }}
            >
              Passionate about AI-driven applications, full-stack development,
              and data science.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="services animate-on-scroll">
        <div className="container">
          <h2>About Me</h2>
          <div
            className="services-intro"
            style={{ maxWidth: "800px", fontSize: "1.1rem", lineHeight: "1.7" }}
          >
            <p>
              I'm a dedicated Computer Science student with extensive experience
              in AI/ML projects including voice cloning, educational video
              generators, and AI tutoring systems. My expertise spans data
              analysis using Python, Pandas, NumPy, and Seaborn, demonstrated
              through projects like Titanic dataset analysis. With multiple 2nd
              place finishes in hackathons, I excel at rapid prototyping and
              building innovative solutions. I'm passionate about creating
              AI-powered, scalable tools that transform education and media
              experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="skills-section animate-on-scroll">
        <div className="container">
          <h2
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              color: "var(--text-primary)",
            }}
          >
            Technical Skills
          </h2>
          <div className="services-grid">
            <div className="service-card slide-in-left delay-1">
              <h3>Programming Languages</h3>
              <div
                className="tech-stack"
                style={{ justifyContent: "flex-start", marginTop: "1rem" }}
              >
                <span className="tech-tag">Python</span>
                <span className="tech-tag">JavaScript</span>
                <span className="tech-tag">Java</span>
                <span className="tech-tag">C++</span>
                <span className="tech-tag">SQL</span>
              </div>
            </div>
            <div className="service-card slide-in-up delay-2">
              <h3>Frameworks & Libraries</h3>
              <div
                className="tech-stack"
                style={{ justifyContent: "flex-start", marginTop: "1rem" }}
              >
                <span className="tech-tag">React</span>
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">Express</span>
                <span className="tech-tag">Flask</span>
              </div>
            </div>
            <div className="service-card slide-in-right delay-3">
              <h3>AI/ML & Data Science</h3>
              <div
                className="tech-stack"
                style={{ justifyContent: "flex-start", marginTop: "1rem" }}
              >
                <span className="tech-tag">TensorFlow</span>
                <span className="tech-tag">PyTorch</span>
                <span className="tech-tag">Pandas</span>
                <span className="tech-tag">NumPy</span>
                <span className="tech-tag">Seaborn</span>
              </div>
            </div>
          </div>
          <div className="services-grid" style={{ marginTop: "2rem" }}>
            <div className="service-card slide-in-left delay-4">
              <h3>Databases & Cloud</h3>
              <div
                className="tech-stack"
                style={{ justifyContent: "flex-start", marginTop: "1rem" }}
              >
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">PostgreSQL</span>
                <span className="tech-tag">AWS</span>
                <span className="tech-tag">Firebase</span>
              </div>
            </div>
            <div className="service-card slide-in-up delay-5">
              <h3>Tools & Practices</h3>
              <div
                className="tech-stack"
                style={{ justifyContent: "flex-start", marginTop: "1rem" }}
              >
                <span className="tech-tag">Git</span>
                <span className="tech-tag">Docker</span>
                <span className="tech-tag">VS Code</span>
                <span className="tech-tag">Agile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="portfolio animate-on-scroll">
        <div className="container">
          <div className="portfolio-header">
            <h2>
              Featured <span className="highlight">Projects</span>
            </h2>
            <a href="/project" className="btn btn-primary">
              View All Projects
            </a>
          </div>
          <div className="portfolio-grid">
            <div className="portfolio-item hover-lift slide-in-left delay-1">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop"
                alt="Item Retriever"
              />
              <div className="portfolio-content">
                <div className="project-category">AI/Computer Vision</div>
                <h3>Item Retriever</h3>
                <p className="project-description">
                  AI-powered system for intelligent item detection and retrieval
                  using computer vision.
                </p>
                <div className="tech-stack">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">OpenCV</span>
                  <span className="tech-tag">TensorFlow</span>
                </div>
              </div>
            </div>
            <div className="portfolio-item hover-lift slide-in-up delay-2">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop"
                alt="VisionTalk"
              />
              <div className="portfolio-content">
                <div className="project-category">AI/NLP</div>
                <h3>VisionTalk</h3>
                <p className="project-description">
                  Advanced AI system combining computer vision with natural
                  language processing.
                </p>
                <div className="tech-stack">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">NLP</span>
                  <span className="tech-tag">Computer Vision</span>
                </div>
              </div>
            </div>
            <div className="portfolio-item hover-lift slide-in-right delay-3">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop"
                alt="Tune Genie"
              />
              <div className="portfolio-content">
                <div className="project-category">AI/Audio</div>
                <h3>Tune Genie</h3>
                <p className="project-description">
                  AI-powered music generation and voice cloning application.
                </p>
                <div className="tech-stack">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Audio ML</span>
                  <span className="tech-tag">Deep Learning</span>
                </div>
              </div>
            </div>
            <div className="portfolio-item hover-lift slide-in-left delay-4">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop"
                alt="AI Tutor"
              />
              <div className="portfolio-content">
                <div className="project-category">AI/Education</div>
                <h3>Personalized AI Tutor</h3>
                <p className="project-description">
                  Intelligent tutoring system providing personalized learning
                  experiences.
                </p>
                <div className="tech-stack">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Machine Learning</span>
                  <span className="tech-tag">NLP</span>
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

      {/* Education Section */}
      <section className="experience animate-on-scroll">
        <div className="container">
          <h2>Education</h2>
          <div className="experience-item slide-in-up delay-1">
            <div className="experience-date">
              <h4>2022 - 2026</h4>
              <p>Present</p>
            </div>
            <div className="experience-dot"></div>
            <div className="experience-content">
              <h3>B.Tech in Computer Science</h3>
              <p>
                Currently pursuing Bachelor of Technology with a focus on AI and
                software development. Maintaining a strong academic record with
                CPI: 8.8/10.
              </p>
            </div>
          </div>
          <div className="experience-item slide-in-up delay-2">
            <div className="experience-date">
              <h4>2025 - Present</h4>
              <p>Ongoing</p>
            </div>
            <div className="experience-dot"></div>
            <div className="experience-content">
              <h3>Associate of Science in AI</h3>
              <p>
                Specialized program focusing on artificial intelligence, machine
                learning, and data science applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="contact-cta animate-on-scroll">
        <div className="container">
          <h2>
            Let's Build the <span className="highlight">Future</span> Together
          </h2>
          <p>
            I am passionate about applying AI to solve real-world challenges.
            Let's connect and build the future of intelligent applications
            together.
          </p>
          <div
            className="hero-actions"
            style={{ justifyContent: "center", marginTop: "2rem" }}
          >
            <a
              href="https://github.com/Saandeep-Sai"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Profile
            </a>
            <a
              href="https://www.linkedin.com/in/turpu-saandeep-sai"
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="/contact" className="btn btn-outline">
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
