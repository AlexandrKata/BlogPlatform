import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUpdateUserPut } from '../../redux/userActions';
import { updateUser } from '../../redux/usersSlice';
import classes from '../../styles/modal.module.scss';

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
    const newData = JSON.parse(JSON.stringify(data));
    for (let key in newData) {
      if (newData[key] == '') delete newData[key];
    }
    dispatch(fetchUpdateUserPut(newData));
    dispatch(updateUser(newData));
  };

  return (
    <div className={classes.modal}>
      <h2 className={classes.modal__title}>Edit Profile</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.form__wrapper}>
          <label htmlFor="username">Username</label>
          <input
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Min length is 3 ' },
              maxLength: { value: 20, message: 'Max length is 20' },
            })}
            className={
              !errors.username ? classes.form__field : [classes.form__field, classes.form__field__error].join(' ')
            }
            id="username"
            placeholder="Username"
          ></input>
          {errors.username ? <p className={classes.form__error}>{errors.username.message}</p> : null}
        </div>
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
              !errors.email ? classes.form__field : [classes.form__field, classes.form__field__error].join(' ')
            }
            id="email"
            placeholder="Email address"
          ></input>
          {errors.email ? <p className={classes.form__error}>{errors.email.message}</p> : null}
        </div>
        <div className={classes.form__wrapper}>
          <label htmlFor="password">New password</label>
          <input
            {...register('password', {
              minLength: { value: 6, message: 'Min length is 6' },
              maxLength: { value: 40, message: 'Max length is 40' },
            })}
            className={
              !errors.password ? classes.form__field : [classes.form__field, classes.form__field__error].join(' ')
            }
            id="password"
            placeholder="New password"
          ></input>
          {errors.password ? <p className={classes.form__error}>{errors.password.message}</p> : null}
        </div>
        <div className={classes.form__wrapper}>
          <label htmlFor="image">Avatar image (url)</label>
          <input
            {...register('image')}
            className={
              !errors.image ? classes.form__field : [classes.form__field, classes.form__field__error].join(' ')
            }
            id="image"
            placeholder="Avatar image"
          ></input>
          {errors.image ? <p className={classes.form__error}>{errors.image.message}</p> : null}
        </div>

        <button className={classes.form__button}>Save</button>
      </form>
    </div>
  );
};
