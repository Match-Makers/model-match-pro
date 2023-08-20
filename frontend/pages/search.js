import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';
import ModelList from '@/components/ModelList';
import Responses from '@/components/Responses';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '@/contexts/auth';

export default function Search() {
  const { user } = useContext(AuthContext);
  const { push } = useRouter();
  useEffect(() => {
    if (!user || !user.id) {
      push('/login');
    }
  }, []);
  return (
    <>
      <Header />
      <SearchBar />
      <div className="flex">
        <ModelList />
        <Responses />
      </div>
    </>
  );
}
