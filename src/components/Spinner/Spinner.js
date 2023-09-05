import BarLoader from 'react-spinners/BarLoader';
import { useSelector } from 'react-redux';

import classes from './spinner.module.scss';

export const Spinner = () => {
  const loading = useSelector((state) => state.articlesReducer.loading);

  return (
    <div className={classes.spinner}>
      <BarLoader color="#2196f3" loading={loading} />
    </div>
  );
};
