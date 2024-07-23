const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
}

export const getColorScheme = ({ currentTheme = 'light' }: { currentTheme: string | undefined }) => {
  if (currentTheme === THEMES.DARK) {
    return THEMES.DARK
  }

  return THEMES.LIGHT
}