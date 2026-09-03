'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

// Corner positions the avatar roams between
const CORNERS = [
  { name: 'bottom-right', style: { bottom: '24px', right: '24px', top: 'auto', left: 'auto' } },
  { name: 'bottom-left',  style: { bottom: '24px', left: '24px',  top: 'auto', right: 'auto' } },
  { name: 'top-left',     style: { top: '90px',  left: '24px',  bottom: 'auto', right: 'auto' } },
  { name: 'top-right',    style: { top: '90px',  right: '24px', bottom: 'auto', left: 'auto' } },
];

// Bubble alignment per corner
const BUBBLE_POSITION: Record<string, React.CSSProperties> = {
  'bottom-right': { bottom: '100%', right: '0', marginBottom: '12px', borderRadius: '16px 16px 4px 16px' },
  'bottom-left':  { bottom: '100%', left: '0',  marginBottom: '12px', borderRadius: '16px 16px 16px 4px' },
  'top-right':    { top: '100%',    right: '0',  marginTop: '12px',   borderRadius: '4px 16px 16px 16px' },
  'top-left':     { top: '100%',    left: '0',   marginTop: '12px',   borderRadius: '16px 4px 16px 16px' },
};

// Section messages
const SECTION_MESSAGES: Record<string, { emoji: string; text: string }> = {
  hero:        { emoji: '👋', text: "Hey! I'm Saandeep's companion. Scroll down to explore my work!" },
  services:    { emoji: '⚡', text: "These are the core services — AI systems, web apps, and backend APIs." },
  experience:  { emoji: '🏆', text: "3 national hackathon wins! Check out these achievements." },
  cta:         { emoji: '🤝', text: "Looking for a developer? Saandeep is open for exciting projects!" },
  portfolio:   { emoji: '🚀', text: "Project showcase! Hover over any card to see the tech stack." },
  testimonials:{ emoji: '💬', text: "Real feedback from real clients. Quality speaks for itself." },
  contact_cta: { emoji: '📬', text: "Got an idea? Don't hesitate — let's build something amazing." },
  skills:      { emoji: '🧠', text: "Skill breakdown — Python & AI at 95%! That's the strong suit." },
  stats:       { emoji: '📊', text: "These numbers come from real GitHub data and project stats." },
  blog:        { emoji: '📝', text: "Latest articles on AI, backend, and software engineering." },
  contact:     { emoji: '✉️', text: "Drop a message here. Usually responds within 24 hours!" },
  footer:      { emoji: '🙌', text: "Thanks for visiting! Connect on LinkedIn or GitHub." },
  default:     { emoji: '😊', text: "Hi! I'm your guide. Scroll around and I'll tell you about each section!" },
};

