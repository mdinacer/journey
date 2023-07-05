import { Toaster } from '@/components/Toaster';
import { store } from '@/stores/configureStore';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}
