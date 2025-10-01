'use client';
import { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'page_view',
            page: window.location.pathname,
            sessionId: getSessionId()
          })
        });
      } catch (error) {
        console.error('Analytics tracking failed:', error);
      }
    };

    // Track project clicks
    const trackProjectClick = (projectId: string) => {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'project_click',
          projectId,
          sessionId: getSessionId()
        })
      }).catch(console.error);
    };

    // Generate or get session ID
    const getSessionId = () => {
      let sessionId = sessionStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('sessionId', sessionId);
      }
      return sessionId;
    };

    // Track page view on mount
    trackPageView();

    // Add click listeners to project links
    const projectLinks = document.querySelectorAll('[data-project-id]');
    projectLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const projectId = (e.currentTarget as HTMLElement).getAttribute('data-project-id');
        if (projectId) trackProjectClick(projectId);
      });
    });

    // Cleanup
    return () => {
      projectLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);

  return null;
};

export default Analytics;