'use client';
import { requireAuth } from '@/shared/lib/auth-utils';
import { useTRPC } from '@/shared/trpc/client';
import { Button } from '@/shared/ui/button';
import { useMutation } from '@tanstack/react-query';

export default  function Home() {
  const trpc = useTRPC();

  const testAi = useMutation(trpc.testAi.mutationOptions());

  return (
    <div>
      <h1>Home</h1>

      <Button onClick={() => testAi.mutate()}>AI</Button>
    </div>
  );
}
