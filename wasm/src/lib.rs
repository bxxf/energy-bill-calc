use wasm_bindgen::prelude::*;

const ELECTRICITY_PRICE: f32 = 4.0;
const GAS_PRICE: f32 = 5.0;
const CUSTOM_VALUE: f32 = 128.0;

#[wasm_bindgen]
pub fn calculate(electricity_val: f32, gas_val: f32) -> f32 {
   let result: f32 = electricity_val * ELECTRICITY_PRICE + gas_val * GAS_PRICE + CUSTOM_VALUE;
   result.round()
}
#[wasm_bindgen]
pub fn get_electricity_price() -> f32 {
   ELECTRICITY_PRICE
}
#[wasm_bindgen]
pub fn get_gas_price() -> f32 {
   GAS_PRICE
}