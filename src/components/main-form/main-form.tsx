import module from './main-form.module.scss';
import LeftSide from './left-side-container/left-side';
import RightSide from './right-side-container/right-side';

const MainForm = () => {
  return (
    <div class={module['form-wrapper']}>
      <LeftSide />
      <RightSide />
    </div>
  );
};
export default MainForm;
