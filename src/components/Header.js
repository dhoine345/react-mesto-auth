import logo from '../images/logo.svg';

function Header({ loggedIn, email }) {
  return (
    <header className="header">
      <img
        src={logo}
        className="header__logo"
        alt="Логотип сайта Место Россия." />
      {loggedIn && <p className='header__email'>{email}</p>}
    </header>
  );
}

export default Header;
