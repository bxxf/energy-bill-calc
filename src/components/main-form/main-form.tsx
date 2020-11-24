import module from './main-form.module.scss';
import LeftSide from './left-side-container/left-side';
import RightSide from './right-side-container/right-side';
import { ConsumptionProvider } from '../../context/consumption-context';
const MainForm = () => {
  return (
    <ConsumptionProvider electricity={10}>
      <div class={module.wrapper}>
        <LeftSide />
        <RightSide />
      </div>
    </ConsumptionProvider>
  );
};

export default MainForm;
