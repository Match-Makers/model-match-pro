export default function SignUpform() {
  return (
    <form id="signup-form">
      <label htmlFor="username"> Username </label>
      <input type="text" id="username" name="username" required></input>

      <label htmlFor="password"> password </label>
      <input type="password" id="password" name="password" required></input>

      <label htmlFor="confirm-password"> confirm password </label>
      <input
        type="password"
        id="confirm-password'"
        name="confirm-password'"
        required
      ></input>

      <button>Submit</button>
    </form>
  );
}
