'''
Component for user login.
'''
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from './AuthProvider';
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const Login: React.FC = () => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}
      <input {...register('password')} type="password" placeholder="Password" />
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit">Login</button>
    </form>
  );
};
export default Login;