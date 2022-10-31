import { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import Container from '@/layout/Container';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

type Data = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const Index = () => {
  const router = useRouter();
  const [page, setPage] = useState(
    parseInt(router.query.page as string, 10) || 1
  );

  const [pageData, setPageData] = useState<Data[]>([]);

  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('A to Z');

  const { data } = useQuery(
    ['characters', page],
    async () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}?_start=0&_limit=${page * 5}`
      ).then((result) => result.json()),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    setPageData(data);

    return () => {
      setPageData([]);
    };
  }, [data]);

  const handlePaginationChange = (value: number) => {
    setPage(value);
    router.push(`/?page=${value}`, undefined, { shallow: true });
  };

  const onSearchHandler = (value: string) => {
    setSearchValue(value);

    const filteredData = data.filter((item: Data) =>
      item.title.includes(value.toLowerCase())
    );

    if (value) {
      setPageData(filteredData);
    } else {
      setPageData(data);
    }
  };

  const handleSortBy = (value: string) => {
    setSortBy(value);

    pageData.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) {
        return value === 'A to Z' ? -1 : 1;
      }
      if (titleA > titleB) {
        return value === 'A to Z' ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <Main
      meta={
        <Meta title="react_frontend_demo" description="react_frontend_demo" />
      }
    >
      <div className="min-h-screen">
        <div className="flex flex-col items-center py-6">
          <Container>
            <div className="w-full">
              <h2 className="font-Poppins text-xll font-semibold text-black md:text-xlll">
                DEMO APP
              </h2>

              <div className="pt-10 pb-6 w-full">
                <div className="relative pt-2 w-full mx-auto text-gray-600 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm ">
                  <input
                    className="focus:outline-none"
                    type="text"
                    name="search"
                    placeholder="Search"
                    onChange={(e) => onSearchHandler(e.target.value)}
                    value={searchValue}
                  />

                  <button
                    type="submit"
                    className="absolute right-0 -top-3 mt-5 mr-4"
                  >
                    <svg
                      className="text-gray-600 h-4 w-4 fill-current"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 56.966 56.966"
                      width="512px"
                      height="512px"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="pb-6 flex w-full justify-end">
                <button
                  type="button"
                  className="border rounded-md py-1 px-4"
                  onClick={() =>
                    handleSortBy(sortBy === 'A to Z' ? 'Z to A' : 'A to Z')
                  }
                >
                  {sortBy}
                </button>
              </div>

              <div>
                <InfiniteScroll
                  dataLength={page * 5}
                  next={() => handlePaginationChange(page + 1)}
                  hasMore={pageData.length <= 100}
                  loader={<h4 className="text-center">Loading...</h4>}
                  endMessage={
                    <p className="text-center">Yay! You have seen it all</p>
                  }
                >
                  {pageData &&
                    pageData.length > 0 &&
                    pageData.map((item, index) => (
                      <div key={item.id}>
                        <div className="py-4 px-8 border bg-white shadow-lg rounded-lg mb-6 cursor-pointer hover:shadow-xl">
                          <div>
                            <h1 className="text-4xl">{index + 1}</h1>
                            <h2 className="text-3xl text-gray-800 font-semibold">
                              {item.title}
                            </h2>
                            <p className="mt-2 text-gray-600">{item.body}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </InfiniteScroll>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page = 1;
  if (context.query.page) {
    page = parseInt(context.query.page as string, 10);
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['characters', page], async () =>
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}?_start=0&_limit=${page * 5}`
    ).then((result) => result.json())
  );
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default Index;
