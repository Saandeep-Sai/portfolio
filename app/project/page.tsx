"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useScrollAnimation } from "../components/useScrollAnimation";
import { text } from "stream/consumers";

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

export default function Project() {
  useScrollAnimation();

  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        throw new Error("API response not ok");
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = (
    filter === "all"
      ? projects
      : projects.filter((project) => {
          if (filter === "ai") {
            return project.category.toLowerCase().includes("ai");
          }
          if (filter === "fullstack") {
            return (
              project.category.toLowerCase().includes("full stack") ||
              project.category.toLowerCase().includes("fullstack")
            );
          }
          if (filter === "python") {
            return (
              project.category.toLowerCase().includes("python") ||
              project.category.toLowerCase().includes("data science")
            );
          }
          if (filter === "cloud") {
            return project.category.toLowerCase().includes("cloud");
          }
          return project.category === filter;
        })
  ).sort((a, b) => {
    // Projects with live demo come first
    const aHasLiveDemo = a.liveUrl && a.liveUrl !== "#" && a.liveUrl !== "";
    const bHasLiveDemo = b.liveUrl && b.liveUrl !== "#" && b.liveUrl !== "";

    if (aHasLiveDemo && !bHasLiveDemo) return -1;
    if (!aHasLiveDemo && bHasLiveDemo) return 1;
    return 0;
  });

  return (
    <main className="fade-in projects-page">
      <Navbar />
      <section className="projects-hero">
        <div className="container">
          <h1>My Projects</h1>
          <p>Explore my AI and backend development projects</p>

          <div className="project-filters">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Projects
            </button>
            <button
              className={`filter-btn ${filter === "ai" ? "active" : ""}`}
              onClick={() => setFilter("ai")}
            >
              AI Projects
            </button>
            <button
              className={`filter-btn ${filter === "fullstack" ? "active" : ""}`}
              onClick={() => setFilter("fullstack")}
            >
              Web Apps
            </button>
            <button
              className={`filter-btn ${filter === "python" ? "active" : ""}`}
              onClick={() => setFilter("python")}
            >
              Python
            </button>
            <button
              className={`filter-btn ${filter === "cloud" ? "active" : ""}`}
              onClick={() => setFilter("cloud")}
            >
              Cloud
            </button>
          </div>
        </div>
      </section>

      <section className="projects-grid-section">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card">
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
                      <p className="project-description">
                        {project.description}
                      </p>
                      <div className="technologies-stack">
                        {project.technologies?.map(
                          (tech: string, index: number) => (
                            <span key={index} className="tech-tag">
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                      <div className="project-links">
                        {project.liveUrl &&
                          project.liveUrl !== "#" &&
                          project.liveUrl !== "" && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-primary "
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
