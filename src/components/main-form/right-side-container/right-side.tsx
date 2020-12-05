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
        <label for="electricity">Zadejte Vaší spotřebu elektřiny (rok):</label>
        <MainInput
          id="electricity"
          fnc={(value: number) => {
            setElectricity(value);
          }}
        />
        <label for="gas">Zadejte Vaší spotřebu plynu (rok):</label>
        <MainInput
          id="gas"
          fnc={(value: number) => {
            setGas(value);
          }}
        />
      </form>
      <div class={module.pricesinfo}>
        <div>Cena elektřiny: {electricityPrice} Kč/kWH</div>
        <div>Cena plynu: {gasPrice} Kč/kWH</div>
      </div>
      <div class={module.disclaimer}>
        * Tato nabídka je pouze orientační, ceny jsou aktualizovány v{' '}
        intervalech cca týdne.
      </div>
    </div>
  );
};
export default RightSide;
