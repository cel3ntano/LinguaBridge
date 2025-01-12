'use client';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'icon'
  | 'login'
  | 'logout'
  | 'registration'
  | 'reset';
type ButtonSize = 'default' | 'large' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const getButtonClasses = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'default',
) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-xl font-roboto transition-colors focus-visible:outline-none disabled:opacity-50';

  const variantClasses = {
    primary:
      'bg-interactive-button hover:bg-interactive-buttonHover text-text-primary font-bold',
    secondary:
      'bg-transparent text-text-primary border border-text-primary hover:bg-background-backdrop',
    icon: 'bg-transparent p-0 hover:opacity-80',
    login: 'bg-transparent text-text-primary hover:text-accent-primary',
    logout: 'bg-transparent text-text-primary hover:text-accent-primary py-3.5',
    registration:
      'bg-text-primary text-background-primary font-bold hover:bg-accent-light px-10 py-3.5 leading-5',
    reset:
      'h-[50px] border border-text-primary/10 bg-brand-white text-text-primary hover:text-accent-primary px-4 py-3.5 leading-[18px]',
  };

  const sizeClasses = {
    default: 'text-lg',
    large: 'py-4 text-lg',
    icon: 'w-8 h-8',
  };

  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
};

const Button = ({
  className = '',
  variant = 'primary',
  size = 'default',
  children,
  ...props
}: ButtonProps) => {
  const buttonClasses = `${getButtonClasses(variant, size)} ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
