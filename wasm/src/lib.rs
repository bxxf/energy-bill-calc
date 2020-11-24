use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calculate(electricity: f32, gas: f32) -> f32 {
   let result: f32 = electricity * 5.0 + gas * 4.0;
   result.round()
}