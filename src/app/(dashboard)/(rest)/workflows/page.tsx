import { WorkflowsList, WorkflowsLoading } from '@/features/workflows';
import { prefetchWorkflows } from '@/features/workflows';
import { WorkflowsContainer } from '@/features/workflows';
import { requireAuth } from '@/shared/lib/auth-utils';
import { HydrateClient } from '@/shared/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const Page = async () => {
  await requireAuth();

  prefetchWorkflows();

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error</p>}>
          <Suspense fallback={<WorkflowsLoading />}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
};

export default Page;
