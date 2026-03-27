/**
 * A/B Test Monitor Dashboard
 * 
 * View real-time analytics from landing page tests
 * Access: /id/ab-test-monitor or /en/ab-test-monitor
 */

import React, { useEffect, useState } from 'react';

type Locale = 'id' | 'en';

interface AnalyticsEvent {
  timestamp: string;
  event: string;
  lpVariant?: number;
  locale?: string;
  [key: string]: any;
}

interface EventStats {
  lpViewed: number;
  ctaClicked: number;
  timeSpent: {
    total: number;
    average: number;
  };
  ctr: number; // clicks / views
}

// Use dynamic rendering instead of static generation to avoid build issues
// export const getStaticPaths: GetStaticPaths = async () => ({...});
// export const getStaticProps: GetStaticProps = async ({...});

type Props = {
  locale?: Locale;
};

export default function ABTestMonitor({ locale = 'id' }: Props) {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [stats, setStats] = useState<Record<number, EventStats>>({});
  const [lastUpdate, setLastUpdate] = useState<string>('');

  // Load events from localStorage and calculate stats
  const loadAnalytics = () => {
    if (typeof window === 'undefined') return;

    try {
      const storedEvents = JSON.parse(window.localStorage.getItem('berkahkarya_events') || '[]');
      setEvents(storedEvents);

      // Calculate stats per LP variant
      const variantStats: Record<number, EventStats> = {};
      for (let i = 1; i <= 6; i++) {
        variantStats[i] = {
          lpViewed: 0,
          ctaClicked: 0,
          timeSpent: { total: 0, average: 0 },
          ctr: 0,
        };
      }

      storedEvents.forEach((event: AnalyticsEvent) => {
        if (!event.lpVariant) return;
        const v = event.lpVariant;

        if (event.event === 'lpViewed') {
          variantStats[v].lpViewed += 1;
        } else if (event.event === 'ctaClicked') {
          variantStats[v].ctaClicked += 1;
        } else if (event.event === 'lpTimeSpent') {
          variantStats[v].timeSpent.total += event.timeSpent || 0;
        }
      });

      // Calculate CTR and average time spent
      Object.keys(variantStats).forEach((key) => {
        const v = parseInt(key);
        const stat = variantStats[v];
        stat.ctr = stat.lpViewed > 0 ? (stat.ctaClicked / stat.lpViewed) * 100 : 0;
        stat.timeSpent.average = stat.lpViewed > 0 ? stat.timeSpent.total / stat.lpViewed : 0;
      });

      setStats(variantStats);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Failed to load analytics', error);
    }
  };

  useEffect(() => {
    loadAnalytics();
    const interval = setInterval(loadAnalytics, 3000); // Refresh every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const totalViews = Object.values(stats).reduce((sum, s) => sum + s.lpViewed, 0);
  const totalClicks = Object.values(stats).reduce((sum, s) => sum + s.ctaClicked, 0);
  const overallCtr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : '0.00';

  const lpNames = {
    1: 'Konten Ini Bikin Laku',
    2: 'Serius Sesimpel Ini?',
    3: 'Masih Edit Manual?',
    4: 'Tinggal Upload Doang',
    5: 'Ini Cara Baru',
    6: 'Hasil Nyata Seller',
  };

  return (
    <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)',
        color: '#fff',
        padding: '40px 20px',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
              📊 A/B Test Monitor
            </h1>
            <p style={{ color: '#888', marginBottom: '16px' }}>
              Real-time analytics for AI Video Studio landing pages
            </p>
            <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#aaa' }}>
              <span>Last update: {lastUpdate}</span>
              <span>|</span>
              <span>Total events tracked: {events.length}</span>
            </div>
          </div>

          {/* Overall Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}>
            <StatCard label="Total Views" value={totalViews} color="#3b82f6" />
            <StatCard label="Total Clicks" value={totalClicks} color="#10b981" />
            <StatCard label="Overall CTR" value={`${overallCtr}%`} color="#f59e0b" />
            <StatCard label="Raw Events" value={events.length} color="#8b5cf6" />
          </div>

          {/* Per-Variant Stats */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              📈 Performance by Variant
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}>
              {[1, 2, 3, 4, 5, 6].map((variant) => {
                const s = stats[variant];
                if (!s) return null;

                return (
                  <div key={variant} style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '20px',
                    backdropFilter: 'blur(10px)',
                  }}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                        LP{variant}: {lpNames[variant as keyof typeof lpNames]}
                      </div>
                      <a 
                        href={`/id/ai-video-studio?lp=${variant}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '12px',
                          color: '#3b82f6',
                          textDecoration: 'none',
                        }}
                      >
                        View page →
                      </a>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Views</div>
                        <div style={{ fontSize: '24px', fontWeight: '700' }}>{s.lpViewed}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Clicks</div>
                        <div style={{ fontSize: '24px', fontWeight: '700' }}>{s.ctaClicked}</div>
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '12px',
                      marginBottom: '16px',
                    }}>
                      <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Click-Through Rate</div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#10b981' }}>
                        {s.ctr.toFixed(2)}%
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', color: '#aaa' }}>
                      Avg time: {s.timeSpent.average.toFixed(1)}s
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Raw Events Log */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              📋 Recent Events
            </h2>
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '12px',
              padding: '20px',
              overflowX: 'auto',
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '13px',
              }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#aaa' }}>Timestamp</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#aaa' }}>Event</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#aaa' }}>LP Variant</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#aaa' }}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {events.slice().reverse().slice(0, 20).map((event, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px', color: '#aaa' }}>
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </td>
                      <td style={{ padding: '12px', fontWeight: '600' }}>
                        {event.event === 'lpViewed' && '👁️ Viewed'}
                        {event.event === 'ctaClicked' && '🔗 CTA Clicked'}
                        {event.event === 'lpTimeSpent' && '⏱️ Time Spent'}
                      </td>
                      <td style={{ padding: '12px' }}>
                        {event.lpVariant ? `LP${event.lpVariant}` : '-'}
                      </td>
                      <td style={{ padding: '12px', color: '#888', fontSize: '12px' }}>
                        {event.event === 'lpTimeSpent' && `${event.timeSpent}s`}
                        {event.event === 'lpViewed' && `${event.locale || 'id'}`}
                        {event.event === 'ctaClicked' && event.lpName && `${event.lpName}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Debug Info */}
          <div style={{ marginTop: '40px', padding: '16px', background: 'rgba(59,130,246,0.1)', borderRadius: '8px', fontSize: '12px', color: '#888' }}>
            💡 <strong>Debug tip:</strong> Open browser DevTools → Application → Local Storage → filter for "berkahkarya_events" to see raw event data
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper component for stat cards
 */
function StatCard({ label, value, color }: { label: string; value: any; color: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      border: `1px solid ${color}33`,
      borderRadius: '12px',
      padding: '20px',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ color: '#aaa', fontSize: '12px', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: '28px', fontWeight: '700', color }}>{value}</div>
    </div>
  );
}
