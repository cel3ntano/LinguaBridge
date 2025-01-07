import Image from 'next/image';
import Icon from '@/components/common/Icon';
import type { Teacher } from '@/types/teachers';

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  return (
    <div className="rounded-3xl bg-brand-white p-6">
      <div className="flex gap-12 ">
        <div className="relative h-[120px] w-[120px] p-3 rounded-full border-[3px] border-interactive-avatar bg-brand-white ">
          <div className="relative">
            <Image
              src={teacher.avatar_url}
              alt={`${teacher.name} ${teacher.surname}`}
              width={96}
              height={96}
              className="rounded-full"
            />
            <Icon
              id="#online"
              className="absolute right-1 top-1 h-4 w-4 fill-brand-limeGreen  border-[3px] border-brand-white rounded-full"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-8">
          <div className="space-y-8">
            <div className="flex justify-between">
              <div className="space-y-2">
                <p className="text-text-secondary text-base font-medium leading-6">
                  Languages
                </p>
                <h3 className="text-text-primary text-2xl font-medium leading-6">
                  {teacher.name} {teacher.surname}
                </h3>
              </div>

              <ul className="flex items-center">
                <li className="flex items-center">
                  <Icon
                    id="#book"
                    className="h-4 w-4 fill-none stroke-brand-dark"
                  />
                  <span className="ml-2 text-text-primary text-base font-medium leading-6">
                    Lessons online
                  </span>
                </li>
                <li className="mx-4 h-4 w-px bg-text-primary/20" />
                <li className="text-text-primary text-base font-medium leading-6">
                  Lessons done: {teacher.lessons_done}
                </li>
                <li className="mx-4 h-6 w-px bg-text-primary/20" />
                <li className="flex items-center">
                  <Icon
                    id="#star"
                    className="h-5 w-5 fill-interactive-rating"
                  />
                  <span className="ml-2 text-text-primary text-base font-medium leading-6">
                    Rating: {teacher.rating}
                  </span>
                </li>
                <li className="mx-4 h-6 w-px bg-text-primary/20" />
                <li className="text-text-primary text-base font-medium leading-6">
                  Price / 1 hour:{' '}
                  <span className="text-interactive-price">
                    {teacher.price_per_hour}$
                  </span>
                </li>
              </ul>

              <button className="ml-16" type="button">
                <Icon
                  id="#heart"
                  className="h-[26px] w-[26px] stroke-text-primary fill-none"
                />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-base leading-6">
                <span className="text-text-secondary font-medium">
                  Speaks:{' '}
                </span>
                <span className="text-text-primary font-medium underline">
                  {teacher.languages.join(', ')}
                </span>
              </p>
              <p className="text-base leading-6">
                <span className="text-text-secondary font-medium">
                  Lesson Info:{' '}
                </span>
                <span className="text-text-primary font-medium">
                  {teacher.lesson_info}
                </span>
              </p>
              <p className="text-base leading-6">
                <span className="text-text-secondary font-medium">
                  Conditions:{' '}
                </span>
                <span className="text-text-primary font-medium">
                  {teacher.conditions.join(' ')}
                </span>
              </p>
            </div>

            <button
              type="button"
              className="text-text-primary text-base font-medium leading-6 underline"
            >
              Read more
            </button>
          </div>

          <ul className="flex flex-wrap gap-2">
            {teacher.levels.map((level) => (
              <li
                key={level}
                className={`rounded-[35px] border border-text-primary/20 px-3 py-2 text-sm font-medium leading-4 ${
                  level === 'A1 Beginner' ? 'bg-interactive-button' : ''
                }`}
              >
                #{level}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
