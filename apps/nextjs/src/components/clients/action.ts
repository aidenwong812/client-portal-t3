"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { randomUUID } from "crypto";

export const saveAssistant = async ({
  nickname,
  email,
  password,
  apiKey,
  projectId
}: {
  nickname: string,
  email: string,
  password: string,
  apiKey: string,
  projectId: string
}) => {
  const supabase = createServerActionClient({ cookies });

  const client = await supabase.from('User').select("*").eq("email", email)
  let clientId = ""
  if (!client.data?.length) {
    const { data, error } = await supabase.from('User').insert([{
      id: randomUUID(),
      email: email,
      password: password,
      username: nickname,
      role: "CLIENT",
    }]).select()

    if (error) throw error

    clientId = data[0].id
  }
  else {
    clientId = client.data[0].id
  }

  const auth = (await supabase.auth.getUser()).data.user

  const { error } = await supabase.from('Assistant').insert([{
    id: projectId,
    name: 'assistant',
    apiKey: apiKey,
    clientId: clientId,
    userId: auth?.id
  }]).select()

  if (error) throw error

  return "success";
};