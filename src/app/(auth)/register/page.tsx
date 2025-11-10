import { RegisterForm } from '@/features/auth/';
import { requireUnauth } from '@/shared/lib/auth-utils';

const Page = async () => {
  await requireUnauth();

  return <RegisterForm />;
};

export default Page;
