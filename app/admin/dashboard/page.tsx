'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ pageViews: 0, contactForms: 0, projectClicks: 0 });
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const [analyticsRes, projectsRes] = await Promise.all([
        fetch('http://localhost:5000/api/analytics/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/projects', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setStats(analyticsData);
      }

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin');
  };

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

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
        <h1 style={{ color: 'var(--text-primary)', margin: 0 }}>Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => router.push('/admin/projects')}
            style={{
              padding: '8px 16px',
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Manage Projects
          </button>
          <button
            onClick={logout}
            style={{
              padding: '8px 16px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ padding: '2rem' }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'var(--card-bg)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: 'var(--accent)', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
              {stats.pageViews}
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Page Views</p>
          </div>
          <div style={{
            background: 'var(--card-bg)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: 'var(--accent)', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
              {stats.contactForms}
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Contact Forms</p>
          </div>
          <div style={{
            background: 'var(--card-bg)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: 'var(--accent)', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
              {stats.projectClicks}
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Project Clicks</p>
          </div>
          <div style={{
            background: 'var(--card-bg)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: 'var(--accent)', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
              {projects.length}
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Total Projects</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: 'var(--card-bg)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => router.push('/admin/projects')}
              style={{
                padding: '12px 24px',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              📝 Manage Projects
            </button>
            <button
              onClick={() => router.push('/admin/achievements')}
              style={{
                padding: '12px 24px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              🏆 Manage Achievements
            </button>
            <button
              onClick={() => router.push('/admin/analytics')}
              style={{
                padding: '12px 24px',
                background: '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              📊 View Analytics
            </button>
          </div>
        </div>

        {/* Recent Projects */}
        <div style={{
          background: 'var(--card-bg)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Recent Projects</h2>
          {projects.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No projects found. Create your first project!</p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {projects.slice(0, 5).map((project: any) => (
                <div
                  key={project.id}
                  style={{
                    padding: '1rem',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0' }}>
                      {project.title}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
                      {project.category}
                    </p>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    background: project.featured ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: project.featured ? 'white' : 'var(--text-secondary)',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>
                    {project.featured ? 'Featured' : 'Regular'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}