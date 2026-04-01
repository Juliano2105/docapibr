import React, { ChangeEvent } from 'react';

interface CNPJInputProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export default function CNPJInput({ value, onChange, isLoading }: CNPJInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    
    if (val.length > 14) val = val.slice(0, 14);

    // Apply Mask 00.000.000/0000-00
    let masked = val;
    if (val.length > 12) {
      masked = `${val.slice(0, 2)}.${val.slice(2, 5)}.${val.slice(5, 8)}/${val.slice(8, 12)}-${val.slice(12)}`;
    } else if (val.length > 8) {
      masked = `${val.slice(0, 2)}.${val.slice(2, 5)}.${val.slice(5, 8)}/${val.slice(8)}`;
    } else if (val.length > 5) {
      masked = `${val.slice(0, 2)}.${val.slice(2, 5)}.${val.slice(5)}`;
    } else if (val.length > 2) {
      masked = `${val.slice(0, 2)}.${val.slice(2)}`;
    }

    onChange(masked);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="00.000.000/0000-00"
        value={value}
        onChange={handleChange}
        disabled={isLoading}
        className="w-full bg-dark-surface border border-dark-surface focus:border-purple-accent/50 focus:ring-2 focus:ring-purple-accent/20 rounded-lg px-4 py-3 text-white placeholder-dark-text-muted transition-all outline-none"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-accent border-t-transparent" />
        </div>
      )}
    </div>
  );
}
