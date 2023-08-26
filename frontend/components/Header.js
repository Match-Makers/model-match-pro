// import React, { useContext } from 'react';
// import { Navbar as BootstrapHeader } from 'reactstrap';
// import { AuthContext } from '@/contexts/auth';
// import Link from 'next/link';

// export default function Header() {
//   const { user, logout } = useContext(AuthContext);

//   const handleAboutClick = () => {
//     window.location.href = '/about';
//   };

//   const handleSearchClick = () => {
//     window.location.href = '/search';
//   };

//   const handleSignInClick = () => {
//     window.location.href = '/login';
//   };

//   const isOnSearchPage = window.location.pathname === '/search';
//   const isOnAboutPage = window.location.pathname === '/about';

//   // new
  
//   const isOnSignInPage = window.location.pathname === '/login';

  

//   return (
//     <BootstrapHeader>
//       <h1>Model Match Pro</h1>
//       <div>
//         {!isOnAboutPage && (
//           <button className="btn btn-secondary" onClick={handleAboutClick}>
//             About
//           </button>
//         )}
//         {/* new */}
//         {!isOnSignInPage && (
//           <button className="btn btn-secondary" onClick={handleSignInClick}>
//             Sign In
//           </button>
//         )}
//         {/* end */}
//         {user && user.id && !isOnSearchPage && (
//           <button className="btn btn-secondary" onClick={handleSearchClick}>
//             Home
//           </button>
//         )}
//         {user && user.id && (
//           <Link href="/history">
//             <button className="btn btn-secondary">History</button>
//           </Link>
//         )}
//         {user && user.id && (
//           <button className="btn btn-secondary" onClick={() => logout()}>
//             Sign Out
//           </button>
//         )}
//       </div>
//     </BootstrapHeader>
//   );
// }

import React, { useContext } from 'react';
import { Navbar as BootstrapHeader } from 'reactstrap';
import { AuthContext } from '@/contexts/auth';
import Link from 'next/link';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleAboutClick = () => {
    window.location.href = '/about';
  };

  const handleSearchClick = () => {
    window.location.href = '/search';
  };
  
  const handleSignInClick = () => {
        window.location.href = '/login';
      };
    

  const isOnSearchPage = window.location.pathname === '/search';
  const isOnAboutPage = window.location.pathname === '/about';
  const isOnSignInPage = window.location.pathname === '/login';
  const isOnHistoryPage = window.location.pathname === '/history'; 


  return (
    <BootstrapHeader>
      <h1>Model Match Pro</h1>
      <div>
        {!user && !isOnSignInPage && ( // Check if user is not authenticated
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
