import { customRender, screen } from '@/utils/test-utils';

import MockRouter from '../../__mocks__/MockRouter';
import Home from '../../src/pages/index';

describe('Home', () => {
  it('renders cubejs data', async () => {
    customRender(
      <MockRouter>
        <Home />
      </MockRouter>
    );
    expect(await screen.findByText('Data exists')).toBeInTheDocument();
  });
});
