import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginData } from '../../types';
import { authAPI } from '../../api/auth';
import { useAuthStore } from '../../store/useAuthStore';

export const LoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await authAPI.login(data);
      setAuth(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        {errors.email && <span className="text-red-500">Email is required</span>}
      </div>
      <div>
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        {errors.password && <span className="text-red-500">Password is required</span>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
};
