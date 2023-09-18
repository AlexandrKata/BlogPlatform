// eslint-disable-next-line import/named
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import type { RootState } from '../redux'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
