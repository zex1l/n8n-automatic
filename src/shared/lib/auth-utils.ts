import { headers } from 'next/headers';
import { auth } from './auth';
import { ROUTES } from '../config/route';
import { redirect } from 'next/navigation';

export const requireAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect(ROUTES.LOGIN);

  return session;
};

export const requireUnauth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect(ROUTES.WORKFLOWS);
};
