import BarLoader from 'react-spinners/BarLoader'

import { useAppSelector } from '../../hooks'

import classes from './Spinner.module.scss'

export const Spinner = () => {
  const loading = useAppSelector((state) => state.articlesReducer.loading)

  return (
    <div className={classes.spinner}>
      <BarLoader color="#2196f3" loading={loading} />
    </div>
  )
}
