import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchLoginPost } from '../../redux/userActions'
import classes from '../../styles/modal.module.scss'

export const SignIn = () => {
  const { loginErrors } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    dispatch(fetchLoginPost(data))
  }

  return (
    <div className={classes.modal}>
      <h2 className={classes.modal__title}>Sign In</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.form__wrapper}>
          <label htmlFor="email">Email address</label>
          <input
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: 'Not correct email',
              },
            })}
            className={
              !errors.email && !loginErrors.email
                ? classes.form__field
                : [classes.form__field, classes.form__field__error].join(' ')
            }
            id="email"
            placeholder="Email address"
          ></input>
          {errors.email || loginErrors.email ? (
            <p className={classes.form__error}>{loginErrors.email || errors.email?.message?.toString()}</p>
          ) : null}
        </div>
        <div className={classes.form__wrapper}>
          <label htmlFor="password">Password</label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Min length is 6' },
              maxLength: { value: 40, message: 'Max length is 40' },
            })}
            className={
              !errors.password && !loginErrors.password
                ? classes.form__field
                : [classes.form__field, classes.form__field__error].join(' ')
            }
            id="password"
            placeholder="Password"
            type="password"
          ></input>
          {errors.password || loginErrors.password ? (
            <p className={classes.form__error}>{loginErrors.password || errors.password?.message?.toString()}</p>
          ) : null}
        </div>
        <button className={classes.form__button}>Login</button>
        <div className={classes.form__link}>
          <span>Don’t have an account?</span> <Link to={'/sign-up'}>Sign Up</Link>
        </div>
      </form>
    </div>
  )
}
