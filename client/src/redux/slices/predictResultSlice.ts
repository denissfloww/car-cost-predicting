import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { IPredictResponse, IQuery } from './types';
import {getPredict, getQueries} from '../../services/predictResultService';
import { InputValues } from '../../pages/MainPage';

interface InitialState {
    result: IPredictResponse;
    loading: boolean;
    queries: IQuery[];
}

const initialState: InitialState = {
    result: {
        price: '0',
        img: '',
        car: '',
    },
    queries:[],
    loading: false,
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
        setQueries: (state, action: PayloadAction<IQuery[]>)=> {
            state.queries = action.payload;
        }
    },
});

export const { setResult, setLoading, setQueries } = predictResultSlice.actions;

export const fetchPredict = (values: InputValues): AppThunk => {
    return async dispatch => {
        try {
            dispatch(setLoading());
            const predictResponse: IPredictResponse = await getPredict(values);
            dispatch(setResult(predictResponse));
        } catch (e) {
            console.log(e);
        }
    };
};

export const fetchQueries = (): AppThunk => {
    return async dispatch => {
        try {
            const queries: IQuery[] = await getQueries();
            dispatch(setQueries(queries))
        }catch (e) {
            console.log(e)
        }
    }
}

export const selectPredictState = (state: RootState) => state.predict;

export default predictResultSlice.reducer;
