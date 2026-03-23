import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import PillarGrid from '@/components/PillarGrid';
import ServiceGrid from '@/components/ServiceGrid';
import StatsRow from '@/components/StatsRow';
import CTASection from '@/components/CTASection';
import { homeData } from '@/data/home';

type Locale = 'id' | 'en';

interface Props {
  locale: Locale;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const locale = (params?.locale as Locale) || 'id';
  return { props: { locale } };
};

export default function HomePage({ locale }: Props) {
  const d = homeData[locale];

  return (
    <Layout title={d.meta.title} description={d.meta.description}>
      <HeroSection
        eyebrow={d.hero.eyebrow}
        title={d.hero.title}
        description={d.hero.description}
        buttons={[...d.hero.buttons]}
        dark
        character={{ src: '/characters/vilona.jpg', alt: 'Vilona — AI General Manager' }}
      />
      <PillarGrid title={d.pillars.title} items={[...d.pillars.items]} />
      <ServiceGrid title={d.services.title} subtitle={d.services.subtitle} items={[...d.services.items]} />
      <StatsRow items={[...d.stats]} />
      <CTASection title={d.cta.title} description={d.cta.description} button={{ ...d.cta.button }} />
    </Layout>
  );
}
