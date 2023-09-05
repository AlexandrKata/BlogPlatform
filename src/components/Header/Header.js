import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { clearError } from '../../redux/articlesSlice';

import classes from './header.module.scss';

export const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className={classes.header}>
      <span onClick={() => dispatch(clearError())}>
        <Link to="/">Realworld Blog</Link>
      </span>

      <div className={classes.header__authorization}>
        <Link>Sign In</Link>
        <Link className={classes.header__signUp}>Sign Up</Link>
      </div>
    </header>
  );
};
