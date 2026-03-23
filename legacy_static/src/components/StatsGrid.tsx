interface StatsGridProps {
  stats: Array<{ value: string; label: string }>;
  dark?: boolean;
}

export default function StatsGrid({ stats, dark = true }: StatsGridProps) {
  return (
    <div className="grid-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{
            textAlign: 'center',
            padding: '1rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: '2rem',
              lineHeight: 1.2,
              color: dark ? '#fff' : 'var(--dark-900)',
              marginBottom: '0.35rem',
            }}
          >
            {stat.value}
          </div>
          <div
            style={{
              fontSize: '0.85rem',
              fontFamily: 'var(--font-body)',
              color: dark
                ? 'var(--light-300, rgba(255,255,255,0.65))'
                : 'var(--dark-500)',
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
