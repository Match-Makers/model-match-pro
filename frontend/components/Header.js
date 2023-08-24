import React, { useContext } from 'react';
import { Navbar as BootstrapHeader } from 'reactstrap';
import { AuthContext } from '@/contexts/auth';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleAboutClick = () => {
    window.location.href = '/about';
  };

  const handleSearchClick = () => {
    window.location.href = '/search';
  };

  const isOnSearchPage = window.location.pathname === '/search';
  const isOnAboutPage = window.location.pathname === '/about';

  return (
    <BootstrapHeader>
      <h1>Model Match Pro</h1>
      <div>
        {!isOnAboutPage && (
          <button className="btn btn-secondary" onClick={handleAboutClick}>
            About
          </button>
        )}
        {user && user.id && !isOnSearchPage && (
          <button className="btn btn-secondary" onClick={handleSearchClick}>
            Home
          </button>
        )}
        {user && user.id && (
          <button className="btn btn-secondary">History</button>
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
