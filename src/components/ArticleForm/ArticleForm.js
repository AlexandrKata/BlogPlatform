import classes from './articleForm.module.scss';

export const ArticleForm = ({ register, handleSubmit, onSubmit, errors, fields, append, remove }) => {
  return (
    <form className={classes.formArticle} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.wrapperField}>
        <label className={classes.wrapperField__title} htmlFor="title">
          Title
        </label>
        <input
          {...register('title', { required: 'Field is required' })}
          className={
            errors.title
              ? [classes.wrapperField__field, classes.wrapperField__field__error].join(' ')
              : classes.wrapperField__field
          }
          placeholder="Title"
        ></input>
        {errors.title ? <p className={classes.wrapperField__error}>{errors.title.message}</p> : null}
      </div>
      <div className={classes.wrapperField}>
        <label className={classes.wrapperField__title} htmlFor="description">
          Short description
        </label>
        <input
          {...register('description', { required: 'Field is required' })}
          className={
            errors.description
              ? [classes.wrapperField__field, classes.wrapperField__field__error].join(' ')
              : classes.wrapperField__field
          }
          placeholder="Short description"
        ></input>
        {errors.description ? <p className={classes.wrapperField__error}>{errors.description.message}</p> : null}
      </div>
      <div className={classes.wrapperField}>
        <label className={classes.wrapperField__title} htmlFor="body">
          Text
        </label>
        <textarea
          {...register('body', { required: 'Field is required' })}
          className={
            errors.text
              ? [classes.wrapperField__textarea, classes.wrapperField__textarea__error].join(' ')
              : classes.wrapperField__textarea
          }
          placeholder="Text"
        ></textarea>
        {errors.text ? <p className={classes.wrapperField__error}>{errors.text.message}</p> : null}
      </div>
      <div className={classes.tags}>
        <h2 className={classes.tags__title}>Tags</h2>
        <div className={classes.tags__wrapper}>
          <div className={classes.tag}>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className={classes.tag__wrapper}>
                  <input
                    {...register(`tagList.${index}.values`)}
                    className={classes.tag__field}
                    placeholder="Tag"
                  ></input>
                  <button
                    type="button"
                    className={[classes.tag__btn, classes.tag__btn_delete].join(' ')}
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
          <button type="button" className={[classes.tag__btn, classes.tag__btn_add].join(' ')} onClick={() => append()}>
            Add tag
          </button>
        </div>
      </div>
      <button className={classes.formArticle__btn}>Send</button>
    </form>
  );
};
