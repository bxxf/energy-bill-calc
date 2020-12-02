import { createSignal, useContext } from 'solid-js';
import ConsumptionStore from '../../../stores/store';
import module from './left-side.module.scss';

const LeftSide = () => {
  const { getPrice } = useContext(ConsumptionStore);
  const [price, setPrice] = createSignal(0);

  getPrice.observe_((change) => setPrice(change.newValue));

  return (
    <div class={module.leftside}>
      <div>
        <h1>
          Kalkulačka
          <br />
          Energií
        </h1>
        <p>
          Předvídač ceny energií určený pro výpočet výdajů za energie (elektřina
          &nbsp;a plyn).
        </p>
      </div>
      <div>
        <span class={module.pricedesc}>Za spotřebu zaplatíte:</span>
        <span class={module.price}>{price} Kč</span>
      </div>
    </div>
  );
};
export default LeftSide;
