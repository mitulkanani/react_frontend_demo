// import "flowbite";
import React, { useState } from 'react';

import { NextPageContext } from 'next';
import { AppProps } from 'next/app';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import '../styles/global.css';

type PageProps = {
  dehydratedState?: DehydratedState;
};

type ExtendedAppProps<P = {}> = {
  err?: NextPageContext['err'];
} & AppProps<P>;

const MyApp = ({ Component, pageProps }: ExtendedAppProps<PageProps>) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div data-theme="light">
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        </Hydrate>
      </QueryClientProvider>
    </div>
  );
};

export default MyApp;
