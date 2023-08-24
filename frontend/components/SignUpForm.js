import Link from 'next/link';

export default function SignUpform() {
  return (
    <form className="flex flex-col items-center max-w-2xl mx-auto my-6 rounded-md bg-slate-400">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="email"
          className="form-control"
          id="username"
          aria-describedby="username"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input type="password" className="form-control" id="password" />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          confirm password
        </label>
        <input type="password" className="form-control" id="confirmPassword" />
      </div>
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



