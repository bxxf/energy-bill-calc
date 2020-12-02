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
        
        <div>
          Cena elektřiny: {electricityPrice} Kč/kWH
        </div>
        <div>
          Cena plynu: {gasPrice} Kč/kWH
        </div>
        <p>
          *Tato nabídka je pouze přibližná - cena je aktualizována v intervalech
          &nbsp;cca týdne. Výsledná cena se může lišit.
        </p>
      </div>
    </div>
  );
};
export default RightSide;
