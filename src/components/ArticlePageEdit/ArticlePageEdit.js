import { useDispatch, useSelector } from 'react-redux';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ArticleForm } from '../ArticleForm';
import { fetchArticlePut, fetchArticleGet, fetchArticlesGet } from '../../redux/articlesActions';

import classes from './articlePageEdit.module.scss';

export const ArticlePageEdit = () => {
  const { token } = useSelector((state) => state.userReducer.user);
  const { article } = useSelector((state) => state.articlesReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  token;
  fetchArticlePut;
  dispatch;
  navigate;

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList.map((tag) => ({ values: tag })),
    },
  });

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
      slug: article.slug,
    };
    return newData;
  };

  const goPutArticle = async (data) => {
    const slug = article.slug;
    await dispatch(fetchArticlePut(formatData(data))).then(() => {});
    await dispatch(fetchArticleGet(slug)).then(() => {
      navigate(`/articles/${slug}`);
    });
    await dispatch(fetchArticlesGet()).then(() => {});
  };

  const onSubmit = (data) => {
    goPutArticle(data);
  };

  return (
    <div className={classes.articlePageEdit}>
      <h2 className={classes.articlePageEdit__title}>Edit article</h2>
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
