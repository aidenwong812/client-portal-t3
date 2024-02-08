import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const assistantRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.assistant.findMany({
      where: {
        userId: ctx.user.id
      }
    });
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findMany({
        where: {
          id: input.id
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      apiKey: z.string(),
      id: z.string(),
      clientId: z.string().optional()
    }))
    .mutation(({ ctx, input }) => {
      return ctx.db.assistant.create({
        data: {
          userId: ctx.user.id,
          id: input.id,
          name: input.name,
          apiKey: input.apiKey,
          clientId: input.clientId,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        apiKey: z.string(),
        clientId: z.string().optional()
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.assistant.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          apiKey: input.apiKey,
          clientId: input.clientId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.assistant.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
