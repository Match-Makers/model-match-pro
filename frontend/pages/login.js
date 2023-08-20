import Header from '@/components/Header';
import SignIn from '@/components/SignIn';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AuthContext } from '@/contexts/auth';

export default function Login() {
  const { user } = useContext(AuthContext);
  const { push } = useRouter();
  useEffect(() => {
    if (user && user.id) {
      push('/search');
    }
  }, [user]);
  return (
    <>
      <Header>
        <button>this is the button</button>{' '}
      </Header>
      <SignIn />
    </>
  );
}
