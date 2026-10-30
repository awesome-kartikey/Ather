import { create } from 'zustand';

export interface ConfirmOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary' | 'info';
  icon?: string;
}

interface ConfirmState {
  isOpen: boolean;
  options: ConfirmOptions;
  resolver: ((value: boolean) => void) | null;
  openConfirm: (options: ConfirmOptions) => Promise<boolean>;
  closeConfirm: (result: boolean) => void;
}

export const useConfirmStore = create<ConfirmState>((set, get) => ({
  isOpen: false,
  options: {
    title: 'Are you sure?',
    description: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    variant: 'danger',
  },
  resolver: null,

  openConfirm: (options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      set({
        isOpen: true,
        options: {
          confirmText: 'Confirm',
          cancelText: 'Cancel',
          variant: 'danger',
          ...options,
        },
        resolver: resolve,
      });
    });
  },

  closeConfirm: (result: boolean) => {
    const { resolver } = get();
    if (resolver) {
      resolver(result);
    }
    set({ isOpen: false, resolver: null });
  },
}));

export function useConfirm() {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  return openConfirm;
}
