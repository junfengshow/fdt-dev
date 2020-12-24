import './main.less';
import React from 'react';
import ReactDOM from 'react-dom';

const render = () => {
  const node = document.getElementById('app');
  ReactDOM.render(<div>hello world</div>, node);
};
render();
// if (module.hot) {
//   module.hot.accept();
// }
