import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signUp } = useAuth();
  const nav = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState<string|undefined>();
  const [ok,setOk] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const { error } = await signUp(email, password);
    if (error) setErr(error);
    else { setOk(true); nav("/verify"); }
  }

  return (
    <main style={{minHeight:"100vh", display:"grid", placeItems:"center", padding:24}}>
      <form onSubmit={onSubmit} style={{maxWidth:420, width:"100%"}}>
        <h1 style={{fontSize:24, marginBottom:12}}>Sign up</h1>
        {err && <div style={{color:"crimson", marginBottom:12}}>{err}</div>}
        {ok && <div style={{color:"green", marginBottom:12}}>Check your email to verify.</div>}
        <label>Email<br/><input value={email} onChange={e=>setEmail(e.target.value)} type="email" required style={{width:"100%", marginBottom:8}}/></label>
        <label>Password<br/><input value={password} onChange={e=>setPassword(e.target.value)} type="password" required style={{width:"100%", marginBottom:12}}/></label>
        <button type="submit">Create account</button>
        <p style={{marginTop:12}}>Have an account? <Link to="/login">Log in</Link></p>
      </form>
    </main>
  );
}
