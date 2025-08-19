import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

// Context shape
type Ctx = {
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

const AuthCtx = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | undefined;

    async function init() {
      try {
        if (supabase) {
          const { data } = await supabase.auth.getSession();
          setSession(data.session ?? null);

          const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
            setSession(s ?? null);
          });
          // @ts-expect-error subscription optional
          unsub = () => sub?.subscription?.unsubscribe?.();
        } else {
          // demo mode (no Supabase): keep a fake session in localStorage
          const email = localStorage.getItem("demo_session_email");
          if (email) {
            // @ts-expect-error minimal fake
            setSession({ user: { email } } as Session);
          }
        }
      } finally {
        setLoading(false);
      }
    }

    init();
    return () => { try { unsub?.(); } catch {} };
  }, []);

  const api = useMemo<Ctx>(() => ({
    session,
    loading,
    async signIn(email: string, password: string) {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        setSession(data.session ?? null);
        return {};
      }
      // demo mode
      if (!email || !password) return { error: "Email and password required" };
      localStorage.setItem("demo_session_email", email);
      // @ts-expect-error minimal fake
      setSession({ user: { email } } as Session);
      return {};
    },
    async signUp(email: string, password: string) {
      if (supabase) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) return { error: error.message };
        return {};
      }
      // demo mode: pretend success
      if (!email || !password) return { error: "Email and password required" };
      return {};
    },
    async signOut() {
      if (supabase) await supabase.auth.signOut();
      localStorage.removeItem("demo_session_email");
      setSession(null);
    }
  }), [session, loading]);

  return <AuthCtx.Provider value={api}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
