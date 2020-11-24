import module from './right-side.module.scss';
import MainInput from '../../input/main-input';
import ConsumptionStore from '../../../stores/store';

import { useContext } from 'solid-js';

const RightSide = () => {
  const { setElectricity, setGas } = useContext(ConsumptionStore);
  return (
    <div class={module.rightside}>
      <h2>Výpočet ceny</h2>
      <p class={module.seconddesc}>Upravte parametry dle Vaší spotřeby.</p>
      <form>
        <label>Zadejte Vaší spotřebu elektřiny:</label>
        <MainInput
          fnc={(value: number) => {
            setElectricity(value);
          }}
        />
        <label>Zadejte Vaší spotřebu plynu:</label>
        <MainInput
          fnc={(value: number) => {
            setGas(value);
          }}
        />
      </form>
      <div class={module.pricesinfo}>
        <p>Cena plynu: 4 Kč/kWH</p>
        <p>Cena elektřiny: 5 Kč/kWH</p>
      </div>
    </div>
  );
};
export default RightSide;
