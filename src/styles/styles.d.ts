import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      blueDark: string;
      secondary: string;
      text: string;
      dark: string;
      background: string;
      white: string;
      gray100: string;
      gray200: string;
    };
  }
}
