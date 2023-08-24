import React, { useContext } from 'react';
import { Navbar as BootstrapHeader } from 'reactstrap';
import { AuthContext } from '@/contexts/auth';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleAboutClick = () => {
    window.location.href = '/about';
  };

  return (
    <BootstrapHeader>
      <h1>Model Match Pro</h1>
      <div>
        <button className="btn btn-secondary" onClick={handleAboutClick}>
          About
        </button>
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
