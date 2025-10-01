'use client';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useScrollAnimation } from '../components/useScrollAnimation';

export default function Service() {
  useScrollAnimation();

  return (
    <main className="fade-in">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content-centered">
            <div className="hello-bubble slide-in-up">
              🚀 My Services
            </div>
            <h1 className="hero-title slide-in-up delay-1">
              AI Development & <span className="name-highlight">Full-Stack Solutions</span>
            </h1>
            <p className="slide-in-up delay-2" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', textAlign: 'center' }}>
              Specialized in creating intelligent solutions that combine cutting-edge AI with robust backend architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services animate-on-scroll">
        <div className="container">
          <div className="services-grid">
            <div className="service-card slide-in-left delay-1">
              <div className="service-preview">🤖 AI/ML</div>
              <h3>AI & Machine Learning</h3>
              <p>Custom AI solutions including computer vision, NLP, voice cloning, and intelligent automation systems.</p>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>
                <li>Computer Vision Applications</li>
                <li>Natural Language Processing</li>
                <li>Voice Cloning & TTS Systems</li>
                <li>Predictive Analytics</li>
              </ul>
            </div>
            <div className="service-card featured slide-in-up delay-2">
              <div className="service-preview">⚡ Backend</div>
              <h3>Backend Development</h3>
              <p>Scalable APIs, microservices architecture, and robust server-side solutions with modern frameworks.</p>
              <ul style={{ color: 'white', fontSize: '0.9rem', marginTop: '1rem' }}>
                <li>RESTful API Development</li>
                <li>Database Design & Optimization</li>
                <li>Cloud Integration (AWS, Firebase)</li>
                <li>Authentication & Security</li>
              </ul>
            </div>
            <div className="service-card slide-in-right delay-3">
              <div className="service-preview">🌐 Full Stack</div>
              <h3>Full-Stack Applications</h3>
              <p>End-to-end web applications with modern frameworks, responsive design, and seamless user experiences.</p>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>
                <li>React & Next.js Applications</li>
                <li>Real-time Features</li>
                <li>Progressive Web Apps</li>
                <li>Mobile-First Design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="experience animate-on-scroll">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>My Development Process</h2>
          <div className="experience-item slide-in-up delay-1">
            <div className="experience-date">
              <h4>01</h4>
              <p>Discovery</p>
            </div>
            <div className="experience-dot"></div>
            <div className="experience-content">
              <h3>Requirements Analysis</h3>
              <p>Understanding your needs, defining project scope, and creating detailed technical specifications.</p>
            </div>
          </div>
          <div className="experience-item slide-in-up delay-2">
            <div className="experience-date">
              <h4>02</h4>
              <p>Design</p>
            </div>
            <div className="experience-dot"></div>
            <div className="experience-content">
              <h3>Architecture & Planning</h3>
              <p>System design, technology stack selection, and creating scalable architecture blueprints.</p>
            </div>
          </div>
          <div className="experience-item slide-in-up delay-3">
            <div className="experience-date">
              <h4>03</h4>
              <p>Development</p>
            </div>
            <div className="experience-dot"></div>
            <div className="experience-content">
              <h3>Implementation</h3>
              <p>Agile development with regular updates, code reviews, and continuous integration practices.</p>
            </div>
          </div>
          <div className="experience-item slide-in-up delay-4">
            <div className="experience-date">
              <h4>04</h4>
              <p>Deployment</p>
            </div>
            <div className="experience-dot"></div>
            <div className="experience-content">
              <h3>Launch & Support</h3>
              <p>Production deployment, performance optimization, and ongoing maintenance support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta animate-on-scroll">
        <div className="container">
          <h2>Ready to Build Something <span className="highlight">Amazing</span>?</h2>
          <p>Let's discuss your project and create innovative solutions together.</p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '2rem' }}>
            <a href="/contact" className="btn btn-primary">
              Start Your Project
            </a>
            <a href="/project" className="btn btn-outline">
              View My Work
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}