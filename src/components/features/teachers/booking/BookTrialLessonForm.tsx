'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

const reasonOptions = [
  'Career and business',
  'Lesson for kids',
  'Living abroad',
  'Exams and coursework',
  'Culture, travel or hobby',
];

interface BookTrialLessonFormData {
  reason: string;
  fullName: string;
  email: string;
  phone: string;
}

const schema = yup.object().shape({
  reason: yup.string().required('Please select a reason'),
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .required('Phone number is required'),
});

const BookTrialLessonForm = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookTrialLessonFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: BookTrialLessonFormData) => {
    console.log(data);
    onClose();
  };

  const inputClasses =
    'w-full rounded-xl border border-text-primary/10 px-[18px] py-4 text-base leading-[22px] placeholder:text-text-primary focus:outline-none focus:ring-1 transition-colors duration-300 hover:border-accent-primary';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <h3 className="text-text-primary text-2xl font-medium leading-8">
        What is your main reason for learning English?
      </h3>

      <div className="relative mt-5">
        <div className="space-y-4">
          {reasonOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="relative w-5 h-5">
                <input
                  type="radio"
                  value={option}
                  {...register('reason')}
                  className="peer sr-only"
                />
                <Icon
                  id="#radio"
                  className="absolute inset-0 w-5 h-5 fill-none stroke-brand-dark/20 group-hover:stroke-brand-dark/30 transition-all duration-200 peer-checked:scale-90 peer-checked:opacity-0"
                />
                <Icon
                  id="#radio-checked"
                  className="absolute inset-0 w-5 h-5 fill-interactive-button stroke-brand-white stroke-[4px] scale-75 opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
                />
              </div>
              <span className="text-text-primary text-base leading-[22px]">
                {option}
              </span>
            </label>
          ))}
        </div>
        {errors.reason && (
          <p className="absolute -bottom-6 left-0 text-sm text-text-error">
            {errors.reason.message}
          </p>
        )}
      </div>

      <div className="mt-10 space-y-6">
        <div className="relative">
          <input
            {...register('fullName')}
            placeholder="Full Name"
            className={inputClasses}
          />
          {errors.fullName && (
            <p className="absolute -bottom-5 left-1 text-sm text-text-error">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className={inputClasses}
          />
          {errors.email && (
            <p className="absolute -bottom-5 left-1 text-sm text-text-error">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            {...register('phone')}
            type="tel"
            placeholder="Phone number"
            className={inputClasses}
          />
          {errors.phone && (
            <p className="absolute -bottom-5 left-1 text-sm text-text-error">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" size="large" className="mt-10 w-full">
        Book
      </Button>
    </form>
  );
};

export default BookTrialLessonForm;
