import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { clearError } from '../../redux/articlesSlice'
import { logOut } from '../../redux/usersSlice'
import avatar from '../../img/avatar.png'

import classes from './Header.module.scss'

export const Header = () => {
  const user = useAppSelector((state) => state.userReducer.user)
  const dispatch = useAppDispatch()

  const onLogOut = () => {
    dispatch(logOut())
  }

  const onMain = () => {
    dispatch(clearError())
  }

  return (
    <header className={classes.header}>
      <span onClick={onMain}>
        <Link className={classes.header__link} to="/">
          Realworld Blog
        </Link>
      </span>
      {user ? (
        <div className={classes.header__login}>
          <Link className={[classes.header__link, classes.header__create].join(' ')} to={'/new-article'}>
            Create article
          </Link>
          <Link className={[classes.header__link, classes.header__profile].join(' ')} to="/profile">
            {user.username} <img src={user.image || avatar} />
          </Link>
          <Link to={'/'} className={[classes.header__link, classes.header__logOut].join(' ')} onClick={onLogOut}>
            Log Out
          </Link>
        </div>
      ) : (
        <div className={classes.header__authorization}>
          <Link className={classes.header__link} to="/sign-in">
            Sign In
          </Link>
          <Link className={[classes.header__link, classes.header__signUp].join(' ')} to="/sign-up">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  )
}
