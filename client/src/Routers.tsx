import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import QueryHistoryPage from './pages/QueryHistoryPage';
import ResultPage from './pages/ResultPage';

const Routers = () => {
    return (
        <Container>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/history' element={<QueryHistoryPage />} />
                <Route path='/results' element={<ResultPage />} />
            </Routes>
        </Container>
    );
};

export default Routers;
