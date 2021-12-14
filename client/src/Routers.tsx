import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import QueryHistoryPage from "./pages/QueryHistoryPage";

const Routers = () => {
    return (
        <Container>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/history" element={<QueryHistoryPage />} />
            </Routes>
        </Container>
    );
};

export default Routers;
