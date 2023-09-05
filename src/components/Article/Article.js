import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { TagList } from '../TagList';

import classes from './article.module.scss';

export const Article = ({ item, markdown = false }) => {
  const formatDate = (date) => {
    try {
      return format(new Date(date), 'MMMM dd, yyyy');
    } catch (e) {
      return '-';
    }
  };

  return (
    <>
      <article className={classes.article}>
        <header className={classes.article__header}>
          <div className={classes.article__wrapperTitle}>
            <div className={classes.article__title}>
              <Link to={`/articles/${item.slug}`}>{item.title}</Link>
              <div className={classes.article__wrapperLikes}>
                <button></button>
                <span className={classes.article__likes}>{item.favoritesCount}</span>
              </div>
            </div>
            <TagList tagList={item.tagList} />
          </div>
          <div className={classes.article__wrapperAuthor}>
            <div className={classes.article__author}>
              <div className={classes.article__author__name}>{item.author.username}</div>
              <div className={classes.article__author__date}>{formatDate(item.createdAt)} </div>
            </div>
            <img src={item.author.image} className={classes.article__avatar} />
          </div>
        </header>
        <p className={classes.article__text}>{item.description}</p>
        {markdown && (
          <div className={classes.article__body}>
            <ReactMarkdown>{item.body}</ReactMarkdown>
          </div>
        )}
      </article>
    </>
  );
};
