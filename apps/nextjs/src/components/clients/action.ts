"use server";

import { api } from "@/trpc/server";

export const getClient = async (clientId: string) => {
  return await api.assistant.byClientId({ id: clientId })
}