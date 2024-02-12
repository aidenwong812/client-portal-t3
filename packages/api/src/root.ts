import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { assistantRouter } from "./routers/assistant";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  assistant: assistantRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
