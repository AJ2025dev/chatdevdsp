import { useAuth } from "../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMyProfile, upsertMyProfile } from "../lib/profileApi";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { session, signOut } = useAuth();
  const qc = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchMyProfile,
  });

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("advertiser");

  useEffect(() => {
    if (profile) {
      setCompany(profile.company ?? "");
      setRole(profile.role ?? "advertiser");
    }
  }, [profile]);

  const m = useMutation({
    mutationFn: () => upsertMyProfile({ company, role }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });

  const email = session?.user?.email ?? "user";

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 560, width: "100%" }}>
        <h1 style={{ fontSize: 22, marginBottom: 8 }}>Welcome, {email}</h1>

        {isLoading ? (
          <p>Loading profile…</p>
        ) : (
          <>
            <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8, marginTop: 12 }}>
              <h2 style={{ fontSize: 18, marginBottom: 8 }}>Your profile</h2>

              <label style={{ display: "block", marginBottom: 8 }}>
                Company
                <input
                  style={{ display: "block", width: "100%", marginTop: 4 }}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company name"
                />
              </label>

              <label style={{ display: "block", marginBottom: 12 }}>
                Role
                <select
                  style={{ display: "block", width: "100%", marginTop: 4 }}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="agency">Agency</option>
                  <option value="advertiser">Advertiser</option>
                </select>
              </label>

              <button disabled={m.isPending} onClick={() => m.mutate()}>
                {m.isPending ? "Saving…" : "Save profile"}
              </button>
              {m.isError && <div style={{ color: "crimson", marginTop: 8 }}>{String(m.error)}</div>}
              {m.isSuccess && <div style={{ color: "green", marginTop: 8 }}>Saved!</div>}
            </div>
          </>
        )}

        <div style={{ marginTop: 16 }}>
          <button onClick={signOut}>Sign out</button>
        </div>
      </div>
    </main>
  );
}
