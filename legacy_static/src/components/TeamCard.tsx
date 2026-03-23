interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export default function TeamCard({ name, role, bio, avatar }: TeamCardProps) {
  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem 1.5rem',
        gap: '0.75rem',
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'var(--dark-700, #333)',
          flexShrink: 0,
          marginBottom: '0.25rem',
        }}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            width={96}
            height={96}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'var(--light-300)',
            }}
            aria-hidden="true"
          >
            {name.charAt(0)}
          </div>
        )}
      </div>

      <h3
        style={{
          margin: 0,
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: '#fff',
        }}
      >
        {name}
      </h3>

      <p
        style={{
          margin: 0,
          color: 'var(--accent)',
          fontWeight: 600,
          fontSize: '0.85rem',
          fontFamily: 'var(--font-body)',
        }}
      >
        {role}
      </p>

      <p
        style={{
          margin: 0,
          color: 'var(--light-300, #999)',
          fontSize: '0.85rem',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.6,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {bio}
      </p>
    </div>
  );
}
