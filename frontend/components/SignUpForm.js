import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function SignUpForm({ onRegister}) {

  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    onRegister(userName, password);
    router.push("/search"); // auto-redirect to logged-in search page after signup
  }
  return (
    <form
      className="flex flex-col items-center max-w-2xl mx-auto my-6 rounded-md bg-slate-400"
      onSubmit={handleSubmit}
    >

      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          className="form-control"
          type="text"
          id="username"
          name="username"
          value={userName}
          aria-describedby="username"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          className="form-control"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          className="form-control"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

      <button type="submit" className="mb-4 btn btn-primary">
        Sign Up
      </button>

      <div className="mb-3">
        <p>
          <Link href={'/login'}>Sign In</Link> if you already have an account
        </p>
      </div>

    </form>
  );
}
