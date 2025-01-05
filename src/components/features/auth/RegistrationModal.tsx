import { useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import Modal from '@/components/common/Modal';
import RegistrationForm from './RegistrationForm';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

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
