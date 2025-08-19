'''
Component for user signup.
'''
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from './AuthProvider';
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADVERTISER', 'AGENCY', 'ADMIN']), // Add role validation
});
const Signup: React.FC = () => {
  const { signup } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: any) => {
    try {
      await signup(data.email, data.password, data.role); // Pass role to signup
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
      <select {...register('role')}>
        <option value="ADVERTISER">Advertiser</option>
        <option value="AGENCY">Agency</option>
        <option value="ADMIN">Admin</option>
      </select>
      {errors.role && <p>{errors.role.message}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
};
export default Signup;