import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import PillarGrid from '@/components/PillarGrid';
import ServiceGrid from '@/components/ServiceGrid';
import TestimonialSection from '@/components/TestimonialSection';
import StatsRow from '@/components/StatsRow';
import HowItWorks from '@/components/HowItWorks';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import RecentPosts from '@/components/RecentPosts';
import { homeData } from '@/data/home';

type Locale = 'id' | 'en';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: (params?.locale as Locale) || 'id' },
});

export default function HomePage({ locale }: { locale: Locale }) {
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
      <ProblemSection hook={d.problem.hook} pains={[...d.problem.pains]} bridge={d.problem.bridge} />
      <PillarGrid title={d.pillars.title} items={[...d.pillars.items]} />
      <ServiceGrid title={d.services.title} subtitle={d.services.subtitle} items={[...d.services.items]} />
      <TestimonialSection title={d.testimonials.title} items={[...d.testimonials.items]} />
      <StatsRow items={[...d.stats]} />
      <HowItWorks title={d.howItWorks.title} steps={[...d.howItWorks.steps]} />
      <FAQSection title={d.faq.title} items={[...d.faq.items]} />
      <RecentPosts locale={locale} />
      <CTASection title={d.cta.title} description={d.cta.description} button={{ ...d.cta.button }} />
    </Layout>
  );
}
