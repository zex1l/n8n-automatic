import { protectedProcedure, createTRPCRouter } from '../init';
import prisma from '@/shared/lib/db';
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findMany();
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
