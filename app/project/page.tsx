"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import { useScrollAnimation } from "../components/useScrollAnimation";
import { API_BASE } from "../lib/api";

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
      const response = await fetch(`${API_BASE}/api/projects`);
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
              project.category.toLowerCase().includes("fullstack") ||
              project.category.toLowerCase().includes("web")
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
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
