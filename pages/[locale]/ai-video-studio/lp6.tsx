import { GetStaticPaths, GetStaticProps } from 'next';
import LP6Component from '@/components/landing/LP6';

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

export default function LandingPage6({ locale }: Props) {
  return <LP6Component locale={locale} />;
}
