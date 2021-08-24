import { AuthContextProvider } from 'contexts/AuthContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/global';
import light from 'styles/themes/light';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyle />
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
