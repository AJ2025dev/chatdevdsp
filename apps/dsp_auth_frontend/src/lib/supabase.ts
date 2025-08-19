import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

try {
  if (url && anon) {
    supabase = createClient(url, anon);
  } else {
    console.warn("[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set; running in demo mode.");
  }
} catch (e) {
  console.error("[supabase] failed to init:", e);
  supabase = null;
}

export { supabase };
export type Profile = {
  id: string;
  email: string | null;
  role: "admin" | "agency" | "advertiser" | string;
  company: string | null;
  created_at: string;
};
import { supabase } from "./supabase";
import type { Profile } from "./types";

export async function fetchMyProfile(): Promise<Profile | null> {
  if (!supabase) throw new Error("Supabase not initialized");
  const { data: { user }, error: uErr } = await supabase.auth.getUser();
  if (uErr) throw uErr;
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function upsertMyProfile(p: Pick<Profile, "company" | "role">): Promise<Profile> {
  if (!supabase) throw new Error("Supabase not initialized");
  const { data: { user }, error: uErr } = await supabase.auth.getUser();
  if (uErr) throw uErr;
  if (!user) throw new Error("Not signed in");

  // Upsert with your own id; RLS ensures you can only upsert yourself
  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      email: user.email ?? null,
      role: p.role,
      company: p.company ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Profile;
}

