import React, { useContext } from 'react';
import { Navbar as BootstrapHeader } from 'reactstrap';
import { AuthContext } from '@/contexts/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleAboutClick = () => {
    router.push('/');
  };

  const handleSearchClick = () => {
    router.push('/search');
  };

  const handleSignInClick = () => {
    router.push('/login');
  };

  const isOnSearchPage = router.pathname === '/search';
  const isOnAboutPage = router.pathname === '/about';
  const isOnSignInPage = router.pathname === '/login';
  const isOnHistoryPage = router.pathname === '/history';

  return (
    <BootstrapHeader>
      <h1>Model Match Pro</h1>
      <div>
        {!user &&
          !isOnSignInPage && ( // Check if user is not authenticated
            <button className="btn btn-secondary" onClick={handleSignInClick}>
              Sign In
            </button>
          )}
        {user && user.id && !isOnSearchPage && (
          <button className="btn btn-secondary" onClick={handleSearchClick}>
            Home
          </button>
        )}
        {user && user.id && !isOnHistoryPage && (
          <Link href="/history">
            <button className="btn btn-secondary">History</button>
          </Link>
        )}
        {!isOnAboutPage && (
          <button className="btn btn-secondary" onClick={handleAboutClick}>
            About
          </button>
        )}
        {user && user.id && (
          <button className="btn btn-secondary" onClick={() => logout()}>
            Sign Out
          </button>
        )}
      </div>
    </BootstrapHeader>
  );
}
