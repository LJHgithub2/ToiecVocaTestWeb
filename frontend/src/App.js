/* eslint-disable */
import "./App.css";
import { useState } from "react";
// bootstrap lib
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, Nav } from "react-bootstrap";
// react-router-dom lib
import { Routes, Route, Navigate } from "react-router-dom";
// custom
import Login from "./page/login";
import Nav from "./page/nav";
import Collections from "./page/collections";
import Main from "./page/main";
import Regist from "./page/regist";
import Page404 from "./page/page404";
import Profile from "./page/profile";
import ItemList from "./components/itemList";
import Test from "./test/test";
import Calendar from "./page/calendar";

function App() {
  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route path="/regist" exact element={<Regist />} />
      <Route path="/404" exact element={<Page404 />} />
      <Route path="/nav" exact element={<Nav />}>
        <Route index element={<Main />} />
        <Route path="collections" exact="false" element={<Collections />}/>
        <Route path="collections/list" element={<ItemList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="*" element={<Navigate to="/nav" />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/test" exact element={<Test />} />
    </Routes>
  );
}

export default App;
