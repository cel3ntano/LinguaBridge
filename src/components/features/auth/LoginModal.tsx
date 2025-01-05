'use client';

import Modal from '@/components/common/Modal';
import LoginForm from './LoginForm';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
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
