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
    '.projects.description': 'A continuación se presentan algunos de los proyectos en los que he trabajado, mostrando mis habilidades y experiencia en diversas áreas.',
    '.skills': 'Habilidades',
    '.skills.description': 'Mis habilidades se clasifican en una escala que va desde conceptos fundamentales hasta el dominio total. El nivel <strong>básico</strong> (píldora roja) abarca hechos esenciales y reglas estándar para resolver tareas sencillas. El nivel <strong>intermedio</strong> (píldora amarilla) combina la teoría con la aplicación práctica, lo que me permite trabajar de forma autónoma y solucionar problemas rutinarios. El nivel <strong>avanzado</strong> (píldora verde) representa una profunda experiencia, utilizada para resolver desafíos complejos, innovar en soluciones y evaluar metodologías.',
  },
  en: {
    '.about': 'About me',
    '.work': 'Work',
    '.education': 'Education',
    '.projects': 'Projects',
    '.projects.description': 'Below are some of the projects I have worked on, showcasing my skills and expertise in various areas.',
    '.diplomas': 'Diplomas',
    '.skills': 'Skills',
    '.skills.description': 'My skills scale from foundational concepts to total mastery. <strong>Basic</strong> (red pill) covers core facts and standard rules for handling simple tasks. <strong>Intermediate</strong> (yellow pill) blends theory with practical application, allowing me to work independently and troubleshoot routine problems. <strong>Advanced</strong> (green pill) represents deep expertise used to solve complex challenges, innovate solutions, and critique methodologies.',
  },
} as const

export const HOW_I_WORK = {
  en: {
    title: 'How I work',
    description: 'Connecting engineering, user experience, and teamwork to turn ideas into sustainable products.',
    hint: 'Scroll to explore',
    layers: [
      { id: 'developer', title: 'Developer', description: 'I build reliable, maintainable software that solves real problems and grows with the product.' },
      { id: 'designer', title: 'Designer', description: 'I connect product goals with clear, accessible experiences, paying attention to the details that matter to users.' },
      { id: 'manager', title: 'Manager', description: 'I align priorities, share knowledge, and help teams deliver with confidence through collaboration and continuous improvement.' },
    ],
  },
  es: {
    title: 'Cómo trabajo',
    description: 'Conecto ingeniería, experiencia de usuario y trabajo en equipo para transformar ideas en productos sostenibles.',
    hint: 'Desplázate para explorar',
    layers: [
      { id: 'developer', title: 'Desarrollador', description: 'Construyo software confiable y mantenible que resuelve problemas reales y crece con el producto.' },
      { id: 'designer', title: 'Diseñador', description: 'Conecto los objetivos del producto con experiencias claras y accesibles, cuidando los detalles que les importan a los usuarios.' },
      { id: 'manager', title: 'Gestor', description: 'Alineo prioridades, comparto conocimiento y ayudo a los equipos a entregar con confianza mediante la colaboración y la mejora continua.' },
    ],
  },
} as const;
