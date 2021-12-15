import { Action, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import carReducer from './slices/carSlice';
import predictReducer from './slices/predictResultSlice';

const store = configureStore({
    reducer: {
        car: carReducer,
        predict: predictReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
