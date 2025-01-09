'use client';

import Image from 'next/image';
import Modal from '@/components/common/Modal';
import BookTrialLessonForm from './BookTrialLessonForm';
import { Teacher } from '@/types/teachers';

interface BookTrialLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher;
}

const BookTrialLessonModal = ({
  isOpen,
  onClose,
  teacher,
}: BookTrialLessonModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book trial lesson"
      description="Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs."
    >
      <div className="mt-5">
        <ul className="flex items-center gap-3.5">
          <li>
            <Image
              src={teacher.avatar_url}
              alt={`${teacher.name} ${teacher.surname}`}
              width={44}
              height={44}
              className="rounded-full object-cover"
            />
          </li>
          <li className="space-y-1">
            <p className="text-brand-gray text-xs font-medium leading-4">
              Your teacher
            </p>
            <p className="text-text-primary text-base font-medium leading-6">
              {teacher.name} {teacher.surname}
            </p>
          </li>
        </ul>
      </div>
      <BookTrialLessonForm onClose={onClose} />
    </Modal>
  );
};

export default BookTrialLessonModal;
