import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { IBrandAveragePrice, IPredictResponse, IQuery, IQueryResponse } from './types';
import { getAllQueriesCount, getPredict, getQueriesPerDay, getStatisticByBrandPerDay } from '../../services/predictResultService';
import { InputValues } from '../../pages/MainPage';

interface InitialState {
    result: IPredictResponse;
    loading: boolean;
    queries: IQuery[];
    countPerDay: number;
    countAll: number;
    brandAvgPrice: IBrandAveragePrice[];
}

const initialState: InitialState = {
    result: {
        price: '0',
        img: '',
        car: '',
    },
    queries: [],
    loading: false,
    countPerDay: 0,
    countAll: 0,
    brandAvgPrice: [],
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
        setQueries: (state, action: PayloadAction<IQuery[]>) => {
            state.queries = action.payload;
        },
        setQueriesPerDayCount: (state, action: PayloadAction<number>) => {
            state.countPerDay = action.payload;
        },
        setAllQueriesCount: (state, action: PayloadAction<number>) => {
            state.countAll = action.payload;
        },
        setBrandAvgStaticstis: (state, action: PayloadAction<IBrandAveragePrice[]>) => {
            state.brandAvgPrice = action.payload;
        },
    },
});

export const { setResult, setLoading, setQueries, setQueriesPerDayCount, setAllQueriesCount, setBrandAvgStaticstis } =
    predictResultSlice.actions;

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

export const fetchQueriesPerDay = (): AppThunk => {
    return async dispatch => {
        try {
            const response: IQueryResponse = await getQueriesPerDay();
            dispatch(setQueriesPerDayCount(response.count));
            dispatch(setQueries(response.queries));

            const countAllQueries = await getAllQueriesCount();
            dispatch(setAllQueriesCount(countAllQueries));

            const brandAvgPrice = await getStatisticByBrandPerDay();
            dispatch(setBrandAvgStaticstis(brandAvgPrice));
        } catch (e) {
            console.log(e);
        }
    };
};

export const selectPredictState = (state: RootState) => state.predict;

export default predictResultSlice.reducer;
