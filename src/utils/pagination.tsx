import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page = 1;
  if (context.query.page) {
    page = parseInt(context.query.page as string, 10);
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['characters', page], async () =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}?_start=${page}&_limit=5`).then(
      (result) => result.json()
    )
  );
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
