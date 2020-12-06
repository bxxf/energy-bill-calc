import { createSignal, useContext } from 'solid-js';
import ConsumptionStore from '../../../stores/store';
import module from './left-side.module.scss';

const LeftSide = () => {
  const { getPrice } = useContext(ConsumptionStore);
  const [price, setPrice] = createSignal(0);

  getPrice.observe_((change: any) => setPrice(change.newValue));

  return (
    <div class={module['left-side']}>
      <div>
        <h1 class={module['left-side__header']}>
          Kalkulačka
          <br />
          Energií
        </h1>
        <h2 class={module['left-side__description']}>
          Předvídač ceny energií určený pro výpočet výdajů za energie (elektřina
          &nbsp;a plyn).
        </h2>
      </div>
      <div>
        <span class={module['left-side__calculation__description']}>
          Za spotřebu zaplatíte:
        </span>
        <span class={module['left-side__calculation__price']}>{price} Kč</span>
      </div>
    </div>
  );
};
export default LeftSide;
