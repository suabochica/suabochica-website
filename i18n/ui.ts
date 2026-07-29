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
    '.skills.description': 'Mis habilidades se clasifican en una escala que va desde conceptos fundamentales hasta el dominio total. El nivel <strong>básico</strong> (píldora roja) abarca hechos esenciales y reglas estándar para resolver tareas sencillas. El nivel <strong>intermedio</strong> (píldora amarilla) combina la teoría con la aplicación práctica, lo que me permite trabajar de forma autónoma y solucionar problemas rutinarios. El nivel <strong>avanzado</strong> (píldora verde) representa una profunda experiencia, utilizada para resolver desafíos complejos, innovar en soluciones y evaluar metodologías.',
  },
  en: {
    '.about': 'About me',
    '.work': 'Work',
    '.education': 'Education',
    '.projects': 'Projects',
    '.diplomas': 'Diplomas',
    '.skills': 'Skills',
    '.skills.description': 'My skills scale from foundational concepts to total mastery. <strong>Basic</strong> (red pill) covers core facts and standard rules for handling simple tasks. <strong>Intermediate</strong> (yellow pill) blends theory with practical application, allowing me to work independently and troubleshoot routine problems. <strong>Advanced</strong> (green pill) represents deep expertise used to solve complex challenges, innovate solutions, and critique methodologies.',
  },
} as const
