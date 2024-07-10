import {configureStore} from '@reduxjs/toolkit'
import restaurantSlice from './restaurants/restaurantSlice' 

const store = configureStore({
    reducer:{
        restaurants:restaurantSlice
    },
    
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;