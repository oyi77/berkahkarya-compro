import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: { destination: '/id', permanent: false },
  };
};

export default function Root() {
  return null;
}
