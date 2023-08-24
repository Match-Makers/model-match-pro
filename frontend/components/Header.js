import { Navbar as BootstrapHeader } from 'reactstrap';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth';
import Link from 'next/link';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <BootstrapHeader>
      <h1>Model Match Pro</h1>
      <div>
        <Link href="/about">
          <button className="btn btn-secondary">About</button>
        </Link>
        {user && user.id && (
          <Link href="/history">
            <button className="btn btn-secondary">History</button>
          </Link>
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
