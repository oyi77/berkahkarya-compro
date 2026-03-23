import Image from 'next/image';
import styles from './TeamCard.module.css';

interface Member { name: string; role: string; desc: string; avatar: string }

function MemberAvatar({ avatar, name }: { avatar: string; name: string }) {
  if (avatar && avatar.startsWith('/')) {
    return (
      <div className={styles.avatarImg}>
        <Image src={avatar} alt={name} width={120} height={120} className={styles.photo} />
      </div>
    );
  }
  // Fallback: generate initials
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return <div className={styles.avatarFallback}>{initials}</div>;
}

export default function TeamGrid({ members }: { members: Member[] }) {
  return (
    <section className="light-bg">
      <div className={styles.container}>
        <div className={styles.grid}>
          {members.map((m) => (
            <div key={m.name} className={`card-light ${styles.card}`}>
              <MemberAvatar avatar={m.avatar} name={m.name} />
              <h3 className={styles.name}>{m.name}</h3>
              <span className={styles.role}>{m.role}</span>
              <p className={styles.desc}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
