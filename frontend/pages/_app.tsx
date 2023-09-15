// Import necessary dependencies and CSS here
import '@/styles/reset.css';
import '@/styles/globals.css';
import 'bootswatch/dist/journal/bootstrap.min.css';
import { AuthProvider } from '@/contexts/auth';
import ModelsProvider from '@/contexts/models';
import PromptsProvider from '@/contexts/prompts';
import SearchProvider from '@/contexts/search';

import { Roboto } from 'next/font/google';

const robotoFont = Roboto({ weight: ['500'], subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ModelsProvider>
        <PromptsProvider>
          <SearchProvider>
            <main className={robotoFont.className}>
              <Component {...pageProps} />
            </main>
          </SearchProvider>
        </PromptsProvider>
      </ModelsProvider>
    </AuthProvider>
  );
}
