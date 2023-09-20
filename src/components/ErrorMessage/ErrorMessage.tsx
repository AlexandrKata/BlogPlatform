import { Alert } from 'antd'

import { useAppSelector } from '../../hooks'

import classes from './ErrorMessage.module.scss'

export const ErrorMessage = () => {
  const { error } = useAppSelector((state) => state.articlesReducer)
  return <Alert description={error?.name} message={error?.message} type="error" className={classes.alert} />
}
