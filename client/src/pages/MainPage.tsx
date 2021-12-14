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

const MainPage = () => {
    const classes = useMainPageStyles();
    const dispatch = useDispatch();
    const [value, setValue] = useState<Date | null>(new Date());
    const onLoad = () => {
        dispatch(fetchBrands());
        dispatch(fetchModels());
        dispatch(fetchTransmissions());
        dispatch(fetchFuelTypes());
    };

    useEffect(() => {
        onLoad();
    }, []);

    const { brands, models, transmissions, fuelTypes } = useSelector(selectCarState);

    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.mainPagePaper}>
                    <Typography variant='h5'>
                        <b>Car-cost-predicting</b>
                    </Typography>
                    <Grid container className={classes.testBorder} style={{ marginTop: '5%' }} justifyContent='center'>
                        <Grid item md={2} className={classes.testBorder}>
                            <Typography style={{ marginTop: '10px' }} variant='h6'>
                                Бренд
                            </Typography>
                        </Grid>
                        <Grid item md={3} className={classes.testBorder}>
                            <FormControl fullWidth>
                                <InputLabel id='brand-select-label'>Выберите бренд</InputLabel>
                                <Select labelId='brand-select-label' label='Выберите бренд'>
                                    {brands.map(value => (
                                        <MenuItem value={value}>{value}</MenuItem>
                                    ))}
                                </Select>
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
                                <Select labelId='model-select-label' label='Выберите модель'>
                                    {models.map(value => (
                                        <MenuItem value={value}>{value}</MenuItem>
                                    ))}
                                </Select>
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
                                        value={value}
                                        onChange={newValue => {
                                            setValue(newValue);
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
                                <TextField
                                    InputProps={{
                                        inputComponent: MileageMask as any,
                                    }}
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
                                <Select labelId='engine-type-select' label='Выберите тип двигателя'>
                                    {fuelTypes.map(value => (
                                        <MenuItem value={value}>{value}</MenuItem>
                                    ))}
                                </Select>
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
                                <InputMask mask='9.9' disabled={false} maskChar=' '>
                                    {() => <TextField />}
                                </InputMask>
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
                                <InputLabel id='drive-type-select'>Выберите тип трансмиссии</InputLabel>
                                <Select labelId='drive-type-select' label='Выберите тип трансмиссии'>
                                    {transmissions.map(value => (
                                        <MenuItem value={value}>{value}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.testBorder} style={{ marginTop: '2%' }} justifyContent='center'>
                        <Grid item md={2} className={classes.testBorder}>
                            <Button variant='contained'>Предсказать</Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default MainPage;
