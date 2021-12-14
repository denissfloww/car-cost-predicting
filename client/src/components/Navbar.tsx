import { useNavStyles } from '../styles/styles';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    const classes = useNavStyles();

    return (
        <div className={classes.root}>
            <AppBar elevation={1} position='static' color='transparent' className={classes.appBar}>
                <Container>
                    <Toolbar variant='dense'>
                        <Typography component='p' style={{ flexGrow: 1 }}>
                            <Button color='inherit' className={classes.menuButton} to='/' component={RouterLink}>
                                project
                            </Button>
                        </Typography>
                        <Button color='inherit' className={classes.menuButton} to='/history' component={RouterLink}>
                            История запросов
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Navbar;
