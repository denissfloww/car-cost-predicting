import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { IPredictResponse } from './types';
import { getPredict } from '../../services/predictResultService';
import {InputValues} from "../../pages/MainPage";

interface InitialState {
    result: IPredictResponse;
    loading: boolean
}

const initialState: InitialState = {
    result: {
        price: '0',
        img: '',
    },
    loading:false
};

const predictResultSlice = createSlice({
    name: 'predict',
    initialState,
    reducers: {
        setLoading: state => {
            state.loading = true;
        },
        setResult: (state, action: PayloadAction<IPredictResponse>) => {
            state.result = action.payload;
            state.loading = false;
        },
    },
});

export const { setResult, setLoading } = predictResultSlice.actions;

export const fetchPredict = (values: InputValues): AppThunk => {
    return async dispatch => {
        try {
            dispatch(setLoading())
            const predictResponse: IPredictResponse = await getPredict(values);
            dispatch(setResult(predictResponse));
        } catch (e) {
            console.log(e);
        }
    };
};

export const selectPredictState = (state: RootState) => state.predict;

export default predictResultSlice.reducer;
