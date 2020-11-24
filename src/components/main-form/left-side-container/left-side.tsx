import module from './left-side.module.scss';
const LeftSide = () => {
  return (
    <div class={module.leftside}>
      <div>
        <h1>
          Kalkulačka
          <br />
          Energií
        </h1>
        <p>
          Kalulačka určená pro výpočet výdajů za energie (elektřina a plyn).
        </p>
      </div>
      <div class="no-mobile">
        <span class={module.pricedesc}>Celková cena Vaší spotřeby je:</span>
        <span class={module.price}>8 760 Kč</span>
      </div>
    </div>
  );
};
export default LeftSide;
