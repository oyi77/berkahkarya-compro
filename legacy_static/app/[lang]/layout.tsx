import type { Locale } from '@/src/lib/i18n';
import { locales } from '@/src/lib/i18n';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <div lang={params.lang}>
      <Header lang={params.lang} />
      <main>{children}</main>
      <Footer lang={params.lang} />
    </div>
  );
}
