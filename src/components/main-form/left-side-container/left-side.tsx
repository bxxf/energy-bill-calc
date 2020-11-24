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
          Kalulačka určená pro výpočet výdajů za energie (elektřina a plyn).
        </p>
      </div>
      <div>
        <span class={module.pricedesc}>Celková cena Vaší spotřeby je:</span>
        <span class={module.price}>{price} Kč</span>
      </div>
    </div>
  );
};
export default LeftSide;
