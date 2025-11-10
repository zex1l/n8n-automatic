import type { inferInput } from '@trpc/tanstack-react-query';

import { prefetch, trpc } from '@/shared/trpc/server';

export const prefetchWorkflows = () =>
  prefetch(trpc.workflows.getMany.queryOptions());
