import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const nav = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState<string|undefined>();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) setErr(error);
    else nav("/dashboard");
  }

  return (
    <main style={{minHeight:"100vh", display:"grid", placeItems:"center", padding:24}}>
      <form onSubmit={onSubmit} style={{maxWidth:420, width:"100%"}}>
        <h1 style={{fontSize:24, marginBottom:12}}>Log in</h1>
        {err && <div style={{color:"crimson", marginBottom:12}}>{err}</div>}
        <label>Email<br/><input value={email} onChange={e=>setEmail(e.target.value)} type="email" required style={{width:"100%", marginBottom:8}}/></label>
        <label>Password<br/><input value={password} onChange={e=>setPassword(e.target.value)} type="password" required style={{width:"100%", marginBottom:12}}/></label>
        <button type="submit">Log in</button>
        <p style={{marginTop:12}}>No account? <Link to="/signup">Sign up</Link></p>
      </form>
    </main>
  );
}
