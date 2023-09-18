import { Pagination, ConfigProvider } from 'antd'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { setPage } from '../../redux/articlesSlice'

import './Pagination_.scss'

export const Pagination_ = () => {
  const { totalPages, page } = useAppSelector((state) => state.articlesReducer)
  const dispatch = useAppDispatch()

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
        defaultPageSize={1}
        onChange={(page) => dispatch(setPage(page))}
      />
    </ConfigProvider>
  )
}
