import prisma from '@/shared/lib/db';
import { createTRPCRouter, protectedProcedure } from '@/shared/trpc/init';
import { generateSlug } from 'random-word-slugs';
import z from 'zod';

export const workflowsRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    return await prisma.workflow.create({
      data: {
        name: generateSlug(3),
        userId: ctx.auth.user.id,
      },
    });
  }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await prisma.workflow.delete({
        where: {
          userId: ctx.auth.user.id,
          id: input.id,
        },
      });
    }),
  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await prisma.workflow.update({
        where: {
          userId: ctx.auth.user.id,
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await prisma.workflow.findUnique({
        where: {
          userId: ctx.auth.user.id,
          id: input.id,
        },
      });
    }),

  getMany: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.workflow.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
    });
  }),
});
