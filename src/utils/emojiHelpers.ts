// Helper to map specialties, doctors, hospitals and clinics to emojis
export interface DoctorEmojiInfo {
  doctorEmoji: string;
  specialityEmoji: string;
  badgeBg: string;
  badgeText: string;
  gradientBg: string;
}

export function getDoctorEmoji(doctor?: {
  gender?: string;
  speciality?: string;
  specialityId?: string;
  name?: string;
  emoji?: string;
}): DoctorEmojiInfo {
  const gender = doctor?.gender || 'Male';
  const spec = (doctor?.speciality || doctor?.specialityId || '').toLowerCase();

  // If specific emoji property is assigned, use it
  if (doctor?.emoji) {
    return {
      doctorEmoji: doctor.emoji,
      specialityEmoji: '🩺',
      badgeBg: 'bg-blue-500/10',
      badgeText: 'text-blue-600',
      gradientBg: 'from-blue-50 to-indigo-100',
    };
  }

  const baseDoctor = gender === 'Female' ? '👩‍⚕️' : '👨‍⚕️';

  if (spec.includes('cardio') || spec.includes('heart')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '🫀',
      badgeBg: 'bg-rose-500/10',
      badgeText: 'text-rose-600',
      gradientBg: 'from-rose-50 to-red-100',
    };
  }

  if (spec.includes('neuro') || spec.includes('brain')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '🧠',
      badgeBg: 'bg-purple-500/10',
      badgeText: 'text-purple-600',
      gradientBg: 'from-purple-50 to-indigo-100',
    };
  }

  if (spec.includes('ortho') || spec.includes('bone') || spec.includes('joint')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '🦴',
      badgeBg: 'bg-amber-500/10',
      badgeText: 'text-amber-700',
      gradientBg: 'from-amber-50 to-orange-100',
    };
  }

  if (spec.includes('pedia') || spec.includes('child')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '👶',
      badgeBg: 'bg-pink-500/10',
      badgeText: 'text-pink-600',
      gradientBg: 'from-pink-50 to-rose-100',
    };
  }

  if (spec.includes('dent') || spec.includes('tooth') || spec.includes('teeth')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '🦷',
      badgeBg: 'bg-cyan-500/10',
      badgeText: 'text-cyan-700',
      gradientBg: 'from-cyan-50 to-sky-100',
    };
  }

  if (spec.includes('eye') || spec.includes('ophthalm')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '👁️',
      badgeBg: 'bg-emerald-500/10',
      badgeText: 'text-emerald-700',
      gradientBg: 'from-emerald-50 to-teal-100',
    };
  }

  if (spec.includes('gynec') || spec.includes('women') || spec.includes('obstetric')) {
    return {
      doctorEmoji: '👩‍⚕️',
      specialityEmoji: '🌸',
      badgeBg: 'bg-fuchsia-500/10',
      badgeText: 'text-fuchsia-700',
      gradientBg: 'from-fuchsia-50 to-pink-100',
    };
  }

  if (spec.includes('derma') || spec.includes('skin')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '✨',
      badgeBg: 'bg-yellow-500/10',
      badgeText: 'text-yellow-700',
      gradientBg: 'from-yellow-50 to-amber-100',
    };
  }

  if (spec.includes('pulmon') || spec.includes('chest') || spec.includes('lung')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '🫁',
      badgeBg: 'bg-sky-500/10',
      badgeText: 'text-sky-700',
      gradientBg: 'from-sky-50 to-cyan-100',
    };
  }

  if (spec.includes('ent') || spec.includes('ear') || spec.includes('throat')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '👂',
      badgeBg: 'bg-teal-500/10',
      badgeText: 'text-teal-700',
      gradientBg: 'from-teal-50 to-emerald-100',
    };
  }

  if (spec.includes('gastro') || spec.includes('liver') || spec.includes('digest')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '🥗',
      badgeBg: 'bg-lime-500/10',
      badgeText: 'text-lime-700',
      gradientBg: 'from-lime-50 to-green-100',
    };
  }

  if (spec.includes('nephro') || spec.includes('uro') || spec.includes('kidney')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '💧',
      badgeBg: 'bg-blue-500/10',
      badgeText: 'text-blue-700',
      gradientBg: 'from-blue-50 to-sky-100',
    };
  }

  if (spec.includes('surg') || spec.includes('laser')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '🩹',
      badgeBg: 'bg-red-500/10',
      badgeText: 'text-red-700',
      gradientBg: 'from-red-50 to-rose-100',
    };
  }

  if (spec.includes('psych') || spec.includes('mental')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '🧘‍♂️',
      badgeBg: 'bg-violet-500/10',
      badgeText: 'text-violet-700',
      gradientBg: 'from-violet-50 to-purple-100',
    };
  }

  if (spec.includes('physio') || spec.includes('rehab')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '🏃‍♂️',
      badgeBg: 'bg-orange-500/10',
      badgeText: 'text-orange-700',
      gradientBg: 'from-orange-50 to-amber-100',
    };
  }

  if (spec.includes('patho') || spec.includes('lab') || spec.includes('blood')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '🔬',
      badgeBg: 'bg-teal-500/10',
      badgeText: 'text-teal-700',
      gradientBg: 'from-teal-50 to-cyan-100',
    };
  }

  if (spec.includes('radio') || spec.includes('x-ray') || spec.includes('scan')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '🩻',
      badgeBg: 'bg-slate-500/10',
      badgeText: 'text-slate-700',
      gradientBg: 'from-slate-100 to-gray-200',
    };
  }

  if (spec.includes('cancer') || spec.includes('oncol')) {
    return {
      doctorEmoji: baseDoctor,
      specialityEmoji: '🎗️',
      badgeBg: 'bg-rose-500/10',
      badgeText: 'text-rose-700',
      gradientBg: 'from-rose-50 to-pink-100',
    };
  }

  // Default: General physician
  return {
    doctorEmoji: baseDoctor,
    specialityEmoji: '🩺',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-700',
    gradientBg: 'from-blue-50 to-sky-100',
  };
}
