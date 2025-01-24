import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IRegisterData } from '../../types/authTypes';
import { authAPI } from '../../api/auth';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<IRegisterData>();

  const onSubmit = async (data: IRegisterData) => {
    try {
      await authAPI.register(data);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <input
          {...register('username', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be between 3 and 100 characters',
            },
            maxLength: {
              value: 100,
              message: 'Name must be between 3 and 100 characters',
            },
            pattern: {
              value: /^[a-zA-Z\s]*$/,
              message: 'Name can only contain letters and spaces',
            },
          })}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        {errors.username && <span className="text-red-500">{errors.username.message}</span>}
      </div>
      <div>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email format',
            },
            maxLength: {
              value: 255,
              message: 'Email must be less than 255 characters',
            },
          })}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>
      <div>
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
              message:
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            },
          })}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        {errors.password && isDirty && <span className="text-red-500">{errors.password.message}</span>} 
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
