import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title || 'BerkahKarya — AI Ecosystem'}</title>
        <meta name="description" content={description || 'AI Ecosystem untuk bisnis Indonesia'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title || 'BerkahKarya'} />
        <meta property="og:description" content={description || 'AI Ecosystem untuk bisnis Indonesia'} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BerkahKarya" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
