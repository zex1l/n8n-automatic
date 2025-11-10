import { LoginForm } from '@/features/auth';
import { requireUnauth } from '@/shared/lib/auth-utils';

const Page = async () => {
  await requireUnauth();

  return <LoginForm />;
};

export default Page;
