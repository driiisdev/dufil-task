import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RegisterData } from '../../types';
import { authAPI } from '../../api/auth';
import { useAuthStore } from '../../store/useAuthStore';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>();

  const onSubmit = async (data: RegisterData) => {
    try {
      const response = await authAPI.register(data);
      setAuth(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <input
          {...register('name', { required: true })}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </div>
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
        Register
      </button>
    </form>
  );
};