export default function CompanionBot() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [cornerIndex, setCornerIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const bubbleTimer = useRef<NodeJS.Timeout>();
  const moveTimer = useRef<NodeJS.Timeout>();

  // Move to next corner periodically
  useEffect(() => {
    const roam = () => {
      setIsMoving(true);
      setShowBubble(false);

      // After a short delay (for exit animation), change position
      setTimeout(() => {
        setCornerIndex((prev) => (prev + 1) % CORNERS.length);
        // After arriving, stop moving and show bubble
        setTimeout(() => {
          setIsMoving(false);
          setShowBubble(true);
        }, 100);
      }, 400);
    };

    moveTimer.current = setInterval(roam, 12000); // Move every 12 seconds
    return () => {
      if (moveTimer.current) clearInterval(moveTimer.current);
    };
  }, []);

  // Detect which section is in view
  useEffect(() => {
    const sectionMap = [
      { selector: '.services', name: 'services' },
      { selector: '.experience', name: 'experience' },
      { selector: '.cta-section', name: 'cta' },
      { selector: '.portfolio', name: 'portfolio' },
      { selector: '.testimonials', name: 'testimonials' },
      { selector: '.contact-cta', name: 'contact_cta' },
      { selector: '.skills-section', name: 'skills' },
      { selector: '.stats-section', name: 'stats' },
      { selector: '.blog-section', name: 'blog' },
      { selector: '#contact', name: 'contact' },
      { selector: 'footer', name: 'footer' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sectionMap.find((s) => entry.target.matches(s.selector));
            if (match && match.name !== currentSection) {
              setCurrentSection(match.name);
              setShowBubble(true);
              if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
              bubbleTimer.current = setTimeout(() => setShowBubble(false), 5000);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const timer = setTimeout(() => {
      sectionMap.forEach(({ selector }) => {
        const el = document.querySelector(selector);
        if (el) observer.observe(el);
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    };
  }, [currentSection]);

  // Auto-hide bubble after 5s
  useEffect(() => {
    if (showBubble) {
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      bubbleTimer.current = setTimeout(() => setShowBubble(false), 5000);
    }
    return () => { if (bubbleTimer.current) clearTimeout(bubbleTimer.current); };
  }, [showBubble, currentSection]);

  const handleAvatarClick = useCallback(() => {
    setShowBubble(true);
    if (isMinimized) setIsMinimized(false);
  }, [isMinimized]);

  const corner = CORNERS[cornerIndex];
  const message = SECTION_MESSAGES[currentSection] || SECTION_MESSAGES.default;
  const bubbleStyle = BUBBLE_POSITION[corner.name];

  // Hidden state — just a small floating button
  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        title="Show companion"
        aria-label="Show companion"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9998,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6c5ce7, #ff6b35)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.2rem',
          boxShadow: '0 4px 15px rgba(108,92,231,0.4)',
          animation: 'companion-pulse 2s ease-in-out infinite',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        😊
      </button>
    );
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          ...corner.style,
          zIndex: 9998,
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          opacity: isMoving ? 0 : 1,
          transform: isMoving ? 'scale(0.5)' : 'scale(1)',
        }}
      >
        {/* Speech Bubble */}
        {showBubble && !isMinimized && (
          <div
            style={{
              position: 'absolute',
              ...bubbleStyle,
              maxWidth: '260px',
              minWidth: '180px',
              padding: '12px 16px',
              background: 'rgba(15, 15, 35, 0.93)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              color: '#f0f0f0',
              fontSize: '0.82rem',
              lineHeight: 1.55,
              boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(108,92,231,0.2)',
              animation: 'companion-bubble-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 10,
            }}
          >
            <span style={{ marginRight: '5px', fontSize: '1rem' }}>{message.emoji}</span>
            {message.text}
            {/* Close bubble button */}
            <button
              onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
              style={{
                position: 'absolute',
                top: '4px',
                right: '6px',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                fontSize: '0.65rem',
                padding: '2px 4px',
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Avatar Container */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {/* Avatar Image */}
          <div
            onClick={handleAvatarClick}
            style={{
              width: isMinimized ? '50px' : '80px',
              height: isMinimized ? '50px' : '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '3px solid rgba(108, 92, 231, 0.5)',
              boxShadow: '0 4px 20px rgba(108,92,231,0.3), 0 0 30px rgba(255,107,53,0.1)',
              animation: 'companion-float 3s ease-in-out infinite',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.borderColor = '#ff6b35';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(108, 92, 231, 0.5)';
            }}
          >
            <img
              src="/images/companion.png"
              alt="Companion"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Control buttons — appear on hover */}
          <div
            className="companion-controls"
            style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              opacity: 0,
              transition: 'opacity 0.2s',
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
              title={isMinimized ? 'Expand' : 'Minimize'}
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(108,92,231,0.9)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.55rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              {isMinimized ? '↗' : '↙'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
              title="Hide companion"
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(220,53,69,0.9)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.55rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes companion-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes companion-bubble-in {
          from { opacity: 0; transform: scale(0.85) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes companion-pulse {
          0%, 100% { box-shadow: 0 4px 15px rgba(108,92,231,0.4); }
          50% { box-shadow: 0 4px 25px rgba(108,92,231,0.7), 0 0 15px rgba(255,107,53,0.3); }
        }
        /* Show controls on hover */
        div:has(> .companion-controls):hover .companion-controls {
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
}
