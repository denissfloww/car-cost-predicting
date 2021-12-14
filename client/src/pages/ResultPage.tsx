import { useResultPageStyles } from '../styles/styles';
import {Container, Grid, Typography} from '@mui/material';

const ResultPage = () => {
    const classes = useResultPageStyles();

    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.pagePaper}>
                    <Grid container>
                        <Grid item container>
                            <Grid item md className={classes.testBorder}>
                                <Typography variant='h5'>
                                    Результаты:
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default ResultPage;
