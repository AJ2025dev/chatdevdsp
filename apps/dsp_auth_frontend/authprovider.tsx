'''
Context provider for authentication state.
'''
import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../supabaseClient';
const AuthContext = createContext<any>(null);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const login = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    setUser(user);
  };
  const signup = async (email: string, password: string, role: string) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    // Insert user profile with role
    await supabase.from('profiles').insert([{ id: user.id, email, role }]);
    setUser(user);
  };
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);