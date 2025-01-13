'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import { selectIsFavorite } from '@/store/favorites/favoritesSelectors';
import { toggleFavoriteTeacher } from '@/store/favorites/favoritesOperations';
import type { Teacher } from '@/types/teachers';
import Icon from '@/components/common/Icon';
import TeacherExperience from './TeacherExperience';
import TeacherReviews from './TeacherReviews';
import Button from '@/components/common/Button';
import BookTrialLessonModal from './booking/BookTrialLessonModal';
import UnauthorizedFavoritesModal from '../auth/UnauthorizedFavoritesModal';
import RegistrationModal from '../auth/RegistrationModal';
import LoginModal from '../auth/LoginModal';
import Image from 'next/image';
import { selectLevelFilter } from '@/store/filters/filtersSelectors';
import { formatDatabaseLevel } from '@/lib/utils/formatters';

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  const currentLevelFilter = useAppSelector(selectLevelFilter);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isUnauthorizedModalOpen, setIsUnauthorizedModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsFavorite(teacher.id));

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      setIsUnauthorizedModalOpen(true);
    } else {
      try {
        await dispatch(toggleFavoriteTeacher(teacher.id)).unwrap();
      } catch (error) {
        console.error('Failed to update favorites:', error);
      }
    }
  };

  return (
    <div className="rounded-3xl bg-brand-white p-4 sm:p-5 md:p-6">
      <div className="flex flex-col gap-4 sm:gap-6 md:flex-row xl:gap-12">
        <div className="flex justify-center md:block">
          <div className="relative h-[120px] w-[120px] rounded-full border-[3px] border-interactive-avatar bg-brand-white p-3">
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
                className="absolute right-1 top-1 h-4 w-4 fill-brand-limeGreen rounded-full border-[3px] border-brand-white"
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div className="flex flex-1 flex-col lg:flex-row sm:items-center">
              <p className="text-center text-text-secondary text-base font-medium leading-6 sm:text-left">
                Teacher information
              </p>

              <ul className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 md:ml-auto md:mt-2">
                <li className="flex items-center justify-center sm:justify-start">
                  <Icon
                    id="#book"
                    className="h-4 w-4 shrink-0 fill-none stroke-brand-dark"
                  />
                  <span className="ml-2 text-text-primary text-base font-medium leading-6">
                    Lessons online
                  </span>
                </li>
                <li className="hidden sm:block sm:h-4 sm:w-px xl:mx-4 sm:bg-text-primary/20" />
                <li className="text-center text-text-primary text-base font-medium leading-6 sm:text-left">
                  Lessons done: {teacher.lessons_done}
                </li>
                <li className="hidden sm:block sm:h-4 sm:w-px xl:mx-4 sm:bg-text-primary/20" />
                <li className="flex items-center justify-center sm:justify-start">
                  <Icon
                    id="#star"
                    className="h-5 w-5 shrink-0 fill-interactive-rating"
                  />
                  <span className="ml-2 text-text-primary text-base font-medium leading-6">
                    Rating: {teacher.rating.toFixed(1)}
                  </span>
                </li>
                <li className="hidden sm:block sm:h-4 sm:w-px xl:mx-4 sm:bg-text-primary/20" />
                <li className="text-center text-text-primary text-base font-medium leading-6 sm:text-left">
                  Price / 1 hour:{' '}
                  <span className="text-interactive-price">
                    {teacher.price_per_hour}$
                  </span>
                </li>
              </ul>
            </div>

            <Button
              variant="icon"
              size="icon"
              className="mx-auto sm:mx-0 sm:ml-4 xl:ml-16"
              onClick={handleFavoriteClick}
            >
              <Icon
                id="#heart"
                className={`h-[26px] w-[26px] ${
                  isFavorite
                    ? 'stroke-interactive-button fill-interactive-button transition-all'
                    : 'stroke-text-primary fill-none transition-all'
                }`}
              />
            </Button>
          </div>

          <h3 className="mt-4 text-center text-text-primary text-2xl font-medium leading-6 sm:mt-2 sm:text-left">
            {teacher.name} {teacher.surname}
          </h3>

          <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-2">
            <p className="text-base leading-6">
              <span className="text-text-secondary font-medium">Speaks: </span>
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

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-4">
                  <TeacherExperience experience={teacher.experience} />
                  <TeacherReviews reviews={teacher.reviews} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="mt-4 flex items-center justify-center text-text-primary text-base font-medium leading-6 hover:text-accent-primary transition-colors sm:justify-start"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="underline mr-1">
              {isExpanded ? 'Show less' : 'Read more'}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon id="#arrow" className="h-4 w-4 stroke-current" />
            </motion.div>
          </button>

          <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start sm:mt-8">
            {teacher.levels.map((level) => (
              <li
                key={level}
                className={`rounded-[35px] border border-text-primary/20 px-3 py-2 text-sm font-medium leading-4 ${
                  formatDatabaseLevel(level) === currentLevelFilter
                    ? 'bg-interactive-button'
                    : ''
                }`}
              >
                #{level}
              </li>
            ))}
          </ul>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.1 }}
                className="mt-6 flex justify-center sm:justify-start sm:mt-8"
              >
                <Button
                  className="w-full px-12 sm:w-fit"
                  size="large"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Book trial lesson
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <BookTrialLessonModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        teacher={teacher}
      />

      <UnauthorizedFavoritesModal
        isOpen={isUnauthorizedModalOpen}
        onClose={() => setIsUnauthorizedModalOpen(false)}
        onLogin={() => setIsLoginModalOpen(true)}
        onRegister={() => setIsRegistrationModalOpen(true)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
      />
    </div>
  );
};

export default TeacherCard;
