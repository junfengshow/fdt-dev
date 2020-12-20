import './main.scss';
import A from './a.ts';
import Person from './Person';
const a = new A();
new Person();
if (module.hot) {
  module.hot.accept();
}
