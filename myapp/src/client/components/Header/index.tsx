import * as React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='navbar' aria-label='main navigation'>
      <div className='navbar-brand'>
        <Link className='navbar-item' to='/'>In the now</Link>
      </div>
      <div className='navbar-menu'>
        <div className='navbar-end'>
          <div className="buttons">
            <Link to="/login" className="button is-primary">
              Sign In
            </Link>
            <Link to="/login" className="button is-light">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Header }