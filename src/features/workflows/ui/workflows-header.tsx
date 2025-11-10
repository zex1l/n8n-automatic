import { EntityHeader } from '@/widgets/entity-components';
import { useCreateWorkflow } from '../hooks/use-workflows';

type Props = {
  disable?: boolean;
};

export const WorkflowsHeader = ({ disable }: Props) => {
  const cretaeWorkflow = useCreateWorkflow();

  return (
    <>
      <EntityHeader
        description="Create your workflows"
        disabled={disable}
        title="Workflows"
        onNew={() => cretaeWorkflow.mutate()}
        newButtonLabel="New workflows"
        isCreating={cretaeWorkflow.isPending}
      />
    </>
  );
};
