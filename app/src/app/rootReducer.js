import { combineReducers } from '@reduxjs/toolkit'

import todoSlide from 'features/todoSlice'

const rootReducer = combineReducers({
  todo: todoSlide,
})

export default rootReducer
