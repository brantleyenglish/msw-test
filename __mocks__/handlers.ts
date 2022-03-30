import { graphql, rest } from 'msw';

export const exampleCubeJsResponse = {
  query: {
    measures: ['LineItems.count'],
    timeDimensions: [],
    order: [
      {
        id: 'LineItems.createdAt',
        desc: false,
      },
    ],
    filters: [],
    timezone: 'UTC',
    dimensions: [],
  },
  data: [
    {
      'LineItems.count': '400',
    },
  ],
  lastRefreshTime: '2022-03-30T15:23:56.652Z',
  annotation: {
    measures: {
      'LineItems.count': {
        title: 'Line Items Count',
        shortTitle: 'Count',
        type: 'number',
        drillMembers: ['LineItems.id', 'LineItems.createdAt'],
        drillMembersGrouped: {
          measures: [],
          dimensions: ['LineItems.id', 'LineItems.createdAt'],
        },
      },
    },
    dimensions: {},
    segments: {},
    timeDimensions: {},
  },
  dataSource: 'default',
  dbType: 'postgres',
  extDbType: 'cubestore',
  external: false,
  slowQuery: false,
};

// https://azure-bonobo.aws-us-west-2.cubecloudapp.dev/cubejs-api/v1/load?query=%7B%22measures%22%3A%5B%22LineItems.count%22%5D%2C%22timeDimensions%22%3A%5B%5D%2C%22order%22%3A%7B%22LineItems.createdAt%22%3A%22asc%22%7D%2C%22filters%22%3A%5B%5D%7D
// Targeting this endpoint on useCubeQuery method

export const handlers = [
  graphql.query('pokemon', (req, res, ctx) => {
    return res(ctx.data({ pokemon: { name: 'Charmander' } }));
  }),
  rest.get('https://azure-bonobo.aws-us-west-2.cubecloudapp.dev/cubejs-api/v1/load', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(exampleCubeJsResponse));
  }),
];
