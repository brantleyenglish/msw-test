import { RouterContext } from 'next/dist/shared/lib/router-context';
import Router, { NextRouter } from 'next/router';
import * as React from 'react';

interface Props {
  asPath: string;
  locale: string;
  pathname: string;
  push: (newPath: string) => void;
  query: Record<string, string>;
  replace: (newPath: string) => void;
}

const MockRouter: React.FC<Partial<Props>> = ({
  children,
  push = jest.fn().mockResolvedValue(true),
  replace = jest.fn().mockResolvedValue(true),
  pathname = '/',
  query = {},
  asPath = pathname,
  locale = 'en-US',
}) => {
  const mockRouter = {
    pathname,
    prefetch: jest.fn().mockResolvedValue(jest.fn()),
    push,
    replace,
    query,
    asPath,
    locale,
  } as unknown as NextRouter;

  // @ts-expect-error - Mock Router
  Router.router = mockRouter;

  return <RouterContext.Provider value={mockRouter}>{children}</RouterContext.Provider>;
};

export default MockRouter;
