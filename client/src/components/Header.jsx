import '@/styles/Header.css';
import logo from '@/assets/logo.svg';
import { Link } from 'react-router-dom'; // If using React Router for navigation
const Header = ({ notHome = true }) => {


  return (
    <>
      <header className="header">
        {
          notHome &&
          <Link className='header-link' to="/">
            <img className='header-logo' src={logo} alt='Mots Crois&eacute;s' />
            Mots Crois&eacute;s
          </Link>
        }
        <Link className='header-link' to="/puzzle">Puzzles</Link>
        <Link className='header-link' to="/upload">Upload a Mini</Link>
      </header>
    </>
  )
};
export default Header;
