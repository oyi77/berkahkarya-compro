import { GetStaticPaths, GetStaticProps } from 'next';
import LP2Component from '@/components/landing/LP2';

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
  
});

type Props = {
  locale: Locale;
};

export default function LandingPage2({ locale }: Props) {
  return <LP2Component locale={locale} />;
}
