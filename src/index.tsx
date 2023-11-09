import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {Main} from "./Main/Main";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Main />
);
