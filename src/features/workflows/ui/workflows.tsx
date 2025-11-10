'use client';

import { useSuspenseWorkflows } from '../hooks/use-workflows';

export const Workflows = () => {
  const { data } = useSuspenseWorkflows();

  return <div className="flex-1">{JSON.stringify(data, null, 2)}</div>;
};
