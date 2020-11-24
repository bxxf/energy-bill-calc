import module from './right-side.module.scss';
import { createSignal, useContext } from 'solid-js';
import { ConsumptionContext } from '../../../context/consumption-context';
import MainInput from '../../input/main-input';
const RightSide = () => {
  const [state, setState] = useContext(ConsumptionContext);
  const [electricity, setElectricity] = createSignal(state.electricity);
  const [gas, setGas] = createSignal(state.electricity);
  const updateElectricity = (value: number) => {
    setState({ electricity: value });
    setElectricity(state.electricity);
  };
  const updateGas = (value: number) => {
    setState({ gas: value });
    setGas(state.gas);
  };
  return (
    <div class={module.rightside}>
      <h2>Výpočet ceny</h2>
      <p class={module.seconddesc}>Upravte parametry dle Vaší spotřeby.</p>
      <form>
        <label>Zadejte Vaší spotřebu elektřiny:</label>
        <MainInput fnc={(value: number) => updateElectricity(value)} />
        <label>Zadejte Vaší spotřebu plynu:</label>
        <MainInput fnc={(value: number) => updateGas(value)} />
      </form>
      <div class={module.pricesinfo}>
        {electricity}
        {gas}
        <p>Cena plynu: 150 Kč/m3</p>
        <p>Cena elektřiny: 150 Kč/m3</p>
      </div>
      <div class="no-desktop">
        <span class={module.pricedesc}>
          Celková cena Vaší spotřeby je: 8 760 Kč
        </span>
      </div>
    </div>
  );
};
export default RightSide;
