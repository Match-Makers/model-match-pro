
export default function SignIn() {
  return (
    <form id='signin-form'>
      <label htmlfor='username'> Username </label>
      <input type="text" id="username" name="username" required></input>

      <label htmlfor='password'> password </label>
      <input type="password" id="password" name="password" required></input>

      <button>
        Submit
      </button>
    </form>
  )
}