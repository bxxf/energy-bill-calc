import { observable, action, computed } from 'mobx';
import {
  calculate,
  get_electricity_price,
  get_gas_price,
} from 'wasm-calculator';
import { createContext } from 'solid-js';

class ConsumptionStore {
  electricityPrice = get_electricity_price();
  gasPrice = get_gas_price();
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
    return this.consumption.electricity > 0 && this.consumption.gas > 0
      ? calculate(this.consumption.electricity, this.consumption.gas)
      : 0;
  });
}

export default createContext(new ConsumptionStore());
