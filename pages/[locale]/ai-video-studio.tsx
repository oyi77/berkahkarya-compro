import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import FeatureGrid from '@/components/FeatureGrid';
import HowItWorks from '@/components/HowItWorks';
import TestimonialSection from '@/components/TestimonialSection';
import OfferSection from '@/components/OfferSection';
import PricingTable from '@/components/PricingTable';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import { productsFullData } from '@/data/products';
import { characters } from '@/data/characters';
import { trackViewContent } from '@/lib/tracking';

type Locale = 'id' | 'en';
export const getStaticPaths: GetStaticPaths = async () => ({ paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }], fallback: false });
export const getStaticProps: GetStaticProps = async ({ params }) => ({ props: { locale: (params?.locale as Locale) || 'id' } });

export default function AIVideoStudio({ locale }: { locale: Locale }) {
  const d = productsFullData['ai-video-studio'][locale];
  const pr = d.pricing.map(t => ({ ...t, features: [...t.features], cta: { ...t.cta } }));
  
  useEffect(() => {
    trackViewContent('AI Video Studio', 'product_page');
  }, []);
  
  return (
    <Layout title={d.meta.title} description={d.meta.description}>
      <HeroSection eyebrow={d.hero.eyebrow} title={d.hero.title} description={d.hero.description} buttons={[...d.hero.buttons]} dark character={characters['ai-video-studio']} />
      <ProblemSection hook={d.problem.hook} pains={[...d.problem.pains]} bridge={d.problem.bridge} />
      <FeatureGrid items={[...d.features]} />
      <HowItWorks title={d.howItWorks.title} steps={[...d.howItWorks.steps]} />
      <TestimonialSection title={locale === 'id' ? 'Kata Mereka yang Sudah Pakai' : 'What Our Users Say'} items={[...d.testimonials]} />
      <OfferSection locale={locale} />
      <PricingTable tiers={pr} />
      <FAQSection title={d.faq.title} items={[...d.faq.items]} />
      <CTASection title={d.cta.title} description={d.cta.description} button={{ ...d.cta.button }} />
    </Layout>
  );
}
