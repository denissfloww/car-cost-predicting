import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { useHistoryPageStyles } from '../styles/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQueriesPerDay, selectPredictState } from '../redux/slices/predictResultSlice';
import { IQuery } from '../redux/slices/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const QueryHistoryPage = () => {
    const classes = useHistoryPageStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQueriesPerDay());
    }, []);

    const { queries, countPerDay, countAll, brandAvgPrice } = useSelector(selectPredictState);

    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.pagePaper}>
                    <Grid container justifyContent='center' style={{ marginTop: '10px' }}>
                        <Grid item md={7}>
                            <Typography gutterBottom variant='h5' component='div'>
                                Статистика по запросам:
                            </Typography>
                        </Grid>
                        <Grid item md={7}>
                            <p>
                                <Typography gutterBottom>
                                    Количество запросов за сутки: <b>{countPerDay}</b>
                                </Typography>
                            </p>
                            <p>
                                <Typography gutterBottom>
                                    Количество запросов за все время: <b>{countAll}</b>
                                </Typography>
                            </p>
                        </Grid>
                        <Grid item md={7}>
                            <Typography gutterBottom style={{ margin: '0 auto' }}>
                                Рейтинг средних цен марки за день
                            </Typography>
                            <BarChart
                                width={500}
                                height={500}
                                data={brandAvgPrice}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray='5 5' />
                                <XAxis dataKey='brand' />
                                <YAxis type='number' domain={[0, 100000]} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey='price' name={'Средняя стоимость'} fill='#8884d8' />
                            </BarChart>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='center' style={{ marginTop: '10px' }}>
                        <Grid item md={7}>
                            <Typography gutterBottom variant='h5' component='div'>
                                История запросов за последние сутки
                            </Typography>
                            {queries.map((value: IQuery) => (
                                <Card style={{ marginTop: '10px' }}>
                                    <CardActionArea>
                                        <Grid container>
                                            <Grid item md={7}>
                                                <CardContent>
                                                    <Typography gutterBottom variant='h5' component='div'>
                                                        {value.brand} {value.model}
                                                    </Typography>
                                                    <Typography variant='body2' color='text.secondary'>
                                                        Год выпуска: {value.year} <br />
                                                        Трансмиссия: {value.transmission} <br />
                                                        Пробег: {value.mileage} <br />
                                                        Тип двигателя: {value.fueltype} <br />
                                                        Год выпуска: {value.year} <br />
                                                        Расход: {value.mpg} <br />
                                                        Размер двигателя: {value.enginesize} <br />
                                                    </Typography>
                                                    <Typography style={{ marginTop: '16px' }} variant='h5'>
                                                        {Math.round(Number(value.price))} $
                                                    </Typography>
                                                </CardContent>
                                            </Grid>
                                            <Grid item md>
                                                <CardMedia>
                                                    <img src={value.img} width={250} />
                                                </CardMedia>
                                            </Grid>
                                        </Grid>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default QueryHistoryPage;
