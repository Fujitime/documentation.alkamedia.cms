declare module 'gatsby-plugin-dark-mode' {
  export interface ThemeTogglerProps {
    theme: string;
    toggleTheme: () => void;
  }

  export const ThemeToggler: React.FC<{ children: (props: ThemeTogglerProps) => React.ReactNode }>;
}
