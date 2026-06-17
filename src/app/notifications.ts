import { toast } from 'sonner';

const notify = {
  success(message: string): void {
    toast.success(message);
  },
  error(message: string): void {
    toast.error(message);
  },
};

export { notify };
