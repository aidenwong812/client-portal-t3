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

  byUserId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const assistant = await ctx.db.assistant.findUnique({
        where: {
          userId: ctx.user.id,
          id: input.id,
        },
      });

      const client = await ctx.db.user.findUnique({
        where: {
          email: assistant?.clientEmail,
        }
      });

      return { ...assistant, password: client?.password };
    }),

  byClientEmail: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.assistant.findUnique({
        where: {
          clientEmail: input.email,
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      apiKey: z.string(),
      projectId: z.string(),
      clientEmail: z.string(),
      password: z.string(),
      analytics: z.boolean(),
      transcripts: z.boolean(),
      knowledgeBase: z.boolean(),
      tags: z.boolean(),
      faq: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { password, ...data } = input

      const client = await ctx.db.user.findUnique({
        where: {
          email: input.clientEmail,
        }
      })

      if (!client) {
        await ctx.db.user.create({
          data: {
            id: randomUUID(),
            email: input.clientEmail,
            username: input.name,
            password: password,
            role: "CLIENT",
          }
        })
      }

      return ctx.db.assistant.create({
        data: { id: randomUUID(), userId: ctx.user.id, ...data },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        apiKey: z.string().optional(),
        clientEmail: z.string().optional(),
        password: z.string().optional(),
        analytics: z.boolean().optional(),
        transcripts: z.boolean().optional(),
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
