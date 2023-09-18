import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/'
import { Header } from '../Header'
import { ArticlePage } from '../ArticlePage'
import { ArticlesList } from '../ArticlesList'
import { ErrorMessage } from '../ErrorMessage'
import { Spinner } from '../Spinner'
import { SignUp } from '../SignUp'
import { SignIn } from '../SignIn'
import { EditProfile } from '../EditProfile'
import { ArticlePageNew } from '../ArticlePageNew'
import { ArticlePageEdit } from '../ArticlePageEdit'
import { fetchArticlesGet } from '../../redux/articlesActions'

export const App = () => {
  const { page, offset, error, loading } = useAppSelector((state) => state.articlesReducer)
  const { user } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchArticlesGet({ offset: offset }))
  }, [dispatch, offset, page])

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
            <Route path={'/sign-in'} element={!user ? <SignIn /> : <Navigate to={'/'} />}></Route>
            <Route path={'/sign-up'} element={!user ? <SignUp /> : <Navigate to={'/'} />}></Route>
            <Route path={'/profile'} element={user ? <EditProfile /> : <Navigate to={'/sign-in'} />}></Route>
            <Route path={'/new-article'} element={user ? <ArticlePageNew /> : <Navigate to={'/sign-in'} />}></Route>
            <Route path={'/articles/:slug/edit'} element={<ArticlePageEdit />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}
