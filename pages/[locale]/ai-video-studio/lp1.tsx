import { GetStaticPaths, GetStaticProps } from 'next';
import LP1Component from '@/components/landing/LP1';

type Locale = 'id' | 'en';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { locale: 'id' } },
    { params: { locale: 'en' } },
  ],
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { locale: (params?.locale as Locale) || 'id' },
  revalidate: 3600,
});

type Props = {
  locale: Locale;
};

export default function LandingPage1({ locale }: Props) {
  return <LP1Component locale={locale} />;
}
