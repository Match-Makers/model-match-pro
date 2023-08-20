import { Navbar as BootstrapHeader } from 'reactstrap';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <BootstrapHeader>
      <h1>Model Match Pro</h1>
      <div>
        <button className="btn btn-secondary">About</button>
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
