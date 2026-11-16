import React from 'react';

interface Props {
  imageSrc: string;
  propSrc?: string;
  title?: string;
  sopClause?: string;
  isPaused?: boolean;
}

export const FacilityPhotoFrame: React.FC<Props> = ({
  imageSrc,
  title,
}) => {
  return (
    <div className="relative w-full h-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-md select-none flex items-center justify-center">
      <img
        src={imageSrc}
        alt={title || 'Ather Facility'}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
