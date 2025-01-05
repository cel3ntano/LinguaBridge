import { useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import Modal from '@/components/common/Modal';
import LoginForm from './LoginForm';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
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
      title="Log In"
      description="Welcome back! Please enter your credentials to access your account and continue your search for an teacher."
    >
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
