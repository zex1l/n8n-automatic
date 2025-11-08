import { requireAuth } from '@/shared/lib/auth-utils';

export default async function Home() {
  await requireAuth();

  return <div>Home</div>;
}
