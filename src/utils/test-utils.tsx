import { render, RenderOptions } from '@testing-library/react';
import { themeClass, ThemeProvider, ToastProvider } from '@youversion/design-system';
import i18n from 'i18next';
import { setupServer } from 'msw/node';
import { FC, ReactElement } from 'react';
import { cubejsApi } from '@/utils/cubejsApi';
import { CubeProvider } from '@cubejs-client/react';
import { handlers } from '../../__mocks__/handlers';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';

import common from '../../public/locales/en/common.json';

i18n.use(initReactI18next).init({
  lng: 'en-US',
  fallbackLng: 'en-US',
  ns: ['common'],
  defaultNS: 'common',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    'en-US': { common },
  },
});

const queryClient = new QueryClient();

const AllTheProviders: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CubeProvider cubejsApi={cubejsApi}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider themeClass={themeClass}>
            <ToastProvider config={{ position: 'blockStartInlineEnd' }}>{children}</ToastProvider>
          </ThemeProvider>
        </I18nextProvider>
      </CubeProvider>
    </QueryClientProvider>
  );
};

export const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export const server = setupServer(...handlers);

export * from '@testing-library/react';
