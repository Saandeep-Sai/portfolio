"use client";
import { useState } from "react";

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
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const hasLiveUrl = project.liveUrl && project.liveUrl !== "#" && project.liveUrl !== "";
  const hasGithubUrl = project.githubUrl && project.githubUrl !== "#" && project.githubUrl !== "";

  return (
    <div className="project-card">
      <div
        className="card-inner"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "none" }}
      >
        {/* FRONT — Image + Title + Links */}
        <div className="card-front">
          {project.image ? (
            <img src={project.image} alt={project.title} />
          ) : (
            <div style={{
              width: '100%',
              height: '200px',
              background: 'linear-gradient(135deg, var(--accent), #6c5ce7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
            }}>
              🚀
            </div>
          )}
          <div className="card-content">
            <h3>{project.title}</h3>
            <p className="project-type">{project.type || project.category}</p>

            {/* Action buttons on front */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '0.6rem',
              flexWrap: 'nowrap',
              alignItems: 'center',
            }}>
              {hasLiveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="card-action-btn"
                >
                  🔗 Live Demo
                </a>
              )}
              {hasGithubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="card-action-btn"
                >
                  💻 GitHub
                </a>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
                className="card-action-btn"
              >
                📖 Description
              </button>
            </div>
          </div>
        </div>

        {/* BACK — Description + Tech Stack */}
        <div className="card-back">
          <div className="card-back-content">
            <h3>{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="technologies-stack">
              {project.technologies?.map((tech: string, index: number) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              style={{
                marginTop: '0.8rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.4)',
                cursor: 'pointer',
                padding: '6px 18px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 600,
                backdropFilter: 'blur(4px)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              }}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}