import { useMainPageStyles } from '../styles/styles';
import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useEffect, useState } from 'react';
import MileageMask from '../components/MileageMask';
import InputMask from 'react-input-mask';
import { fetchBrands, fetchFuelTypes, fetchModels, fetchTransmissions, selectCarState } from '../redux/slices/carSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchPredict } from '../redux/slices/predictResultSlice';

const validationSchema = yup.object({
    brand: yup.string().required('Вы не выбрали марку!'),
    model: yup.string().required('Вы не выбрали модель!'),
    year: yup.string().required('Вы не выбрали год!'),
    mileage: yup.string().required('Заполните это поле!'),
    engineType: yup.string().required('Вы не выбрали тип двигателя!'),
    driveType: yup.string().required('Вы не выбрали тип двигателя!'),
});

export interface InputValues {
    brand: string;
    model: string;
    year: string | undefined;
    mileage: string;
    engineType: string;
    driveType: string;
    enginesize: string;
    mpg: string;
    tax: string;
}

const MainPage = () => {
    const classes = useMainPageStyles();
    const dispatch = useDispatch();
    const [year, setYear] = useState<Date | null>(new Date());
    const history = useNavigate();

    const onLoad = () => {
        dispatch(fetchBrands());
        dispatch(fetchModels());
        dispatch(fetchTransmissions());
        dispatch(fetchFuelTypes());
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            brand: 'audi',
            model: 'A8',
            engineType: 'Electric',
            driveType: 'Manual',
            mileage: '100000',
            enginesize: '2.5',
            mpg: '4.8',
            tax: '200',
        },
    });

    useEffect(() => {
        onLoad();
    }, []);

    const handleResultButtonClick = (values: InputValues) => {
        values.year = year?.getFullYear().toString();
        console.log(values);
        dispatch(fetchPredict(values));
        history('/results');
    };

    const { brands, models, transmissions, fuelTypes } = useSelector(selectCarState);

    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.mainPagePaper}>
                    <Typography variant='h5'>
                        <b>Car-cost-predicting</b>
                    </Typography>
                    <form onSubmit={handleSubmit(handleResultButtonClick)}>
                        <Grid container className={classes.testBorder} style={{ marginTop: '5%' }} justifyContent='center'>
                            <Grid item md={2} className={classes.testBorder}>
                                <Typography style={{ marginTop: '10px' }} variant='h6'>
                                    Бренд
                                </Typography>
                            </Grid>
                            <Grid item md={3} className={classes.testBorder}>
                                <FormControl fullWidth required>
                                    <InputLabel id='brand-select-label'>Выберите бренд</InputLabel>
                                    <Controller
                                        name='brand'
                                        control={control}
                                        defaultValue=''
                                        rules={{ required: 'Выберите бренд' }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                labelId='brand-select-label'
                                                value={value}
                                                onChange={onChange}
                                                label='Выберите бренд'
                                                name='brand'
                                            >
                                                {brands.map(value => (
                                                    <MenuItem value={value}>{value}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.testBorder} style={{ marginTop: '2%' }} justifyContent='center'>
                            <Grid item md={2} className={classes.testBorder}>
                                <Typography style={{ marginTop: '10px' }} variant='h6'>
                                    Модель
                                </Typography>
                            </Grid>
                            <Grid item md={3} className={classes.testBorder}>
                                <FormControl fullWidth>
                                    <InputLabel id='model-select-label'>Выберите модель</InputLabel>
                                    <Controller
                                        name='model'
                                        control={control}
                                        defaultValue=''
                                        rules={{ required: 'Выберите модель' }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                labelId='model-select-label'
                                                value={value}
                                                onChange={onChange}
                                                label='Выберите модель'
                                                name='model'
                                            >
                                                {models.map(value => (
                                                    <MenuItem value={value}>{value}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.testBorder} style={{ marginTop: '2%' }} justifyContent='center'>
                            <Grid item md={2} className={classes.testBorder}>
                                <Typography style={{ marginTop: '10px' }} variant='h6'>
                                    Год
                                </Typography>
                            </Grid>
                            <Grid item md={3} className={classes.testBorder}>
                                <FormControl fullWidth>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            views={['year']}
                                            label='Выберите год'
                                            value={year}
                                            onChange={newValue => {
                                                setYear(newValue);
                                            }}
                                            renderInput={params => <TextField {...params} helperText={null} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.testBorder} style={{ marginTop: '2%' }} justifyContent='center'>
                            <Grid item md={2} className={classes.testBorder}>
                                <Typography style={{ marginTop: '10px' }} variant='h6'>
                                    Пробег
                                </Typography>
                            </Grid>
                            <Grid item md={3} className={classes.testBorder}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='mileage'
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                onChange={onChange}
                                                value={value}
                                                InputProps={{
                                                    inputComponent: MileageMask as any,
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.testBorder} style={{ marginTop: '2%' }} justifyContent='center'>
                            <Grid item md={2} className={classes.testBorder}>
                                <Typography style={{ marginTop: '10px' }} variant='h6'>
                                    Тип двигателя
                                </Typography>
                            </Grid>
                            <Grid item md={3} className={classes.testBorder}>
                                <FormControl fullWidth>
                                    <InputLabel id='engine-type-select'>Выберите тип двигателя</InputLabel>
                                    <Controller
                                        name='engineType'
                                        control={control}
                                        defaultValue=''
                                        rules={{ required: 'Выберите тип двигателя' }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                labelId='engine-type-select'
                                                value={value}
                                                onChange={onChange}
                                                label='Выберите тип двигателя'
                                                name='engineType'
                                            >
                                                {fuelTypes.map(value => (
                                                    <MenuItem value={value}>{value}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.testBorder} style={{ marginTop: '2%' }} justifyContent='center'>
                            <Grid item md={2} className={classes.testBorder}>
                                <Typography style={{ marginTop: '10px' }} variant='h6'>
                                    Объем двигателя
                                </Typography>
                            </Grid>
                            <Grid item md={3} className={classes.testBorder}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='enginesize'
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField value={value} onChange={onChange} name='enginesize' />
                                            // <InputMask mask='9.9' disabled={false} maskChar=' '>
                                            //     {() => <TextField value={value} onChange={onChange} name='enginesize' />}
                                            // </InputMask>
                                        )}
                                    />
                                    {/*<InputMask mask='9.9' disabled={false} maskChar=' '>*/}
                                    {/*    {() => <TextField />}*/}
                                    {/*</InputMask>*/}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.testBorder} style={{ marginTop: '2%' }} justifyContent='center'>
                            <Grid item md={2} className={classes.testBorder}>
                                <Typography style={{ marginTop: '10px' }} variant='h6'>
                                    Расход л/км
                                </Typography>
                            </Grid>
                            <Grid item md={3} className={classes.testBorder}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='mpg'
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField value={value} onChange={onChange} name='mpg' />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.testBorder} style={{ marginTop: '2%' }} justifyContent='center'>
                            <Grid item md={2} className={classes.testBorder}>
                                <Typography style={{ marginTop: '10px' }} variant='h6'>
                                    Tax
                                </Typography>
                            </Grid>
                            <Grid item md={3} className={classes.testBorder}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='tax'
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField value={value} onChange={onChange} name='tax' />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.testBorder} style={{ marginTop: '2%' }} justifyContent='center'>
                            <Grid item md={2} className={classes.testBorder}>
                                <Typography style={{ marginTop: '10px' }} variant='h6'>
                                    Тип трансмиссии
                                </Typography>
                            </Grid>
                            <Grid item md={3} className={classes.testBorder}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='driveType'
                                        control={control}
                                        defaultValue=''
                                        rules={{ required: 'Тип транмиссии' }}
                                        render={({ field: { onChange, value } }) => (
                                            <Select labelId='drive-type-select' value={value} onChange={onChange} name='driveType'>
                                                {transmissions.map(value => (
                                                    <MenuItem value={value}>{value}</MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.testBorder} style={{ marginTop: '2%' }} justifyContent='center'>
                            <Grid item md={2} className={classes.testBorder}>
                                <Button variant='contained' type='submit'>
                                    Предсказать
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default MainPage;
