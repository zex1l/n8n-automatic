import { requireAuth } from '@/shared/lib/auth-utils';

const Page = async () => {
  await requireAuth();
  return <div>Executions Pages</div>;
};

export default Page;
