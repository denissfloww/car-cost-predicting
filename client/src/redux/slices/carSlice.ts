import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { getBrands, getFuelTypes, getModels, getTransmissions } from '../../services/carService';

interface InitialState {
    brands: string[];
    models: string[];
    transmissions: string[];
    fuelTypes: string[];
}

const initialState: InitialState = {
    brands: [],
    models: [],
    transmissions: [],
    fuelTypes: [],
};

const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        setBrands: (state, action: PayloadAction<string[]>) => {
            state.brands = action.payload;
        },
        setModels: (state, action: PayloadAction<string[]>) => {
            state.models = action.payload;
        },
        setTransmissions: (state, action: PayloadAction<string[]>) => {
            state.transmissions = action.payload;
        },
        setFuelTypes: (state, action: PayloadAction<string[]>) => {
            state.fuelTypes = action.payload;
        },
    },
});

export const { setBrands, setTransmissions, setFuelTypes, setModels } = carSlice.actions;

export const fetchBrands = (): AppThunk => {
    return async dispatch => {
        try {
            const brands = await getBrands();
            dispatch(setBrands(brands));
        } catch (e) {
            console.log(e);
        }
    };
};

export const fetchModels = (): AppThunk => {
    return async dispatch => {
        try {
            const models = await getModels();
            dispatch(setModels(models));
        } catch (e) {
            console.log(e);
        }
    };
};

export const fetchTransmissions = (): AppThunk => {
    return async dispatch => {
        try {
            const transmissions = await getTransmissions();
            dispatch(setTransmissions(transmissions));
        } catch (e) {
            console.log(e);
        }
    };
};

export const fetchFuelTypes = (): AppThunk => {
    return async dispatch => {
        try {
            const fuelTypes = await getFuelTypes();
            dispatch(setFuelTypes(fuelTypes));
        } catch (e) {
            console.log(e);
        }
    };
};

export const selectCarState = (state: RootState) => state.car;

export default carSlice.reducer;
