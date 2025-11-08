import { inngest } from '@/inngest/client';
import { protectedProcedure, createTRPCRouter } from '../init';
import prisma from '@/shared/lib/db';

export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async ({ ctx }) => {
    await inngest.send({
      name: 'execute/ai',
    });

    return { message: 'ok' };
  }),
  getUsers: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findMany();
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
