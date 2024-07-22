import english from './cv_en.json'
import spanish from './cv_es.json'

const LANGUAGES = {
  ENGLISH: 'en',
  SPANISH: 'es'
}

export const getI18N = ({ currentLocale = 'es' }: { currentLocale: string | undefined }) => {
  if (currentLocale === LANGUAGES.ENGLISH) {
    return {...spanish, ...english}
  }

  return spanish
}