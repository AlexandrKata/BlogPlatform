import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { Popconfirm } from 'antd';

import { fetchArticleDelete, fetchArticlesGet } from '../../redux/articlesActions';
import plug from '../../img/avatar.png';
import { TagList } from '../TagList';

import classes from './article.module.scss';

export const Article = ({ item, markdown = false }) => {
  const { article } = useSelector((state) => state.articlesReducer);
  const { user } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'MMMM dd, yyyy');
    } catch (e) {
      return '-';
    }
  };

  const onClickDelete = async () => {
    dispatch(fetchArticleDelete({ slug: article.slug, token: user.token })).then(() => {
      dispatch(fetchArticlesGet());
      navigate('/');
    });
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
            <img src={item.author.image ? item.author.image : plug} className={classes.article__avatar} />
          </div>
        </header>
        <div className={classes.article__wrapper}>
          <div className={classes.article__text}>{item.description}</div>
          {article && item.author.username === user?.username ? (
            <div className={classes.article__wrapperBtn}>
              <Popconfirm
                placement="rightTop"
                title={'Are you sure to delete this article?'}
                description={''}
                onConfirm={onClickDelete}
                okText="Yes"
                cancelText="No"
              >
                <button type="button" className={[classes.article__btn, classes.article__btn_delete].join(' ')}>
                  Delete
                </button>
              </Popconfirm>
              <Link to={`/articles/${article.slug}/edit`}>
                <button type="button" className={[classes.article__btn, classes.article__btn_edit].join(' ')}>
                  Edit
                </button>
              </Link>
            </div>
          ) : null}
        </div>

        {markdown && (
          <div className={classes.article__body}>
            <ReactMarkdown>{item.body}</ReactMarkdown>
          </div>
        )}
      </article>
    </>
  );
};
