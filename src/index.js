import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let items = [{name:"A",
        category: "left",
        bgcolor: "rgb(255, 43, 43)"},

       {name:"B",
        category: "center",
        bgcolor: "rgb(43, 255, 43)"},

       {name:"C",
        category: "right",
        bgcolor: "rgb(43, 43, 255)"}]

ReactDOM.render(<App items={items}/>, document.getElementById('root'));
registerServiceWorker();
