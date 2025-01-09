'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
      <DialogContent className="animate-modal max-h-[90vh] max-w-[566px] rounded-[30px] overflow-hidden flex flex-col">
        <div className="px-16 pt-16">
          <DialogHeader className="flex-shrink-0">
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
              <DialogDescription className="mt-5 pb-1 text-base text-text-primary/80 leading-[22px]">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-background-backdrop scrollbar-thumb-accent-primary/30 hover:scrollbar-thumb-accent-primary/70">
          <div className="px-16 pb-16">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
