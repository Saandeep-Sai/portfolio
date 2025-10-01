'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useScrollAnimation } from '../components/useScrollAnimation';

export default function Contact() {
  useScrollAnimation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="fade-in">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content-centered">
            <div className="hello-bubble slide-in-up">
              📞 Contact
            </div>
            <h1 className="hero-title slide-in-up delay-1">
              Let's Build Something <span className="name-highlight">Amazing</span> Together
            </h1>
            <p className="slide-in-up delay-2" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', textAlign: 'center' }}>
              Have a project in mind? Let's discuss how we can bring your ideas to life with cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact animate-on-scroll">
        <div className="container">
          <div className="contact-content">
            <div className="slide-in-left">
              <h2>Get In Touch</h2>
              <p>Ready to start your next project? I'm here to help bring your ideas to life.</p>
              
              <div style={{ marginTop: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>📧 Email</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>saandeepsaiturpu@gmail.com</p>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>📍 Location</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>Hyderabad, India</p>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>🔗 Social Links</h4>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <a
                      href="https://www.linkedin.com/in/turpu-saandeep-sai"
                      className="btn btn-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/Saandeep-Sai"
                      className="btn btn-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                    >
                      GitHub
                    </a>
                  </div>
                </div>
                
                <div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>⏰ Response Time</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>I typically respond within 24 hours</p>
                </div>
              </div>
            </div>

            <form className="contact-form slide-in-right" onSubmit={handleSubmit}>
              {submitStatus === 'success' && (
                <div style={{
                  background: '#28a745',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div style={{
                  background: '#dc3545',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  ✗ Failed to send message. Please try again.
                </div>
              )}
              
              <input
                type="text"
                placeholder="Your Name"
                className="form-input slide-in-up delay-1"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="form-input slide-in-up delay-2"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <textarea
                placeholder="Your Message"
                rows={6}
                className="form-input slide-in-up delay-3"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
              <button
                type="submit"
                className="btn btn-primary slide-in-up delay-4 hover-bounce"
                disabled={isSubmitting}
                style={{ width: '100%' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services animate-on-scroll">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>What I Can Help You With</h2>
          <div className="services-grid">
            <div className="service-card slide-in-left delay-1">
              <div className="service-preview">🤖 AI/ML</div>
              <h3>AI Solutions</h3>
              <p>Custom AI applications, computer vision, NLP, and machine learning systems.</p>
            </div>
            <div className="service-card featured slide-in-up delay-2">
              <div className="service-preview">⚡ Backend</div>
              <h3>Backend Development</h3>
              <p>Scalable APIs, database design, cloud integration, and server architecture.</p>
            </div>
            <div className="service-card slide-in-right delay-3">
              <div className="service-preview">🌐 Full Stack</div>
              <h3>Full-Stack Apps</h3>
              <p>Complete web applications with modern frameworks and responsive design.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}