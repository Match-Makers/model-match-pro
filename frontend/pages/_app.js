import '@/styles/globals.css';
import 'bootswatch/dist/journal/bootstrap.min.css';
import { AuthProvider } from '@/contexts/auth';
import ModelsProvider from '@/contexts/models';
import PromptsProvider from '@/contexts/prompts';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ModelsProvider>
        <PromptsProvider>
          <Component {...pageProps} />{' '}
        </PromptsProvider>
      </ModelsProvider>
    </AuthProvider>
  );
}
