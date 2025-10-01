'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AnalyticsAdmin() {
  const [analytics, setAnalytics] = useState({
    pageViews: 0,
    contactForms: 0,
    projectClicks: 0,
    data: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchAnalytics();
  }, [router]);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/analytics/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading analytics...</div>;
  }

  const recentActivity = analytics.data.slice(0, 20);

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
          <h1 style={{ color: 'var(--text-primary)', margin: '0.5rem 0 0 0' }}>Analytics Dashboard</h1>
        </div>
        <button
          onClick={fetchAnalytics}
          style={{
            padding: '8px 16px',
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          🔄 Refresh
        </button>
      </header>

      <div style={{ padding: '2rem' }}>
        {/* Stats Overview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'var(--card-bg)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>
              📊
            </div>
            <h3 style={{ color: 'var(--accent)', fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>
              {analytics.pageViews}
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Total Page Views</p>
          </div>
          <div style={{
            background: 'var(--card-bg)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', color: '#28a745', marginBottom: '0.5rem' }}>
              📧
            </div>
            <h3 style={{ color: '#28a745', fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>
              {analytics.contactForms}
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Contact Forms</p>
          </div>
          <div style={{
            background: 'var(--card-bg)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', color: '#17a2b8', marginBottom: '0.5rem' }}>
              🖱️
            </div>
            <h3 style={{ color: '#17a2b8', fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>
              {analytics.projectClicks}
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Project Clicks</p>
          </div>
          <div style={{
            background: 'var(--card-bg)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', color: '#ffc107', marginBottom: '0.5rem' }}>
              📈
            </div>
            <h3 style={{ color: '#ffc107', fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>
              {analytics.data.length}
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Total Events</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ color: 'var(--text-primary)', margin: 0 }}>Recent Activity</h2>
          </div>
          {recentActivity.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No activity data available
            </div>
          ) : (
            <div style={{ maxHeight: '600px', overflow: 'auto' }}>
              {recentActivity.map((activity: any, index: number) => (
                <div
                  key={index}
                  style={{
                    padding: '1rem 1.5rem',
                    borderBottom: index < recentActivity.length - 1 ? '1px solid var(--border)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: activity.type === 'page_view' ? 'var(--accent)' : 
                               activity.type === 'contact_form' ? '#28a745' : '#17a2b8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>
                    {activity.type === 'page_view' ? '👁️' : 
                     activity.type === 'contact_form' ? '📧' : '🖱️'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                      <span style={{ 
                        color: 'var(--text-primary)', 
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {activity.type.replace('_', ' ')}
                      </span>
                      {activity.page && (
                        <span style={{
                          padding: '2px 6px',
                          background: 'var(--bg-secondary)',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          color: 'var(--text-secondary)'
                        }}>
                          {activity.page}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {activity.country && `${activity.country} • `}
                      {activity.userAgent && `${activity.userAgent.split(' ')[0]} • `}
                      {new Date(activity.timestamp?.seconds * 1000 || Date.now()).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}