import { useSelector } from 'react-redux';

import { Article } from '../Article';
import { Pagination_ } from '../Pagination_';

import classes from './articlesList.module.scss';

export const ArticlesList = () => {
  const articles = useSelector((state) => state.articlesReducer.articles);

  return (
    <>
      <div className={classes.articlesList}>
        {articles.map((item) => (
          <Article key={item.slug} item={item} />
        ))}
      </div>
      <Pagination_ />
    </>
  );
};
