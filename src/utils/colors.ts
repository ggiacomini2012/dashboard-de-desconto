// Paleta de cores harmoniosa para os segmentos
export const segmentColors = {
  'ACESS': {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-800',
    badge: 'bg-purple-100 text-purple-800',
    accent: 'bg-purple-500'
  },
  'SKATE': {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-800',
    badge: 'bg-orange-100 text-orange-800',
    accent: 'bg-orange-500'
  },
  'COLEÇÃO': {
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    text: 'text-pink-800',
    badge: 'bg-pink-100 text-pink-800',
    accent: 'bg-pink-500'
  },
  'CALÇ': {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    badge: 'bg-blue-100 text-blue-800',
    accent: 'bg-blue-500'
  },
  'FEM': {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-800',
    badge: 'bg-rose-100 text-rose-800',
    accent: 'bg-rose-500'
  },
  'MASC': {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-800',
    badge: 'bg-indigo-100 text-indigo-800',
    accent: 'bg-indigo-500'
  }
} as const;

export const getSegmentColor = (segment: string) => {
  return segmentColors[segment as keyof typeof segmentColors] || {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-800',
    badge: 'bg-gray-100 text-gray-800',
    accent: 'bg-gray-500'
  };
};