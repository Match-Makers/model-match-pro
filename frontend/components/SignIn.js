export default function SignIn() {
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
      <button type="submit" className="mb-4 btn btn-primary">
        Sign In
      </button>
      <div className="mb-3">
        <p>Sign Up if you don&apos;t already have an account</p>
      </div>
    </form>
  );
}
