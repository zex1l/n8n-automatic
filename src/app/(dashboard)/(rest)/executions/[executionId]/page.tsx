import { requireAuth } from '@/shared/lib/auth-utils';

type Props = {
  params: Promise<{
    executionId: string;
  }>;
};

const Page = async ({ params }: Props) => {
  await requireAuth();
  const { executionId } = await params;

  return <div>Credetianl {executionId}</div>;
};

export default Page;
