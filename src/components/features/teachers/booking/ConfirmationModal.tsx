import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationModal = ({ isOpen, onClose }: ConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Booking confirmed"
      description="Thank you for your booking! We will be in touch with you shortly to confirm the details."
    >
      <div className="mt-6 mb-8 flex justify-center">
        <div className="rounded-full bg-interactive-button/10 p-3 animate-[scale-up_0.3s_ease-out]">
          <Icon
            id="#checkmark"
            className="h-8 w-8 fill-brand-limeGreen stroke-brand-limeGreen
                       animate-[check-pop_0.5s_ease-out]"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={onClose} size="large" className="px-12">
          Great!
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
