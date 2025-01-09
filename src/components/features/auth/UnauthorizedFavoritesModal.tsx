import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

interface UnauthorizedFavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const UnauthorizedFavoritesModal = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}: UnauthorizedFavoritesModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Favorites list"
      description="Adding teachers to favorites is available to authenticated users only. Please create an account or log in."
    >
      <div className="mt-6 mb-8 flex justify-center">
        <div className="rounded-full bg-interactive-button/10 p-3 animate-[scale-up_0.3s_ease-out]">
          <Icon
            id="#heart"
            className="h-8 w-8 stroke-interactive-favorite fill-none animate-[check-pop_0.5s_ease-out]"
          />
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button
          variant="registration"
          onClick={() => {
            onClose();
            onRegister();
          }}
        >
          Sign Up
        </Button>
        <Button
          variant="primary"
          className="px-10 py-3"
          onClick={() => {
            onClose();
            onLogin();
          }}
        >
          Log In
        </Button>
      </div>
    </Modal>
  );
};

export default UnauthorizedFavoritesModal;
