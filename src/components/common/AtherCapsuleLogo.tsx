import React from 'react';

interface Props {
  className?: string;
  height?: number;
}

export const AtherCapsuleLogo: React.FC<Props> = ({ className = '', height = 10 }) => {
  return (
    <div
      className={`inline-flex items-center justify-center bg-white border border-slate-200/90 px-1.5 py-0.5 rounded-full shadow-2xs shrink-0 select-none ${className}`}
      title="Ather Energy"
    >
      <img
        src="/logo/ather-logo.png"
        alt="Ather"
        style={{ height: `${height}px` }}
        className="w-auto object-contain block"
      />
    </div>
  );
};
