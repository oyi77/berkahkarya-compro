import type { Locale } from "./navigation";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export const team: Record<Locale, TeamMember[]> = {
  id: [
    {
      name: "Andi Wijaya",
      role: "Founder & CEO",
      bio: "Pemimpin visioner dengan pengalaman 12 tahun di industri teknologi dan AI. Mendirikan BerkahKarya dengan misi memberdayakan bisnis Indonesia melalui ekosistem kecerdasan buatan yang terjangkau.",
      avatar: "/images/team/member-1.jpg",
      socials: {
        twitter: "https://twitter.com/andiwijaya",
        linkedin: "https://linkedin.com/in/andiwijaya",
      },
    },
    {
      name: "Sari Rahmawati",
      role: "CTO",
      bio: "Full-stack engineer dan spesialis AI dengan keahlian di cloud architecture dan machine learning. Memimpin pengembangan infrastruktur teknis yang mendukung seluruh produk BerkahKarya.",
      avatar: "/images/team/member-2.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/sarirahmawati",
        github: "https://github.com/sarirahmawati",
      },
    },
    {
      name: "Budi Santoso",
      role: "Head of AI",
      bio: "Pakar machine learning dengan publikasi riset di bidang NLP dan computer vision. Bertanggung jawab atas pengembangan model AI yang menjadi inti dari setiap produk BerkahKarya.",
      avatar: "/images/team/member-3.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/budisantoso",
        github: "https://github.com/budisantoso",
      },
    },
    {
      name: "Dewi Kusuma",
      role: "Creative Director",
      bio: "Ahli strategi brand dan konten dengan portfolio klien dari startup hingga korporat multinasional. Mengarahkan identitas visual dan storytelling BerkahKarya agar selalu relevan.",
      avatar: "/images/team/member-4.jpg",
      socials: {
        twitter: "https://twitter.com/dewikusuma",
        linkedin: "https://linkedin.com/in/dewikusuma",
      },
    },
    {
      name: "Rizky Pratama",
      role: "Lead Developer",
      bio: "Arsitek frontend dan backend dengan obsesi terhadap performa dan pengalaman pengguna. Membangun sistem yang melayani ribuan pengguna setiap hari tanpa hambatan.",
      avatar: "/images/team/member-5.jpg",
      socials: {
        github: "https://github.com/rizkypratama",
        linkedin: "https://linkedin.com/in/rizkypratama",
      },
    },
    {
      name: "Maya Putri",
      role: "Head of Marketing",
      bio: "Growth hacker dengan rekam jejak meningkatkan revenue 5x di beberapa startup teknologi Indonesia. Merancang strategi akuisisi dan retensi pengguna BerkahKarya.",
      avatar: "/images/team/member-6.jpg",
      socials: {
        twitter: "https://twitter.com/mayaputri",
        linkedin: "https://linkedin.com/in/mayaputri",
      },
    },
  ],
  en: [
    {
      name: "Andi Wijaya",
      role: "Founder & CEO",
      bio: "A visionary leader with 12 years of experience in the tech and AI industry. Founded BerkahKarya with the mission of empowering Indonesian businesses through an affordable AI ecosystem.",
      avatar: "/images/team/member-1.jpg",
      socials: {
        twitter: "https://twitter.com/andiwijaya",
        linkedin: "https://linkedin.com/in/andiwijaya",
      },
    },
    {
      name: "Sari Rahmawati",
      role: "CTO",
      bio: "A full-stack engineer and AI specialist with expertise in cloud architecture and machine learning. Leads the technical infrastructure powering all BerkahKarya products.",
      avatar: "/images/team/member-2.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/sarirahmawati",
        github: "https://github.com/sarirahmawati",
      },
    },
    {
      name: "Budi Santoso",
      role: "Head of AI",
      bio: "A machine learning expert with published research in NLP and computer vision. Responsible for developing the AI models at the core of every BerkahKarya product.",
      avatar: "/images/team/member-3.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/budisantoso",
        github: "https://github.com/budisantoso",
      },
    },
    {
      name: "Dewi Kusuma",
      role: "Creative Director",
      bio: "A brand and content strategist with a client portfolio spanning startups to multinational corporations. Directs BerkahKarya's visual identity and storytelling to stay ever-relevant.",
      avatar: "/images/team/member-4.jpg",
      socials: {
        twitter: "https://twitter.com/dewikusuma",
        linkedin: "https://linkedin.com/in/dewikusuma",
      },
    },
    {
      name: "Rizky Pratama",
      role: "Lead Developer",
      bio: "A frontend and backend architect obsessed with performance and user experience. Builds systems that serve thousands of users daily without friction.",
      avatar: "/images/team/member-5.jpg",
      socials: {
        github: "https://github.com/rizkypratama",
        linkedin: "https://linkedin.com/in/rizkypratama",
      },
    },
    {
      name: "Maya Putri",
      role: "Head of Marketing",
      bio: "A growth hacker with a track record of 5x revenue increases at several Indonesian tech startups. Designs BerkahKarya's user acquisition and retention strategies.",
      avatar: "/images/team/member-6.jpg",
      socials: {
        twitter: "https://twitter.com/mayaputri",
        linkedin: "https://linkedin.com/in/mayaputri",
      },
    },
  ],
} as const satisfies Record<Locale, TeamMember[]>;
