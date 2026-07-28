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
    '.diplomas': 'Diplomas',
    '.skills': 'Habilidades',
    '.skills.description': 'Las habilidades se clasifican en básico, intermedio y avanzado.',
    '.skills.levels': 'El color rojo indica un nivel básico (conocimiento fundamental), el amarillo un nivel intermedio (dominio funcional) y el verde un nivel avanzado (dominio experto).',
  },
  en: {
    '.about': 'About',
    '.work': 'Work',
    '.education': 'Education',
    '.projects': 'Projects',
    '.diplomas': 'Diplomas',
    '.skills': 'Skills',
    '.skills.description': 'Skills are classified as basic, intermediate, and advanced.',
    '.skills.levels': 'Red indicates basic level (foundational knowledge), yellow indicates intermediate level (functional proficiency), and green indicates advanced level (expert proficiency).',
  },
} as const
