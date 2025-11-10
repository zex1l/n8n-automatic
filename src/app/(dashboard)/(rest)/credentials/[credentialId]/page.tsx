import { requireAuth } from '@/shared/lib/auth-utils';

type Props = {
  params: Promise<{
    credentialId: string;
  }>;
};

const Page = async ({ params }: Props) => {
  await requireAuth();
  const { credentialId } = await params;

  return <div>Credetianl {credentialId}</div>;
};

export default Page;
