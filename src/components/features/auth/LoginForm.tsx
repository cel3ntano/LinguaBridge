'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data); // Will implement later
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
          />
          {errors.email && (
            <p className="absolute -bottom-5 left-1 text-sm text-red-500">
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
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-[18px] top-1/2 -translate-y-1/2"
          >
            <Icon
              id={showPassword ? '#eye_open' : '#eye_hidden'}
              className="h-5 w-5 stroke-brand-dark fill-none"
            />
          </button>
          {errors.password && (
            <p className="absolute -bottom-5 left-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" size="large" className="mt-10 w-full">
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
