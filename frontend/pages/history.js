import Header from '@/components/Header';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '@/contexts/auth';
import History from '@/components/History';

export default function HistoryPage() {
  const { user } = useContext(AuthContext);
  const { push } = useRouter();
  useEffect(() => {
    console.error('HistoryPage', { user });
    if (!user || !user.id) {
      push('/login');
    }
  }, [user]);
  return (
    <>
      <Header />
      <History />
    </>
  );
}
