import { NAV_ITEMS, defaultLanguage, showDefaultLanguage, ROUTES } from "./ui"

export function getLangFromUrl(url: URL) {
  const [, language] = url.pathname.split('/')

  if (language in NAV_ITEMS) {
    return language as keyof typeof NAV_ITEMS
  }

  return defaultLanguage
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname
  const parts = pathname?.split('/')
  const path = parts.pop()

  if (path === undefined) {
    return undefined
  }

  const currentLanguage = getLangFromUrl(url)

  if (defaultLanguage === currentLanguage) {
    const route = Object.values(ROUTES)[0]

    return route[path as keyof typeof route] !== undefined
      ? route[path as keyof typeof route]
      : path
  }

  const getKeyByValue = (
    obj: Record<string, string>,
    value: string
  ): string | undefined => {
    return Object.keys(obj).find((key) => obj[key] === value)
  }
  
  const reversedKey = getKeyByValue(ROUTES[currentLanguage], path);

  if (reversedKey === undefined) {
    return reversedKey
  }

  return undefined
}

export function useTranslations(language: keyof typeof NAV_ITEMS) {
  return function translate(key: keyof (typeof NAV_ITEMS)[typeof defaultLanguage]) { 
    return NAV_ITEMS[language][key] || NAV_ITEMS[defaultLanguage][key]
  }
}

export function useTranslatePath(language: keyof typeof NAV_ITEMS) {
  return function translatePath(path: string, lang: string = language) {
    const pathName = path.replaceAll('/', '')
    const hasTranslation =
      defaultLanguage !== lang &&
      (ROUTES[lang as keyof typeof ROUTES] as Record<string, string>)[pathName] !== undefined
    const translatePath = hasTranslation
      ? '/' + (ROUTES[lang as keyof typeof ROUTES] as Record<string, string>)[pathName]
      : path; 

    return !showDefaultLanguage && lang === defaultLanguage ? translatePath : `/${lang}${translatePath}`
  }
}