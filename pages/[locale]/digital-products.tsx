import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeatureGrid from '@/components/FeatureGrid';
import PricingTable from '@/components/PricingTable';
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

export default function DigitalProducts({ locale }: { locale: Locale }) {
  const d = productsData['digital-products'][locale];
  return (
    <Layout title={d.meta.title} description={d.meta.description}>
      <HeroSection eyebrow={d.hero.eyebrow} title={d.hero.title} description={d.hero.description} buttons={d.hero.buttons} dark character={characters['digital-products']} />
      <FeatureGrid items={d.features} />
      <PricingTable tiers={d.pricing} />
      <CTASection title={d.cta.title} description={d.cta.description} button={d.cta.button} />
    </Layout>
  );
}
