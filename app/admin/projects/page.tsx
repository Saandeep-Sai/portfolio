'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE } from '../../lib/api';

interface GitHubRepo {
  githubId: number;
  name: string;
  description: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  githubUrl: string;
  homepage: string;
  updatedAt: string;
  pushedAt: string;
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<Set<number>>(new Set());
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    technologies: '',
    image: '',
    liveUrl: '',
    githubUrl: '',
    featured: false
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/api/projects`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const fetchGitHubRepos = async () => {
    setIsLoadingRepos(true);
    setImportResult(null);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/api/github/repos/unimported`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setGithubRepos(data);
      } else {
        console.error('Failed to fetch GitHub repos');
      }
    } catch (error) {
      console.error('Failed to fetch GitHub repos:', error);
    } finally {
      setIsLoadingRepos(false);
    }
  };

  const toggleRepoSelection = (githubId: number) => {
    setSelectedRepos(prev => {
      const next = new Set(prev);
      if (next.has(githubId)) {
        next.delete(githubId);
      } else {
        next.add(githubId);
      }
      return next;
    });
  };

  const selectAllRepos = () => {
    if (selectedRepos.size === githubRepos.length) {
      setSelectedRepos(new Set());
    } else {
      setSelectedRepos(new Set(githubRepos.map(r => r.githubId)));
    }
  };

  const importSelectedRepos = async () => {
    if (selectedRepos.size === 0) return;
    setIsImporting(true);

    try {
      const token = localStorage.getItem('adminToken');
      const reposToImport = githubRepos.filter(r => selectedRepos.has(r.githubId));

      const response = await fetch(`${API_BASE}/api/github/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ repos: reposToImport })
      });

      if (response.ok) {
        const result = await response.json();
        setImportResult(result);
        setSelectedRepos(new Set());
        fetchProjects(); // Refresh project list
        // Remove imported repos from the list
        setGithubRepos(prev =>
          prev.filter(r => !reposToImport.some(imported => imported.githubId === r.githubId))
        );
      }
    } catch (error) {
      console.error('Failed to import repos:', error);
      setImportResult({ success: false, error: 'Import failed' });
    } finally {
      setIsImporting(false);
    }
  };

  const openGitHubModal = () => {
    setShowGitHubModal(true);
    fetchGitHubRepos();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be under 10MB');
      return;
    }

    setIsUploadingImage(true);
    try {
      const token = localStorage.getItem('adminToken');
      const uploadData = new FormData();
      uploadData.append('image', file);

      const response = await fetch(`${API_BASE}/api/upload/image`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: uploadData
      });

      if (response.ok) {
        const result = await response.json();
        setFormData(prev => ({ ...prev, image: result.image }));
      } else {
        const err = await response.json();
        alert(err.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Image upload failed');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim())
      };

      const url = editingProject
        ? `${API_BASE}/api/projects/${editingProject.id}`
        : `${API_BASE}/api/projects`;

      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        fetchProjects();
        resetForm();
        alert(editingProject ? 'Project updated!' : 'Project created!');
      }
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Failed to save project');
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: project.technologies?.join(', ') || '',
      image: project.image || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchProjects();
        alert('Project deleted!');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      technologies: '',
      image: '',
      liveUrl: '',
      githubUrl: '',
      featured: false
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      {/* Header */}
      <header style={{
        background: 'var(--card-bg)',
        padding: '1rem 2rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <button
            onClick={() => router.push('/admin/dashboard')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            ← Back to Dashboard
          </button>
          <h1 style={{ color: 'var(--text-primary)', margin: '0.5rem 0 0 0' }}>Manage Projects</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={openGitHubModal}
            style={{
              padding: '10px 20px',
              background: '#24292e',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: 500
            }}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Import from GitHub
          </button>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '10px 20px',
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            + Add Project
          </button>
        </div>
      </header>

      <div style={{ padding: '2rem' }}>
        {/* GitHub Import Modal */}
        {showGitHubModal && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'var(--card-bg)',
              padding: '2rem',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '800px',
              maxHeight: '85vh',
              overflow: 'auto',
              border: '1px solid var(--border)'
            }}>
              {/* Modal Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <h2 style={{ color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>
                    Import from GitHub
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
                    Select repos to add to your portfolio. Already-imported repos are hidden.
                  </p>
                </div>
                <button
                  onClick={() => { setShowGitHubModal(false); setSelectedRepos(new Set()); setImportResult(null); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    lineHeight: 1
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Import Result Banner */}
              {importResult && (
                <div style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  background: importResult.success ? '#d4edda' : '#f8d7da',
                  color: importResult.success ? '#155724' : '#721c24',
                  border: `1px solid ${importResult.success ? '#c3e6cb' : '#f5c6cb'}`
                }}>
                  {importResult.success
                    ? `✅ Successfully imported ${importResult.imported} project(s)${importResult.errors > 0 ? ` (${importResult.errors} failed)` : ''}`
                    : `❌ ${importResult.error || 'Import failed'}`
                  }
                </div>
              )}

              {/* Loading State */}
              {isLoadingRepos && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  <div style={{
                    width: '40px', height: '40px',
                    border: '3px solid var(--border)',
                    borderTop: '3px solid var(--accent)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem'
                  }}></div>
                  Fetching repos from GitHub...
                </div>
              )}

              {/* No Repos State */}
              {!isLoadingRepos && githubRepos.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>🎉 All caught up!</p>
                  <p>All your GitHub repos have already been imported.</p>
                </div>
              )}

              {/* Repo List */}
              {!isLoadingRepos && githubRepos.length > 0 && (
                <>
                  {/* Select All + Import Bar */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '8px'
                  }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedRepos.size === githubRepos.length && githubRepos.length > 0}
                        onChange={selectAllRepos}
                        style={{ width: '16px', height: '16px' }}
                      />
                      Select All ({githubRepos.length} repos)
                    </label>
                    <button
                      onClick={importSelectedRepos}
                      disabled={selectedRepos.size === 0 || isImporting}
                      style={{
                        padding: '8px 20px',
                        background: selectedRepos.size > 0 ? 'var(--accent)' : 'var(--border)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: selectedRepos.size > 0 ? 'pointer' : 'not-allowed',
                        opacity: selectedRepos.size > 0 ? 1 : 0.5,
                        fontSize: '0.9rem',
                        fontWeight: 500
                      }}
                    >
                      {isImporting
                        ? '🧠 Analyzing repos & importing...'
                        : `Import ${selectedRepos.size > 0 ? `(${selectedRepos.size})` : ''}`
                      }
                    </button>
                  </div>

                  {/* Repo Cards */}
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {githubRepos.map((repo) => (
                      <div
                        key={repo.githubId}
                        onClick={() => toggleRepoSelection(repo.githubId)}
                        style={{
                          padding: '1rem 1.25rem',
                          border: `2px solid ${selectedRepos.has(repo.githubId) ? 'var(--accent)' : 'var(--border)'}`,
                          borderRadius: '10px',
                          cursor: 'pointer',
                          background: selectedRepos.has(repo.githubId) ? 'rgba(var(--accent-rgb, 255,107,53), 0.05)' : 'transparent',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <input
                            type="checkbox"
                            checked={selectedRepos.has(repo.githubId)}
                            onChange={() => toggleRepoSelection(repo.githubId)}
                            onClick={e => e.stopPropagation()}
                            style={{ marginTop: '3px', width: '16px', height: '16px', flexShrink: 0 }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                              <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1rem' }}>
                                {repo.name}
                              </h4>
                              {repo.language && (
                                <span style={{
                                  padding: '2px 8px',
                                  background: '#24292e',
                                  color: 'white',
                                  borderRadius: '12px',
                                  fontSize: '0.75rem'
                                }}>
                                  {repo.language}
                                </span>
                              )}
                              <span style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                              }}>
                                ⭐ {repo.stars}
                              </span>
                              {repo.forks > 0 && (
                                <span style={{
                                  color: 'var(--text-secondary)',
                                  fontSize: '0.8rem'
                                }}>
                                  🍴 {repo.forks}
                                </span>
                              )}
                              {repo.homepage && repo.homepage !== '' && repo.homepage !== '#' && (
                                <span style={{
                                  padding: '2px 8px',
                                  background: '#28a745',
                                  color: 'white',
                                  borderRadius: '12px',
                                  fontSize: '0.7rem'
                                }}>
                                  📸 Auto-screenshot
                                </span>
                              )}
                            </div>
                            {repo.description && (
                              <p style={{
                                color: 'var(--text-secondary)',
                                margin: '0 0 0.5rem 0',
                                fontSize: '0.85rem',
                                lineHeight: 1.4
                              }}>
                                {repo.description}
                              </p>
                            )}
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                              {repo.topics?.slice(0, 5).map((topic, idx) => (
                                <span
                                  key={idx}
                                  style={{
                                    padding: '1px 6px',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: '4px',
                                    fontSize: '0.7rem',
                                    color: 'var(--text-secondary)'
                                  }}
                                >
                                  {topic}
                                </span>
                              ))}
                              <span style={{
                                marginLeft: 'auto',
                                fontSize: '0.75rem',
                                color: 'var(--text-secondary)'
                              }}>
                                Updated {formatDate(repo.pushedAt || repo.updatedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Add/Edit Form Modal (unchanged from original) */}
        {showForm && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'var(--card-bg)',
              padding: '2rem',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <input type="text" placeholder="Project Title" value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    required />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <textarea placeholder="Project Description" value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3}
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-primary)', color: 'var(--text-primary)', resize: 'vertical' }}
                    required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <input type="text" placeholder="Category" value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    required />
                  <input type="text" placeholder="Technologies (comma separated)" value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <input type="url" placeholder="Live URL" value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
                  <input type="url" placeholder="GitHub URL" value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    style={{ padding: '10px', border: '1px solid var(--border)', borderRadius: '6px', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Project Image
                  </label>
                  {/* Image Preview */}
                  {formData.image && (
                    <div style={{ marginBottom: '0.75rem', position: 'relative' }}>
                      <img
                        src={formData.image}
                        alt="Preview"
                        style={{
                          width: '100%',
                          maxHeight: '200px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid var(--border)'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          background: 'rgba(220,53,69,0.9)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {/* Upload Button */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <label style={{
                      padding: '10px 20px',
                      background: formData.image ? 'var(--bg-secondary)' : 'var(--accent)',
                      color: formData.image ? 'var(--text-primary)' : 'white',
                      border: formData.image ? '1px solid var(--border)' : 'none',
                      borderRadius: '6px',
                      cursor: isUploadingImage ? 'not-allowed' : 'pointer',
                      opacity: isUploadingImage ? 0.6 : 1,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}>
                      {isUploadingImage ? (
                        <>
                          <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                          Uploading...
                        </>
                      ) : (
                        <>
                          📁 {formData.image ? 'Change Image' : 'Upload Image'}
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {formData.image && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        ✓ Image ready ({Math.round(formData.image.length / 1024)}KB)
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                    <input type="checkbox" checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                    Featured Project
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" style={{ padding: '10px 20px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    {editingProject ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={resetForm} style={{ padding: '10px 20px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>
              All Projects ({projects.length})
            </h2>
          </div>
          {projects.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No projects found. Create your first project or import from GitHub!
            </div>
          ) : (
            <div>
              {projects.map((project: any) => (
                <div
                  key={project.id}
                  style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>{project.title}</h3>
                      {project.featured && (
                        <span style={{ padding: '2px 8px', background: 'var(--accent)', color: 'white', borderRadius: '4px', fontSize: '0.8rem' }}>
                          Featured
                        </span>
                      )}
                      {project.githubId && (
                        <span style={{ padding: '2px 8px', background: '#24292e', color: 'white', borderRadius: '4px', fontSize: '0.75rem' }}>
                          via GitHub
                        </span>
                      )}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0' }}>
                      {project.description}
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ padding: '2px 6px', background: 'var(--bg-secondary)', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {project.category}
                      </span>
                      {project.technologies?.map((tech: string, idx: number) => (
                        <span key={idx} style={{ padding: '2px 6px', background: 'var(--accent)', color: 'white', borderRadius: '4px', fontSize: '0.8rem' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                    <button onClick={() => handleEdit(project)} style={{ padding: '6px 12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(project.id)} style={{ padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}