import { LoginForm } from '@/features/auth/ui/login-form';
import { requireUnauth } from '@/shared/lib/auth-utils';

const Page = async () => {
  await requireUnauth();

  return <LoginForm />;
};

export default Page;
