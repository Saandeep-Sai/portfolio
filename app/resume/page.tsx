'use client';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useScrollAnimation } from '../components/useScrollAnimation';

export default function Resume() {
  useScrollAnimation();

  return (
    <main className="fade-in">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content-centered">
            <div className="hello-bubble slide-in-up">
              📄 Resume
            </div>
            <h1 className="hero-title slide-in-up delay-1">
              Saandeep Sai <span className="name-highlight">Turpu</span>
            </h1>
            <p className="slide-in-up delay-2" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', textAlign: 'center' }}>
              Computer Science Student | AI Developer | Full-Stack Engineer
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '2rem' }}>
              <a href="/images/Saandeep_Sai_s_resume (1).pdf" download="Saandeep_Sai_Resume.pdf" className="btn btn-primary">
                📥 Download Resume
              </a>
              <a href="mailto:saandeepsaiturpu@gmail.com" className="btn btn-outline">
                📧 Contact Me
              </a>
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
              <p>Currently pursuing Bachelor of Technology with a focus on AI and software development. Maintaining a strong academic record with <strong>CPI: 8.8/10</strong>.</p>
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
              <p>Specialized program focusing on artificial intelligence, machine learning, and data science applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section animate-on-scroll">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-primary)' }}>Technical Skills</h2>
          <div className="services-grid">
            <div className="service-card slide-in-left delay-1">
              <h3>Programming Languages</h3>
              <div className="tech-stack" style={{ justifyContent: 'flex-start', marginTop: '1rem' }}>
                <span className="tech-tag">Python</span>
                <span className="tech-tag">JavaScript</span>
                <span className="tech-tag">Java</span>
                <span className="tech-tag">C++</span>
                <span className="tech-tag">SQL</span>
              </div>
            </div>
            <div className="service-card slide-in-up delay-2">
              <h3>Frameworks & Libraries</h3>
              <div className="tech-stack" style={{ justifyContent: 'flex-start', marginTop: '1rem' }}>
                <span className="tech-tag">React</span>
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">Express</span>
                <span className="tech-tag">Flask</span>
              </div>
            </div>
            <div className="service-card slide-in-right delay-3">
              <h3>AI/ML & Data Science</h3>
              <div className="tech-stack" style={{ justifyContent: 'flex-start', marginTop: '1rem' }}>
                <span className="tech-tag">TensorFlow</span>
                <span className="tech-tag">PyTorch</span>
                <span className="tech-tag">Pandas</span>
                <span className="tech-tag">NumPy</span>
                <span className="tech-tag">Seaborn</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Road */}
      <section className="animate-on-scroll" style={{ padding: '100px 0', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '4rem', color: 'var(--text-primary)' }}>Achievement Journey</h2>
          
          <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '120px',
              background: 'linear-gradient(90deg, #666 0%, #888 50%, #666 100%)',
              transform: 'translateY(-50%)',
              borderRadius: '60px',
              zIndex: 1
            }}></div>
            
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '4px',
              background: 'repeating-linear-gradient(90deg, white 0px, white 30px, transparent 30px, transparent 60px)',
              transform: 'translateY(-50%)',
              zIndex: 2
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 50px' }}>
              
              <div className="slide-in-up delay-1" style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--accent)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  marginBottom: '20px',
                  boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)',
                  animation: 'pulse 2s infinite'
                }}>🏆</div>
                <div style={{
                  background: 'var(--card-bg)',
                  padding: '15px',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px var(--shadow)',
                  border: '1px solid var(--border)',
                  minWidth: '150px'
                }}>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '5px' }}>Science Expo</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>2024 Foundation</p>
                </div>
              </div>
              
              <div className="slide-in-up delay-2" style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--accent)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  marginBottom: '20px',
                  boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)',
                  animation: 'pulse 2s infinite'
                }}>🥈</div>
                <div style={{
                  background: 'var(--card-bg)',
                  padding: '15px',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px var(--shadow)',
                  border: '1px solid var(--border)',
                  minWidth: '150px'
                }}>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '5px' }}>JIJNASA 2024</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>2nd Place</p>
                </div>
              </div>
              
              <div className="slide-in-up delay-3" style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--accent)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  marginBottom: '20px',
                  boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)',
                  animation: 'pulse 2s infinite'
                }}>🥈</div>
                <div style={{
                  background: 'var(--card-bg)',
                  padding: '15px',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px var(--shadow)',
                  border: '1px solid var(--border)',
                  minWidth: '150px'
                }}>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '5px' }}>CYPHER 2025</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>2nd Prize</p>
                </div>
              </div>
              
              <div className="slide-in-up delay-4" style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--accent)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  marginBottom: '20px',
                  boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)',
                  animation: 'pulse 2s infinite'
                }}>🥈</div>
                <div style={{
                  background: 'var(--card-bg)',
                  padding: '15px',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px var(--shadow)',
                  border: '1px solid var(--border)',
                  minWidth: '150px'
                }}>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '5px' }}>NEXOVATE 2025</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>2nd Prize</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-cta animate-on-scroll">
        <div className="container">
          <h2>Let's <span className="highlight">Connect</span></h2>
          <p>Ready to discuss opportunities or collaborate on exciting projects?</p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '2rem' }}>
            <a href="mailto:saandeepsaiturpu@gmail.com" className="btn btn-primary">
              📧 Email Me
            </a>
            <a href="https://www.linkedin.com/in/turpu-saandeep-sai" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              🔗 LinkedIn
            </a>
            <a href="https://github.com/Saandeep-Sai" className="btn btn-outline" target="_blank" rel="noopener noreferrer">
              🐈 GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}