// Import necessary dependencies and CSS here
import React, { useState, useEffect } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import '@/styles/globals.css';
import 'bootswatch/dist/journal/bootstrap.min.css';
import { AuthProvider } from '@/contexts/auth';
import ModelsProvider from '@/contexts/models';
import PromptsProvider from '@/contexts/prompts';

export default function App({ Component, pageProps }) {
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 3-second loading period
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  // Custom CSS for loader
  const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <AuthProvider>
      <ModelsProvider>
        <PromptsProvider>
          {isLoading ? (
            // If page is still loading, display the PacmanLoader
            <PacmanLoader
              color={'#36D7B7'}
              isLoading={isLoading}
              css={override}
              size={150}
            />
          ) : (
            // When loading is complete, display the main component with ClockLoader
            <>
              <Component {...pageProps} />
              
            </>
          )}
        </PromptsProvider>
      </ModelsProvider>
    </AuthProvider>
  );
}
