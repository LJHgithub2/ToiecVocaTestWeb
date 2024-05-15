/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

  let [postName, b]=useState(['남자코트 추천'])

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <div className="list">
        <h4>{ postName }</h4>
        <p>2월 67일</p>
      </div>
    </div>
  );
}

export default App;
