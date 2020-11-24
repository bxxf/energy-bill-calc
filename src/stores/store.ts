import { observable, action, computed } from 'mobx';
import { calculate } from 'wasm-calculator';
import { createContext } from 'solid-js';

class ConsumptionStore {
  consumption = observable({
    electricity: 0,
    gas: 0,
  });

  @action setElectricity = (value: number) => {
    this.consumption.electricity = value;
  };

  @action setGas = (value: number) => {
    this.consumption.gas = value;
  };

  getPrice = computed(() => {
    console.log('compouting');
    return calculate(this.consumption.electricity, this.consumption.gas);
  });
}

export default createContext(new ConsumptionStore());
