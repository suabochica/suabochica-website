import Spain from '@/components/flags/Spain.astro'
import UnitedStates from '@/components/flags/UnitedStates.astro'

export const defaultLanguage = 'es';
export const showDefaultLanguage = false;

export const LANGUAGES: Record<string, { code: string; name: string; flag: typeof Spain }> = {
  en: {
    code: 'en',
    name: 'English',
    flag: UnitedStates
  },
  es: {
    code: 'es',
    name: 'Español',
    flag: Spain
  }
};

export const SECTION_TITLES = {
  es: {
    '.about': 'Sobre mí',
    '.work': 'Trabajo',
    '.education': 'Educación',
    '.projects': 'Proyectos',
    '.skills': 'Habilidades',
  },
  en: {
    '.about': 'About',
    '.work': 'Work',
    '.education': 'Education',
    '.projects': 'Projects',
    '.skills': 'Skills',
  },
} as const
