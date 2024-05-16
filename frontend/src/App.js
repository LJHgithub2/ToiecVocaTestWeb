/* eslint-disable */
import "./App.css";
import { useState } from "react";
// bootstrap lib
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, Nav } from "react-bootstrap";
// react-router-dom lib
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// custom
import Login from "./page/login";
import Nav from "./page/nav";
import Collections from "./page/collections"
import Main from "./page/main"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/nav" element={<Nav />}>
          <Route path="collections" element={<Collections />} />
          <Route index element={<Main />} />
          <Route path="*" element={<Navigate to="/nav/collections" />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

