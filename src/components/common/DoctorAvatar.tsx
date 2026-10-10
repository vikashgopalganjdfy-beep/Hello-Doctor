import React from 'react';
import { getDoctorEmoji } from '../../utils/emojiHelpers';
import { Doctor } from '../../types';

interface DoctorAvatarProps {
  doctor?: Partial<Doctor> | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showSpecialityBadge?: boolean;
}

export const DoctorAvatar: React.FC<DoctorAvatarProps> = ({
  doctor,
  size = 'md',
  className = '',
  showSpecialityBadge = true,
}) => {
  const emojiInfo = getDoctorEmoji(doctor || undefined);

  const sizeClasses = {
    xs: {
      container: 'w-7 h-7 rounded-lg text-sm',
      badge: 'text-[9px] -bottom-1 -right-1 w-3.5 h-3.5',
    },
    sm: {
      container: 'w-10 h-10 rounded-xl text-xl',
      badge: 'text-[11px] -bottom-1 -right-1 w-4 h-4',
    },
    md: {
      container: 'w-20 h-20 sm:w-24 sm:h-24 rounded-2xl text-4xl sm:text-5xl',
      badge: 'text-base sm:text-lg -bottom-1.5 -right-1.5 w-7 h-7 sm:w-8 sm:h-8',
    },
    lg: {
      container: 'w-24 h-24 sm:w-28 sm:h-28 rounded-3xl text-5xl sm:text-6xl',
      badge: 'text-xl -bottom-2 -right-2 w-8 h-8 sm:w-9 sm:h-9',
    },
    xl: {
      container: 'w-28 h-28 sm:w-36 sm:h-36 rounded-3xl text-6xl sm:text-7xl',
      badge: 'text-2xl -bottom-2 -right-2 w-10 h-10',
    },
    '2xl': {
      container: 'w-36 h-36 sm:w-44 sm:h-44 rounded-3xl text-7xl sm:text-8xl',
      badge: 'text-3xl -bottom-3 -right-3 w-12 h-12',
    },
  }[size];

  return (
    <div className={`relative shrink-0 inline-flex items-center justify-center select-none ${className}`}>
      {/* Emoji Avatar Base */}
      <div
        className={`${sizeClasses.container} bg-gradient-to-br ${emojiInfo.gradientBg} border-2 border-white shadow-sm flex items-center justify-center transition-transform hover:scale-105 duration-200 cursor-default`}
        title={`${doctor?.name || 'Doctor'} • ${doctor?.speciality || 'Specialist'}`}
      >
        <span role="img" aria-label="Doctor Avatar" className="drop-shadow-xs">
          {emojiInfo.doctorEmoji}
        </span>
      </div>

      {/* Specialty Emoji Floating Badge */}
      {showSpecialityBadge && (
        <div
          className={`absolute ${sizeClasses.badge} bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100`}
          title={doctor?.speciality || 'Speciality'}
        >
          <span role="img" aria-label="Speciality Badge">
            {emojiInfo.specialityEmoji}
          </span>
        </div>
      )}
    </div>
  );
};
