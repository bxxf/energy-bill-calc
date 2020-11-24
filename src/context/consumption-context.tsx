import { createContext, createState } from 'solid-js';

export const ConsumptionContext = createContext([
  { electricity: 0, gas: 0 },
  function () {},
]);

export function ConsumptionProvider(props: any) {
  const [state, setState] = createState({
    electricity: 0,
    gas: 0,
  });

  return (
    <ConsumptionContext.Provider value={[state, setState]}>
      {console.log('test')}

      {props.children}
    </ConsumptionContext.Provider>
  );
}
