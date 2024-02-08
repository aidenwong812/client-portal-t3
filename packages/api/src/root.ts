import { authRouter } from "./routers/auth";
import { assistantRouter } from "./routers/assistant";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  assistant: assistantRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
