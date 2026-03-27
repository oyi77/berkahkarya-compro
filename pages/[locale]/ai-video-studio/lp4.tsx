import { GetStaticPaths, GetStaticProps } from 'next';
import LP4Component from '@/components/landing/LP4';

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

export default function LandingPage4({ locale }: Props) {
  return <LP4Component locale={locale} />;
}
