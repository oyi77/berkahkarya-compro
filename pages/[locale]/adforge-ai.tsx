import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import FeatureGrid from '@/components/FeatureGrid';
import HowItWorks from '@/components/HowItWorks';
import TestimonialSection from '@/components/TestimonialSection';
import PricingTable from '@/components/PricingTable';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import { productsData } from '@/data/products';
import { characters } from '@/data/characters';

type Locale = 'id' | 'en';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: (params?.locale as Locale) || 'id' },
});

export default function AdForgeAI({ locale }: { locale: Locale }) {
  const d = productsData['adforge-ai'][locale];
  return (
    <Layout title={d.meta.title} description={d.meta.description}>
      <HeroSection eyebrow={d.hero.eyebrow} title={d.hero.title} description={d.hero.description} buttons={d.hero.buttons} dark character={characters['adforge-ai']} />
      <ProblemSection hook={d.problem.hook} pains={d.problem.pains} bridge={d.problem.bridge} />
      <FeatureGrid items={d.features} />
      <HowItWorks title={d.howItWorks.title} steps={d.howItWorks.steps} />
      <TestimonialSection title={d.testimonials.title} items={d.testimonials.items} />
      <PricingTable tiers={d.pricing} />
      <FAQSection title={d.faq.title} items={d.faq.items} />
      <CTASection title={d.cta.title} description={d.cta.description} button={d.cta.button} />
    </Layout>
  );
}
