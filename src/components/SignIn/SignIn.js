import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { fetchLoginPost } from '../../redux/userActions';

import classes from './signIn.module.scss';

export const SignIn = () => {
  const { loginErrors } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(fetchLoginPost(data));
  };

  return (
    <div className={classes.signIn}>
      <h2 className={classes.signIn__title}>Sign In</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__wrapper">
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
            className={!errors.email && !loginErrors.email ? 'form__field' : 'form__field form__field__error'}
            id="email"
            placeholder="Email address"
          ></input>
          {errors.email || loginErrors.email ? (
            <p className="form__error">{loginErrors.email || errors.email.message}</p>
          ) : null}
        </div>
        <div className="form__wrapper">
          <label htmlFor="password">Password</label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Min length is 6' },
              maxLength: { value: 40, message: 'Max length is 40' },
            })}
            className={!errors.password && !loginErrors.password ? 'form__field' : 'form__field form__field__error'}
            id="password"
            placeholder="Password"
          ></input>
          {errors.password || loginErrors.password ? (
            <p className="form__error">{loginErrors.password || errors.password.message}</p>
          ) : null}
        </div>
        <button className="form__button">Login</button>
        <div className="form__link">
          <span>Don’t have an account?</span> <Link to={'/sign-up'}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};
