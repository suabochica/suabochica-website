import { useEffect, useState } from 'react';
import { Dropdown } from 'suabochica-design-system';

type Theme = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'theme-preference';

function readPreference(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    // Use the system theme when storage is unavailable.
  }
  return 'system';
}

export default function ThemeSelector({ isEnglish }: { isEnglish: boolean }) {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    function syncPreference() {
      const preference = readPreference();
      setTheme(preference);
      document.documentElement.dataset.theme = preference;
    }
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY || event.key === null) syncPreference();
    }
    syncPreference();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  function changeTheme(value: string) {
    if (value !== 'system' && value !== 'light' && value !== 'dark') return;
    setTheme(value);
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // The theme still applies to the current page.
    }
  }

  return (
    <Dropdown
      className="theme-control"
      label={isEnglish ? 'Theme' : 'Tema'}
      value={theme}
      onChange={changeTheme}
      align="end"
      options={[
        { value: 'system', label: isEnglish ? 'System' : 'Sistema', icon: 'computer' },
        { value: 'light', label: isEnglish ? 'Light' : 'Claro', icon: 'sun-light' },
        { value: 'dark', label: isEnglish ? 'Dark' : 'Oscuro', icon: 'half-moon' },
      ]}
    />
  );
}
