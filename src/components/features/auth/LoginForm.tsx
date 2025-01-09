import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser } from '@/store/auth/authOperations';
import { selectError, selectIsLoading } from '@/store/auth/authSelectors';
import { clearError } from '@/store/auth/authSlice';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setError('root', { message: error });
    }
  }, [error, setError]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const inputClasses =
    'w-full rounded-xl border border-text-primary/10 px-[18px] py-4 text-base leading-[22px] placeholder:text-text-primary focus:outline-none focus:ring-1 transition-colors duration-300 hover:border-accent-primary';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="space-y-[24px]">
        <div className="relative">
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className={inputClasses}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="absolute -bottom-5 left-1 text-sm text-text-error">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={inputClasses}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-[18px] top-1/2 -translate-y-1/2"
            disabled={isLoading}
          >
            <Icon
              id={showPassword ? '#eye_open' : '#eye_hidden'}
              className="h-5 w-5 stroke-brand-dark fill-none"
            />
          </button>
          {errors.password && (
            <p className="absolute -bottom-5 left-1 text-sm text-text-error">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {errors.root && (
        <p className="mt-4 text-center text-sm text-text-error">
          {errors.root.message}
        </p>
      )}

      <Button
        type="submit"
        size="large"
        className="mt-10 w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </Button>
    </form>
  );
};

export default LoginForm;
