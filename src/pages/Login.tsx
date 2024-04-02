function Login() {
  return (
    <form>
      <input
        type="email"
        data-testid="email-input"
        name="email"
      />
      <input
        type="password"
        data-testid="password-input"
        name="password"
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
