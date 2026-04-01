import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, actions }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-dark-surface w-full max-w-md rounded-2xl border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-dark-text-muted transition">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        {actions && (
          <div className="p-6 bg-dark-bg/50 rounded-b-2xl flex justify-end gap-3 border-t border-white/5">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
