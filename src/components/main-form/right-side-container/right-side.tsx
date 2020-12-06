import { useContext } from 'solid-js';
import module from './right-side.module.scss';
import MainInput from '../../input/main-input';
import ConsumptionStore from '../../../stores/store';

const RightSide = () => {
  const { setElectricity, setGas, electricityPrice, gasPrice } = useContext(
    ConsumptionStore,
  );
  return (
    <div class={module['right-side']}>
      <h2 class={module['right-side__header']}>Výpočet ceny</h2>
      <p class={module['right-side__description']}>
        Upravte parametry dle Vaší spotřeby.
      </p>
      <form name="consumption-calc" class={module['right-side__form']}>
        <label for="electricity" class={module['right-side__form__label']}>
          Zadejte Vaší spotřebu elektřiny (rok):
        </label>
        <MainInput
          id="electricity"
          fnc={(value: number) => {
            setElectricity(value);
          }}
        />
        <label for="gas" class={module['right-side__form__label']}>
          Zadejte Vaší spotřebu plynu (rok):
        </label>
        <MainInput
          id="gas"
          fnc={(value: number) => {
            setGas(value);
          }}
        />
      </form>
      <div class={module['right-side__pricelist']}>
        <div>Cena elektřiny: {electricityPrice} Kč/kWH</div>
        <div>Cena plynu: {gasPrice} Kč/kWH</div>
      </div>
      <div class={module['right-side__price-disclaimer']}>
        * Tato nabídka je pouze orientační, ceny jsou aktualizovány v{' '}
        intervalech cca týdne.
      </div>
    </div>
  );
};
export default RightSide;
