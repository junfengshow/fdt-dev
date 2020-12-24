import './main.less';
import React from 'react';
import ReactDOM from 'react-dom';

const render = () => {
  const node = document.getElementById('app');
  ReactDOM.render(<div>hello world 11</div>, node);
};
render();
if (module.hot) {
  module.hot.accept();
}
