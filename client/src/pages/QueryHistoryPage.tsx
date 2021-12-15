import {Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography} from '@mui/material';
import { useHistoryPageStyles } from '../styles/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQueries, selectPredictState } from '../redux/slices/predictResultSlice';
import {IQuery} from "../redux/slices/types";

const QueryHistoryPage = () => {
    const classes = useHistoryPageStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQueries());
    }, []);

    const { queries } = useSelector(selectPredictState);

    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.pagePaper}>
                    <Grid container justifyContent='center' style={{ marginTop: '10px' }}>
                        <Grid item md={7}>
                            <Typography gutterBottom variant='h5' component='div'>
                                История запросов
                            </Typography>
                            {queries.map((value: IQuery) => (
                                <Card style={{marginTop:'10px'}}>
                                    <CardActionArea>
                                        <Grid container >
                                            <Grid item md={7} >
                                                <CardContent>
                                                    <Typography gutterBottom variant='h5' component='div'>
                                                        {value.brand} {value.model}
                                                    </Typography>
                                                    <Typography variant='body2' color='text.secondary'>
                                                        Год выпуска: {value.year}  <br />
                                                        Трансмиссия: {value.transmission} <br />
                                                        Пробег: {value.mileage}  <br />
                                                        Тип двигателя: {value.fueltype}  <br />
                                                        Год выпуска: {value.year}  <br />
                                                        Расход: {value.mpg}  <br />
                                                        Размер двигателя: {value.enginesize}  <br />
                                                    </Typography>
                                                    <Typography style={{ marginTop: '16px' }} variant='h5'>
                                                        {value.price} $
                                                    </Typography>
                                                </CardContent>
                                            </Grid>
                                            <Grid item md >
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
