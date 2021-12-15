import { useResultPageStyles } from '../styles/styles';
import { Container, Grid, Typography } from '@mui/material';
import { selectPredictState } from '../redux/slices/predictResultSlice';
import { useSelector } from 'react-redux';

const ResultPage = () => {
    const classes = useResultPageStyles();
    const { loading, result } = useSelector(selectPredictState);

    return (
        <div className={classes.root}>
            {!loading ? (
                <Container>
                    <div>
                        <Grid container style={{ marginTop: '40px' }}>
                            <Grid item container justifyContent='center'>
                                <Grid item md={4}>
                                    <Typography variant='h4' style={{ textAlign: 'center' }}>
                                        Результаты
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container justifyContent='center' style={{ marginTop: '20px' }}>
                                <Grid item md={12}>
                                    <Typography variant='h6' style={{ textAlign: 'center' }}>
                                        Ваше авто: {result.car}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container justifyContent='center' style={{ marginTop: '10px' }}>
                                <Grid item md={6}>
                                    <Typography variant='h6' style={{ textAlign: 'center' }}>
                                        Предполагаемая цена: <b>{result.price} $</b>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container justifyContent='center' style={{ marginTop: '10px' }}>
                                {/*<img src={result.img} height={400} alt='' />*/}
                                <img src={'https://serpapi.com/searches/61ba142029d17788d6b2a009/images/15c818b2fd970129b52dc83e2c65691088306a3c14cd79cbba31cdb9ae2ee5b3.jpeg'} height={400} alt='' />
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            ) : null}
        </div>
    );
};

export default ResultPage;
