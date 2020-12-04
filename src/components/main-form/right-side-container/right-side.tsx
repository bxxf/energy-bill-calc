import module from './right-side.module.scss';
import MainInput from '../../input/main-input';
import ConsumptionStore from '../../../stores/store';

import { useContext } from 'solid-js';

const RightSide = () => {
  const { setElectricity, setGas, electricityPrice, gasPrice } = useContext(
    ConsumptionStore,
  );
  return (
    <div class={module.rightside}>
      <h2>Výpočet ceny</h2>
      <p class={module.seconddesc}>Upravte parametry dle Vaší spotřeby.</p>
      <form>
        <label>Zadejte Vaší spotřebu elektřiny (rok):</label>
        <MainInput
          fnc={(value: number) => {
            setElectricity(value);
          }}
        />
        <label>Zadejte Vaší spotřebu plynu (rok):</label>
        <MainInput
          fnc={(value: number) => {
            setGas(value);
          }}
        />
      </form>
      <div class={module.pricesinfo}>
        
        
        <button class={module.button}><a href="https://google.com">Mám zájem o nabídku</a></button>
        <div>
          Cena elektřiny: {electricityPrice} Kč/kWH
        </div>
        <div>
          Cena plynu: {gasPrice} Kč/kWH
        </div>
      </div>
    </div>
  );
};
export default RightSide;
