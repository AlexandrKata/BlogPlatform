import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchArticleGet } from '../../redux/articlesActions';
import { Article } from '../Article/Article';

export const ArticlePage = () => {
  const { article } = useSelector((state) => state.articlesReducer);
  const dispatch = useDispatch();

  const { slug } = useParams();

  useEffect(() => {
    if (slug) dispatch(fetchArticleGet(slug));
  }, []);

  if (!article) {
    return null;
  }

  return <Article item={article} markdown />;
};
