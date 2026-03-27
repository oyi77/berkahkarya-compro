import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import FeatureGrid from '@/components/FeatureGrid';
import ProvidersGrid from '@/components/ProvidersGrid';
import CodeBlock from '@/components/CodeBlock';
import HowItWorks from '@/components/HowItWorks';
import PricingTable from '@/components/PricingTable';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import { omnirouteData as oneAIData } from '@/data/1ai';
import { characters } from '@/data/characters';

type Locale = 'id' | 'en';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: (params?.locale as Locale) || 'id' },
});

export default function OneAIPage({ locale }: { locale: Locale }) {
  const d = oneAIData[locale];
  return (
    <Layout title={d.meta.title} description={d.meta.description}>
      <HeroSection eyebrow={d.hero.eyebrow} title={d.hero.title} description={d.hero.description} buttons={[...d.hero.buttons]} dark character={{ src: '/characters/vilona-side.jpg', alt: 'Vilona — API Architect' }} />
      <ProblemSection hook={d.problem.hook} pains={[...d.problem.pains]} bridge={d.problem.bridge} />
      <FeatureGrid items={[...d.features]} />
      <ProvidersGrid title={d.providers.title} items={[...d.providers.items]} />
      <CodeBlock title={d.codeExample.title} code={d.codeExample.code} />
      <HowItWorks title={d.howItWorks.title} steps={[...d.howItWorks.steps]} />
      <PricingTable tiers={d.pricing.map(t => ({ ...t, features: [...t.features], cta: { ...t.cta } }))} />
      <FAQSection title={d.faq.title} items={[...d.faq.items]} />
      <CTASection title={d.cta.title} description={d.cta.description} button={{ ...d.cta.button }} />
    </Layout>
  );
}
