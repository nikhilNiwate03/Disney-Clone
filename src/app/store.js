import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import movieReducer from '../features/User/movie/movieSlice';
import userReducer from '../features/User/userSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
  });