import {Card, CardActionArea, CardContent, Container, Grid, Typography} from '@mui/material';
import { useHistoryPageStyles } from '../styles/styles';

const QueryHistoryPage = () => {
    const classes = useHistoryPageStyles();

    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.pagePaper}>
                    <Grid container justifyContent='center' style={{marginTop:'10px'}}>
                        <Grid item md={7}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Mercedes-benz C-class
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Характеристики
                                        </Typography>
                                        <Typography style={{marginTop:'16px'}} variant="h5" >
                                            1 400 000 руб.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default QueryHistoryPage;
