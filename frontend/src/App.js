/* eslint-disable */
import "./App.css";
import { useState } from "react";
// react-icons
import { FaAngellist } from "react-icons/fa";
// bootstrap lib
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav } from "react-bootstrap";
// react-router-dom lib
import { BrowserRouter, Routes, Route } from "react-router-dom";
// custom

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <FaAngellist></FaAngellist>
        <h1 className="text-3xl font-bold underline">hello world</h1>
        <Nav variant="pills" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">Active</Nav.Link>
            <Button as="input" type="button" value="Input" />{" "}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Option 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </BrowserRouter>
  );
}

export default App;
