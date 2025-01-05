'use client';

import Modal from '@/components/common/Modal';
import RegistrationForm from './RegistrationForm';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Registration"
      description="Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information"
    >
      <RegistrationForm />
    </Modal>
  );
};

export default RegistrationModal;
