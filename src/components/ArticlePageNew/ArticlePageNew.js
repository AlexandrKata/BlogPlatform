import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ArticleForm } from '../ArticleForm';
import { fetchArticlePost, fetchArticleGet, fetchArticlesGet } from '../../redux/articlesActions';

import classes from './articlePageNew.module.scss';

export const ArticlePageNew = () => {
  const { token } = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  const formatData = (data) => {
    const copyData = JSON.parse(JSON.stringify(data));
    const tags = copyData.tagList.reduce((acc, curr) => {
      acc.push(...Object.values(curr));
      return acc;
    }, []);
    const newData = {
      title: copyData.title,
      description: copyData.description,
      body: copyData.body,
      tagList: tags,
      token: token,
    };
    return newData;
  };

  const goNewArticle = async (data) => {
    let slug = '';
    await dispatch(fetchArticlePost(data)).then((response) => {
      slug = response.payload.article.slug;
    });
    await dispatch(fetchArticleGet(slug)).then(() => {
      navigate(`/articles/${slug}`);
    });
    await dispatch(fetchArticlesGet()).then(() => {});
  };

  const onSubmit = (data) => {
    goNewArticle(formatData(data));
  };

  return (
    <div className={classes.articlePageNew}>
      <h2 className={classes.articlePageNew__title}>Create new article</h2>
      <ArticleForm
        register={register}
        unregister={unregister}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        fields={fields}
        append={append}
        remove={remove}
      />
    </div>
  );
};
