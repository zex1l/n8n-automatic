'use client';
import { EntityContainer } from '@/widgets/entity-components';
import { WorkflowsHeader } from './workflows-header';

type Props = {
  children: React.ReactNode;
};

export const WorkflowsContainer = ({ children }: Props) => {
  return (
    <EntityContainer header={<WorkflowsHeader />}>{children}</EntityContainer>
  );
};
