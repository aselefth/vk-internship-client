import { configureStore } from "@reduxjs/toolkit";
import {mainApiSlice} from './Api/index';

const store = configureStore({
    reducer: {
        [mainApiSlice.reducerPath]: mainApiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mainApiSlice.middleware),
    devTools: true
});


export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;