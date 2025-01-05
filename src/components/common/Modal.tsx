'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/dialog';
import Button from './Button';
import Icon from './Icon';
import { DialogClose } from '@radix-ui/react-dialog';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="animate-overlay bg-brand-dark/10 backdrop-blur-[2px]" />
      <DialogContent className="animate-modal max-w-[566px] rounded-[30px] p-16 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        <DialogHeader>
          <DialogClose asChild>
            <Button
              variant="icon"
              size="icon"
              className="absolute right-5 top-5 transition-transform hover:scale-110"
              onClick={onClose}
              aria-label="Close"
            >
              <Icon
                id="#close"
                className="h-8 w-8 stroke-brand-dark fill-none"
              />
            </Button>
          </DialogClose>
          <DialogTitle className="text-4xl font-medium leading-[48px] tracking-[-0.8px]">
            {title}
          </DialogTitle>
          {description && (
            <p className="mt-5 text-base text-text-primary/80 leading-[22px]">
              {description}
            </p>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
