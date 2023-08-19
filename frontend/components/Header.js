import { Navbar as BootstrapHeader } from 'reactstrap';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth';

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <BootstrapHeader>
      <h1>Model Match Pro</h1>
      <div>
        <button>About</button>
        {user && user.id && <button>History</button>}
        {user && user.id && <button>Sign Out</button>}
      </div>
    </BootstrapHeader>
  );
}
