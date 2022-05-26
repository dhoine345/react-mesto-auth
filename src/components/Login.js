import { useState } from "react";

function Login({ onLogin, renderLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e) => setEmail(e.target.value);

  const handleChangePassword = (e) => setPassword(e.target.value);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="entry">
      <h3 className="entry__title">Вход</h3>
      <form className="entry__form" onSubmit={handleSubmit}>
        <input
          className="entry__form-input entry__form-input_type_email"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChangeEmail}
          value={email}
          required
        />
        <input
          className="entry__form-input entry__form-input_type_password"
          type="password"
          placeholder="Пароль"
          name="password"
          onChange={handleChangePassword}
          value={password}
          required
        />
        <button className="entry__submit-button" type="submit">{renderLoading ? 'Вход...' : 'Войти'}</button>
      </form>
    </div>
  );
}


export default Login;
