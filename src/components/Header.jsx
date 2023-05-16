import logo from './../image/logo.svg'

function Header({text}) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
      <p className="header__text">{text}</p>
    </header>
  );
}
export default Header;
