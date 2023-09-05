import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from '../Header';
import { ArticlePage } from '../ArticlePage';
import { ArticlesList } from '../ArticlesList';
import { ErrorMessage } from '../ErrorMessage';
import { Spinner } from '../Spinner';
import { fetchArticles } from '../../redux/articlesActions';

export const App = () => {
  const { page, offset, error, loading } = useSelector((state) => state.articlesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles(offset));
  }, [page]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="container">
          {loading && <Spinner />}
          {error && <ErrorMessage />}
          <Routes>
            <Route path={'/'} element={<ArticlesList />}></Route>
            <Route path={'/articles'} element={<ArticlesList />}></Route>
            <Route path={'/articles/:slug'} element={<ArticlePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};
