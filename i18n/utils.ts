import { SECTION_TITLES, defaultLanguage, showDefaultLanguage } from "./ui"

export function getLangFromUrl(url: URL) {
  const [, language] = url.pathname.split('/')

  if (language in SECTION_TITLES) {
    return language as keyof typeof SECTION_TITLES
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

  const getKeyByValue = (
    obj: Record<string, string>,
    value: string
  ): string | undefined => {
    return Object.keys(obj).find((key) => obj[key] === value)
  }
  
  return undefined
}

export function useTranslations(language: keyof typeof SECTION_TITLES) {
  return function translate(key: keyof (typeof SECTION_TITLES)[typeof defaultLanguage]) { 
    return SECTION_TITLES[language][key] || SECTION_TITLES[defaultLanguage][key]
  }
}
