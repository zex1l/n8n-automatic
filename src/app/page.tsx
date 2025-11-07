import { caller } from '@/shared/trpc/server';

export default async function Home() {
  const greeting = await caller.getUsers();
  console.log(greeting);

  return <div></div>;
}
