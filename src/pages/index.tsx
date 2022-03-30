import * as React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCubeQuery } from '@cubejs-client/react';
import { graphQLClient } from '@/utils/graphQLClient';
import { gql } from 'graphql-request';

const Home: NextPage = () => {
  // Graphql Request
  const [pokemon, setPokemon] = React.useState<any>();

  const fetchBulbasaur = async () => {
    const bulbasaur = await graphQLClient.request(
      gql`
        query pokemon($name: String) {
          pokemon(name: $name) {
            id
            number
            name
          }
        }
      `,
      { name: 'Bulbasaur' }
    );
    setPokemon(bulbasaur);
  };

  React.useEffect(() => {
    fetchBulbasaur();
  }, []);

  // Cubejs rest request
  const { resultSet, isLoading, error } = useCubeQuery({
    measures: ['LineItems.count'],
    timeDimensions: [],
    order: {
      'LineItems.createdAt': 'asc',
    },
    filters: [],
  });

  if (isLoading) {
    return <p>Fetching data</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message || error}</p>
        <small>Refresh the page if this error is unintentional.</small>
      </div>
    );
  }
  if (Boolean(resultSet && pokemon)) {
    return (
      <div className='App'>
        <p>Data exists</p>
        <p>{pokemon?.pokemon?.name}</p>
        <p>Line Items: {resultSet?.tablePivot()[0]['LineItems.count']}</p>
      </div>
    );
  }

  return <div className='App'>No data</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};

export default Home;
