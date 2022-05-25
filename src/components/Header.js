import logo from '../images/logo.svg';
import {NavLink, Route, Switch} from 'react-router-dom';

function Header({ setLoggedIn, email }) {
  function logOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <header className="header">
      <img
        src={logo}
        className="header__logo"
        alt="Логотип сайта Место Россия." />
      <div className='header__nav'>
        <Switch>
          <Route exact path='/'>
            <p className='header__email'>{email}</p>
            <NavLink onClick={logOut} to='/sign-in' className='header__link header__link_type_exit'>Выйти</NavLink>
          </Route>
          <Route path='/sign-in'>
            <NavLink to="/sign-up" className='header__link'>Регистрация</NavLink>
          </Route>
          <Route path='/sign-up'>
            <NavLink to='/sign-in' className='header__link'>Войти</NavLink>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
