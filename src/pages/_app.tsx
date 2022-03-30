import '@youversion/design-system/styles';

import { ThemeProvider } from '@youversion/design-system';
import { cubejsApi } from '@/utils/cubejsApi';
import { CubeProvider } from '@cubejs-client/react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CubeProvider cubejsApi={cubejsApi}>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </CubeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
