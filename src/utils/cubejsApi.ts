import jwt from 'jsonwebtoken';
import cubejs from '@cubejs-client/core';

const CUBE_API_SECRET = 'e5fc0ccb71c6ffd4a572a2a81ff20f927c4e430a3cbb0c2561a5e4b8ad63c928';
const cubejsToken = jwt.sign({}, CUBE_API_SECRET);

export const cubejsApi = cubejs(cubejsToken, {
  apiUrl: 'https://azure-bonobo.aws-us-west-2.cubecloudapp.dev/cubejs-api/v1',
});
