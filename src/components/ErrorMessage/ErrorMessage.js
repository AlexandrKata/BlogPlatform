import { useSelector } from 'react-redux';
import { Alert } from 'antd';

import classes from './errorMessage.module.scss';

export const ErrorMessage = () => {
  const { data, status } = useSelector((state) => state.articlesReducer.error);
  return <Alert description={status} message={data} type="error" className={classes.alert} />;
};
