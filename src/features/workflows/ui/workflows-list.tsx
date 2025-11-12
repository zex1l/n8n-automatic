'use client';

import { EntityCard, EntityList } from '@/widgets/entity-components';
import {
  useDeleteWorkflow,
  useSuspenseWorkflows,
} from '../hooks/use-workflows';
import { ROUTES } from '@/shared/config/route';

export const WorkflowsList = () => {
  const { data } = useSuspenseWorkflows();
  const { mutate: handleDeleteWorkflow, isPending } = useDeleteWorkflow();

  return (
    <EntityList
      items={data}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => (
        <EntityCard
          href={ROUTES.WORKFLOWS_ID(workflow.id)}
          title={workflow.name}
          onRemove={() => handleDeleteWorkflow({ id: workflow.id })}
          isRemoving={isPending}
          key={workflow.id}
        />
      )}
    />
  );
};
