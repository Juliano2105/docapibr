import React, { ChangeEvent } from 'react';

interface CPFInputProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export default function CPFInput({ value, onChange, isLoading }: CPFInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    
    if (val.length > 11) val = val.slice(0, 11);

    // Apply Mask 000.000.000-00
    let masked = val;
    if (val.length > 9) {
      masked = `${val.slice(0, 3)}.${val.slice(3, 6)}.${val.slice(6, 9)}-${val.slice(9)}`;
    } else if (val.length > 6) {
      masked = `${val.slice(0, 3)}.${val.slice(3, 6)}.${val.slice(6)}`;
    } else if (val.length > 3) {
      masked = `${val.slice(0, 3)}.${val.slice(3)}`;
    }

    onChange(masked);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="000.000.000-00"
        value={value}
        onChange={handleChange}
        disabled={isLoading}
        className="w-full bg-dark-surface border border-dark-surface focus:border-blue-accent/50 focus:ring-2 focus:ring-blue-accent/20 rounded-lg px-4 py-3 text-white placeholder-dark-text-muted transition-all outline-none"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-accent border-t-transparent" />
        </div>
      )}
    </div>
  );
}
