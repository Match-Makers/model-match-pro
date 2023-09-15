import { useAuth } from '@/contexts/auth';
import Link from 'next/link';

export default function SignIn() {
  const { login } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let user = {
      username: '',
      password: '',
    };
    for (let entry of formData.entries()) {
      user[entry[0]] = entry[1];
    }
    login(user.username, user.password);
  }

  return (
    <form
      className="flex flex-col items-center max-w-2xl mx-auto my-6 rounded-lg bg-slate-200"
      onSubmit={handleSubmit}
    >
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          name="username"
          className="form-control"
          id="username"
          aria-describedby="username"
          data-testid="SignIn-username"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="password"
        />
      </div>
      <button type="submit" className="mb-4 btn btn-primary">
        Sign In
      </button>
      <div className="mb-3">
        <p>
          <Link href={'/register'}>Sign Up</Link> if you don&apos;t
          already have an account.
        </p>
      </div>
    </form>
  );
}
