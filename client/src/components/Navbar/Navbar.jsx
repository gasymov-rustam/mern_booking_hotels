import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import cls from './Navbar.module.css';

export const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className={cls.navbar}>
      <div className={cls.navContainer}>
        <Link to="/" className={cls.link}>
          <span className={cls.logo}>Booking</span>
        </Link>

        {user ? (
          user.username
        ) : (
          <div className={cls.navItems}>
            <button className={cls.navButton}>Register</button>
            <button className={cls.navButton}>Login</button>
          </div>
        )}
      </div>
    </nav>
  );
};
