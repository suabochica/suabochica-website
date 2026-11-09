# Website patterns to consider for the design system

The published `suabochica-design-system@1.4.0` remains the source of truth for
tokens and shared components. These compositions arose while integrating the
Astro website. Develop reusable APIs and stories in the design-system repository,
publish a version, then replace the site composition with the published export.

| Candidate | Website reference | Proposed contract and Storybook cases |
| --- | --- | --- |
| ResumeEntry | `src/components/ResumeEntry.astro` | Organization, role/qualification, semantic date range and free-form description. Show work, education, missing end date, long Spanish text and narrow screens. |
| CredentialCard | `src/components/sections/Diplomas.astro` | Title, issuer, date, uncropped image and explicit destination link. Show missing image, long title, light/dark/system and a printable collection. Require actual image dimensions from the consumer. |
| IconLink / SocialLinks | `src/components/Hero.astro` | Accessible icon-only link built on the packaged `Icon`, with a visible focus state and external-link behavior; collections should wrap at mobile widths and support non-social actions. |
| ThemePreferenceControl | `src/components/react/ThemeSelector.tsx` | Light/dark/system preference UI for the documented `.sua-theme` contract. Keep storage and document background consumer-owned; show keyboard interaction and unavailable-storage behavior. |
| LanguageSwitcher | `src/components/Hero.astro` | Alternate-language link with explicit `lang` and accessible name, keeping route resolution in the consumer. Show both directions and long locale names. |
| Command-palette integration guide | `src/components/KeyboardManager.astro` | Document mapping semantic tokens to third-party shadow-DOM variables, localization, focus and reduced-motion limitations. A full palette component is only warranted if reused elsewhere. |

For contributions, compare against the existing Heading, Text, TextLink, Badge,
Figure, Surface, MetadataRow and ProjectShowcaseCard stories before adding new
components; prefer composing them over duplicating their styling or behavior.
