import { randomUUID } from "crypto";
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

  byClientId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.assistant.findMany({
        where: {
          userId: ctx.user.id,
          clientId: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      apiKey: z.string(),
      projectId: z.string(),
      clientEmail: z.string().optional(),
      analytics: z.boolean(),
      transcript: z.boolean(),
      knowledgeBase: z.boolean(),
      tags: z.boolean(),
      faq: z.boolean(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.db.assistant.create({
        data: { id: randomUUID(), userId: ctx.user.id, ...input },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        apiKey: z.string().optional(),
        clientEmail: z.string().optional(),
        analytics: z.boolean().optional(),
        transcript: z.boolean().optional(),
        knowledgeBase: z.boolean().optional(),
        tags: z.boolean().optional(),
        faq: z.boolean().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.assistant.update({
        where: {
          id: id,
        },
        data: data,
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
