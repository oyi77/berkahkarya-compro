import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import ProductCatalog from '@/components/ProductCatalog';
import FeatureGrid from '@/components/FeatureGrid';
import HowItWorks from '@/components/HowItWorks';
import TestimonialSection from '@/components/TestimonialSection';
import PricingTable from '@/components/PricingTable';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import { productsFullData, dpCatalog } from '@/data/products';
import { characters } from '@/data/characters';

type Locale = 'id' | 'en';
export const getStaticPaths: GetStaticPaths = async () => ({ paths: [{ params: { locale: 'id' } }, { params: { locale: 'en' } }], fallback: false });
export const getStaticProps: GetStaticProps = async ({ params }) => ({ props: { locale: (params?.locale as Locale) || 'id' } });

export default function DigitalProducts({ locale }: { locale: Locale }) {
  const d = productsFullData['digital-products'][locale];
  const pr = d.pricing.map(t => ({ ...t, features: [...t.features], cta: { ...t.cta } }));
  const catalogTitle = locale === 'id' ? '7 Produk Digital AI yang Tersedia' : '7 Available AI Digital Products';
  return (
    <Layout title={d.meta.title} description={d.meta.description}>
      <HeroSection eyebrow={d.hero.eyebrow} title={d.hero.title} description={d.hero.description} buttons={[...d.hero.buttons]} dark character={characters['digital-products']} />
      <ProblemSection hook={d.problem.hook} pains={[...d.problem.pains]} bridge={d.problem.bridge} />
      <ProductCatalog title={catalogTitle} items={dpCatalog} />
      <FeatureGrid items={[...d.features]} />
      <HowItWorks title={d.howItWorks.title} steps={[...d.howItWorks.steps]} />
      <TestimonialSection title={locale === 'id' ? 'Kata Mereka yang Sudah Pakai' : 'What Our Users Say'} items={[...d.testimonials]} />
      <PricingTable tiers={pr} />
      <FAQSection title={d.faq.title} items={[...d.faq.items]} />
      <CTASection title={d.cta.title} description={d.cta.description} button={{ ...d.cta.button }} />
    </Layout>
  );
}
