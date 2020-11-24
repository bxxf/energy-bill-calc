import 'assets/scss/main.scss';

import module from './app.module.scss';

import MainForm from './main-form';
// eslint-disable-next-line no-unused-vars
const img = require('assets/images/image.jpg');
const App = () => {
  return (
    <div class={module.layout}>
      <img src="/images/image.jpg" class={module.image} alt="background" />
      <MainForm></MainForm>
    </div>
  );
};

export default App;
