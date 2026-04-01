import { AlertCircle } from 'lucide-react';

export default function ErrorAlert({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl flex items-start gap-3 my-4">
      <AlertCircle className="shrink-0 mt-0.5" size={20} />
      <p className="flex-1">{message}</p>
    </div>
  );
}
