"use client";

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
  return (
    <div className="project-card">
      <div className="card-inner">
        <div className="card-front">
          <img src={project.image} alt={project.title} />
          <div className="card-content">
            <h3>{project.title}</h3>
            <p className="project-type">{project.type}</p>
          </div>
        </div>
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
            <div className="project-links">
              {project.liveUrl &&
                project.liveUrl !== "#" &&
                project.liveUrl !== "" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    Live Demo
                  </a>
                )}
              {project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  className="btn btn-sm btn-secondary"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}