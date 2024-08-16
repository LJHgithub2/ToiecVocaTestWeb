/* eslint-disable */
import './App.css';
import { useCallback, useState } from 'react';
// bootstrap lib
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Nav } from "react-bootstrap";
// react-router-dom lib
import { Routes, Route, Navigate } from 'react-router-dom';
// context
import { AuthProvider, useAuth } from './context/AuthContext';
// custom
import Login from './page/login';
import Nav from './page/nav';
import PublicVoca from './page/publicVoca';
import Main from './page/main';
import Regist from './page/regist';
import Page404 from './page/page404';
import Profile from './page/profile';
import ItemList from './components/itemList';
import Test from './test/test';
import Calendar from './page/calendar';
import Logout from './page/logout';

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        // 로딩 중일 때 표시할 컴포넌트
        return (
            <div className="flex justify-center items-center min-h-screen">
                로딩중..
            </div>
        );
    }

    return (
        <Routes>
            {isAuthenticated ? (
                <>
                    <Route path="/" exact element={<Nav />}>
                        <Route index element={<Main />} />
                        <Route
                            path="publicVoca"
                            exact="false"
                            element={<PublicVoca />}
                        />
                        <Route path="publicVoca/:id" element={<ItemList />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="logout" exact element={<Logout />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </>
            ) : (
                <>
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/regist" exact element={<Regist />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </>
            )}
            <Route path="/test" exact element={<Test />} />
        </Routes>
    );
};

function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}

export default App;
