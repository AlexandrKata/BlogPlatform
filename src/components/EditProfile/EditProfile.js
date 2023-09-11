import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUpdateUserPut } from '../../redux/userActions';
import { updateUser } from '../../redux/usersSlice';

import classes from './editProfile.module.scss';

export const EditProfile = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(fetchUpdateUserPut(data));
    dispatch(updateUser(data));
  };

  return (
    <div className={classes.profile}>
      <h2 className={classes.profile__title}>Edit Profile</h2>
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
          <label htmlFor="password">New password</label>
          <input
            {...register('password', {
              minLength: { value: 6, message: 'Min length is 6' },
              maxLength: { value: 40, message: 'Max length is 40' },
            })}
            className={!errors.password ? 'form__field' : 'form__field form__field__error'}
            id="password"
            placeholder="New password"
          ></input>
          {errors.password ? <p className="form__error">{errors.password.message}</p> : null}
        </div>
        <div className="form__wrapper">
          <label htmlFor="image">Avatar image (url)</label>
          <input
            {...register('image')}
            className={!errors.image ? 'form__field' : 'form__field form__field__error'}
            id="image"
            placeholder="Avatar image"
          ></input>
          {errors.image ? <p className="form__error">{errors.image.message}</p> : null}
        </div>

        <button className="form__button">Save</button>
      </form>
    </div>
  );
};
