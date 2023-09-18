import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { ArticleForm } from '../ArticleForm'
import { fetchArticlePut, fetchArticleGet, fetchArticlesGet } from '../../redux/articlesActions'

import classes from './ArticlePageEdit.module.scss'

export const ArticlePageEdit = () => {
  const { user } = useAppSelector((state) => state.userReducer)
  const { article } = useAppSelector((state) => state.articlesReducer)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: article?.title,
      description: article?.description,
      body: article?.body,
      tagList: article?.tagList.map((tag) => ({ values: tag })),
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  })

  const formatData = (data: any) => {
    const copyData = JSON.parse(JSON.stringify(data))
    const tags = copyData.tagList.reduce((acc: unknown[], curr: ArrayLike<unknown> | { [s: string]: unknown }) => {
      acc.push(...Object.values(curr))
      return acc
    }, [])
    const newData = {
      title: copyData.title,
      description: copyData.description,
      body: copyData.body,
      tagList: tags,
      token: user?.token,
      slug: article?.slug,
    }
    return newData
  }

  const goPutArticle = async (data: any) => {
    const slug = article?.slug
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await dispatch(fetchArticlePut(formatData(data))).then(() => {})
    await dispatch(fetchArticleGet({ slug: slug })).then(() => {
      navigate(`/articles/${slug}`)
    })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await dispatch(fetchArticlesGet({ offset: 0 })).then(() => {})
  }

  const onSubmit = (data: any) => {
    goPutArticle(data)
  }

  return (
    <div className={classes.articlePageEdit}>
      <h2 className={classes.articlePageEdit__title}>Edit article</h2>
      <ArticleForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        fields={fields}
        append={append}
        remove={remove}
      />
    </div>
  )
}
