import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { onIsAgree } from '../../redux/usersSlice';
import { fetchCreateUsersPost } from '../../redux/userActions';

import classes from './signUp.module.scss';

export const SignUp = () => {
  const { isAgree } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(fetchCreateUsersPost(data));
  };

  const onChangeCheckbox = () => {
    dispatch(onIsAgree(isAgree));
  };

  return (
    <div className={classes.signUp}>
      <h2 className={classes.signUp__title}>Create new account</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__wrapper">
          <label htmlFor="username">Username</label>
          <input
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Min length is 3 ' },
              maxLength: { value: 20, message: 'Max length is 20' },
            })}
            className={!errors.username ? 'form__field' : 'form__field form__field__error'}
            id="username"
            placeholder="Username"
          ></input>
          {errors.username ? <p className="form__error">{errors.username.message}</p> : null}
        </div>
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
            className={!errors.email ? 'form__field' : 'form__field form__field__error'}
            id="email"
            placeholder="Email address"
          ></input>
          {errors.email ? <p className="form__error">{errors.email.message}</p> : null}
        </div>
        <div className="form__wrapper">
          <label htmlFor="password">Password</label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Min length is 6' },
              maxLength: { value: 40, message: 'Max length is 40' },
              validate: (value) => value === watch('repeatPassword') || 'Passwords must match',
            })}
            className={!errors.password ? 'form__field' : 'form__field form__field__error'}
            id="password"
            placeholder="Password"
          ></input>
          {errors.password ? <p className="form__error">{errors.password.message}</p> : null}
        </div>
        <div className="form__wrapper">
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            {...register('repeatPassword', {
              required: 'Repeat Password is required',
              validate: (value) => value === watch('password') || 'Passwords must match',
            })}
            className={!errors.repeatPassword ? 'form__field' : 'form__field form__field__error'}
            id="repeatPassword"
            placeholder="Password"
          ></input>
          {errors.repeatPassword ? <p className="form__error">{errors.repeatPassword.message}</p> : null}
        </div>
        <div className="form__wrapper__checkbox">
          <input
            id="checkbox"
            placeholder="Password"
            type="checkbox"
            checked={isAgree}
            onChange={onChangeCheckbox}
          ></input>
          <label htmlFor="checkbox">I agree to the processing of my personal information</label>
        </div>
        <button className="form__button" disabled={!isAgree}>
          Create
        </button>
        <div className="form__link">
          <span>Already have an account?</span> <Link to={'/sign-in'}>Sign In</Link>
        </div>
      </form>
    </div>
  );
};
