import { SECTION_TITLES, defaultLanguage } from "./ui"

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
}

export function useTranslations(language: keyof typeof SECTION_TITLES) {
  return function translate(key: keyof (typeof SECTION_TITLES)[typeof defaultLanguage]) { 
    return SECTION_TITLES[language][key] || SECTION_TITLES[defaultLanguage][key]
  }
}
