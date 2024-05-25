'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { IPropsChildren } from '@/type/common';

export default function QueryProviders({ children }: IPropsChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
