import { add_two_ints } from 'wasm-calculator';
import 'assets/scss/main.scss';
import module from './app.module.scss';

const App = () => {
  return (
    <div class={module.test}>
      working DOM yay
      <p> 1 + 1 je {add_two_ints(1, 1)}</p>
    </div>
  );
};

export default App;
