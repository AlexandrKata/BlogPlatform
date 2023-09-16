import { Pagination, ConfigProvider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setPage } from '../../redux/articlesSlice';

import './pagination_.scss';

export const Pagination_ = () => {
  const { totalPages, page } = useSelector((state) => state.articlesReducer);
  const dispatch = useDispatch();

  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: 'rgba(24, 144, 255, 1)',
          },
        },
      }}
    >
      <Pagination
        hideOnSinglePage={true}
        showSizeChanger={false}
        total={totalPages}
        current={page}
        defaultPageSize="1"
        onChange={(page) => dispatch(setPage(page))}
      />
    </ConfigProvider>
  );
};
