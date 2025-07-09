import type { AppProps } from 'next/app';
import { CustomThemeProvider } from '../lib/theme';
import { NotificationProvider } from '../lib/notifications';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CustomThemeProvider>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </CustomThemeProvider>
  );
}