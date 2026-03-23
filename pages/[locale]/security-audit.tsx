import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import FeatureGrid from '@/components/FeatureGrid';
import HowItWorks from '@/components/HowItWorks';
import PricingTable from '@/components/PricingTable';
import FAQSection from '@/components/FAQSection';
import StatsRow from '@/components/StatsRow';
import CTASection from '@/components/CTASection';
import { servicesData } from '@/data/services-data';

type Locale = 'id' | 'en';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: (params?.locale as Locale) || 'id' },
});

export default function SecurityAudit({ locale }: { locale: Locale }) {
  const d = servicesData['security-audit'][locale];
  return (
    <Layout title={d.meta.title} description={d.meta.description}>
      <HeroSection eyebrow={d.hero.eyebrow} title={d.hero.title} description={d.hero.description} buttons={d.hero.buttons} dark />
      <ProblemSection hook={d.problem.hook} pains={d.problem.pains} bridge={d.problem.bridge} />
      <FeatureGrid items={d.features} />
      <HowItWorks title={d.howItWorks.title} steps={d.howItWorks.steps} />
      <PricingTable tiers={d.pricing} />
      <FAQSection title={d.faq.title} items={d.faq.items} />
      <StatsRow items={d.stats} />
      <CTASection title={d.cta.title} description={d.cta.description} button={d.cta.button} />
    </Layout>
  );
}
